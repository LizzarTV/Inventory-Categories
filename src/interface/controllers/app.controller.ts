import { Controller, HttpException, UseFilters } from "@nestjs/common";
import { GetCategory } from "../dtos/app.dto";
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetCategoriesQuery } from "../../application/queries/impl/GetCategories.query";
import { ExceptionFilter } from "../../shared/base.filter";
import { GetCategoryQuery } from "../../application/queries/impl/GetCategory.query";

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


  private ackMessage(context: RmqContext): void {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    // channel.ack(originalMsg);
  }
}