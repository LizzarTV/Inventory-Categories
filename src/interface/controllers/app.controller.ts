import { Controller, HttpException, Logger, UseFilters } from "@nestjs/common";
import { CreateCategory, DeleteCategory, GetCategory, UpdateCategory } from "../dtos/app.dto";
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCategoriesQuery } from '../../application/queries/impl/GetCategories.query';
import { ExceptionFilter } from '../../shared/base.filter';
import { GetCategoryQuery } from '../../application/queries/impl/GetCategory.query';
import { CreateCategoryCommand } from '../../application/commands/impl/CreateCategory.command';
import { UpdateCategoryCommand } from "../../application/commands/impl/UpdateCategory.command";
import { DeleteCategoryCommand } from "../../application/commands/impl/DeleteCategory.command";
import { RestoreCategoryCommand } from "../../application/commands/impl/RestoreCategory.command";

@Controller()
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseFilters(new ExceptionFilter())
  @MessagePattern('category-list')
  getCategories(@Ctx() context: RmqContext) {
    this.ackMessage(context);
    return this.queryBus.execute(new GetCategoriesQuery());
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('category-single')
  getCategory(@Payload() data: GetCategory, @Ctx() context: RmqContext) {
    this.ackMessage(context);
    return this.queryBus.execute(new GetCategoryQuery(data.id));
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('category-create')
  createCategory(@Payload() data: CreateCategory, @Ctx() context: RmqContext) {
    this.ackMessage(context);
    return this.commandBus.execute(new CreateCategoryCommand(data.title));
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('category-update')
  updateCategory(@Payload() data: UpdateCategory, @Ctx() context: RmqContext) {
    this.ackMessage(context);
    return this.commandBus.execute(new UpdateCategoryCommand(data.id, data.title, data.active));
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('category-delete')
  deleteCategory(@Payload() data: DeleteCategory, @Ctx() context: RmqContext) {
    this.ackMessage(context);
    Logger.debug(context.getPattern());
    return this.commandBus.execute(new DeleteCategoryCommand(data.id));
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern('category-restore')
  restoreCategory(@Payload() data: DeleteCategory, @Ctx() context: RmqContext) {
    this.ackMessage(context);
    Logger.debug(context.getPattern());
    return this.commandBus.execute(new RestoreCategoryCommand(data.id));
  }


  private ackMessage(context: RmqContext): void {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
