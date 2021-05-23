import { Controller, Inject, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { GetCategory } from "../dtos/app.dto";
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class AppController {

  constructor() { }

  @MessagePattern('category-list')
  getCategories(@Ctx() context: RmqContext) {
    this.ackMessage(context);
    return [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3
      }
    ];
  }

  @MessagePattern('category-single')
  getCategory(@Payload() data: GetCategory, @Ctx() context: RmqContext) {
    this.ackMessage(context);
    return {
      id: data.id
    };
  }


  private ackMessage(context: RmqContext): void {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}