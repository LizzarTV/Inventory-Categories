import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateCategoryCommand } from "../impl/UpdateCategory.command";
import { AppFactory } from "../../../domain/factories/app.factory";
import { AppRepository } from "../../../infrastructure/repositories/app.repository";
import { AppDomain } from "../../../domain/aggregates/app.domain";
import slugify from 'slugify';
import { Optional } from "../../../shared";
import { BadRequestException, HttpStatus, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly factory: AppFactory,
    private readonly repository: AppRepository,
  ) { }

  public async execute(command: UpdateCategoryCommand): Promise<void> {
    const { id, title, active } = command;
    await this.validateCategory(id, title, active);
    const model = await this.repository.findById(id);
    const category = this.eventPublisher.mergeObjectContext(model);
    this.updateTitle(category, title);
    this.updateActive(category, active);
    category.commit();
    await this.repository.save(category);
  }

  private updateTitle(category: AppDomain, title: string): void {
    if (title !== undefined) {
      category.updateTitle(title);
      const newSlug = slugify(title, {
        replacement: '-',
        lower: true,
        locale: 'de',
      });
      category.updateSlug(newSlug);
    }
  }

  private updateActive(category: AppDomain, active: boolean): void {
    if (active !== undefined) {
      category.updateActive(active);
    }
  }

  private async validateCategory(id: string, title: Optional<string>, active: Optional<boolean>): Promise<void> {
    const model = await this.repository.findById(id);
    if (model === null) {
      throw new RpcException({
        code: HttpStatus.NOT_FOUND,
        message: 'Entity not found',
      });
    }
    if (title !== undefined) {
      if (title.trim().length === 0) {
        throw new RpcException({
          code: HttpStatus.BAD_REQUEST,
          message: 'Title can not be empty',
        });
      }
    }
  }
}