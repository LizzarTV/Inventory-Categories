import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DeleteCategoryCommand } from "../impl/DeleteCategory.command";
import { AppFactory } from "../../../domain/factories/app.factory";
import { AppRepository } from "../../../infrastructure/repositories/app.repository";

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly factory: AppFactory,
    private readonly repository: AppRepository,
  ) { }

  public async execute(command: DeleteCategoryCommand): Promise<void> {
    const { id } = command;
    const model = await this.repository.findById(id);
    const category = this.eventPublisher.mergeObjectContext(model);
    category.delete();
    category.commit();
    await this.repository.save(category);
  }
}