import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateCategoryCommand } from "../impl/CreateCategory.command";
import { AppFactory } from "../../../domain/factories/app.factory";
import { RpcException } from "@nestjs/microservices";
import { HttpStatus } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly factory: AppFactory,
  ) {}

  public async execute(command: CreateCategoryCommand): Promise<void> {
    const { title } = command;
    await this.validateCategory(title);
    //
    const id = uuidv4();
    const slug = slugify(title, {
      replacement: '-',
      lower: true,
      locale: 'de',
    });
    //
    const category = this.eventPublisher.mergeObjectContext(
      this.factory.createFactory({ id, title, slug, active: false }),
    );
    category.commit();
    console.error('category', category);
  }

  private async validateCategory(title: string): Promise<void> {
    if (title.trim().length === 0) {
      throw new RpcException({ code: HttpStatus.BAD_REQUEST, message: 'Title can not be empty' });
    }
  }
}