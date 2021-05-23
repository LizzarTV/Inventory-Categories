import { Controller, Logger } from "@nestjs/common";
import { DTO, GetCategory } from "../dtos/app.dto";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class AppController {

  constructor() { }

  @MessagePattern('category-list')
  getCategories(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    Logger.debug('categories-list', 'AppController');
    //
    this.acknowledgeMessage(channel, originalMsg);
    return [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ];
  }

  @MessagePattern('category-single')
  getCategory(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //
    Logger.debug('categories-single', 'AppController');
    Logger.debug(data);
    //
    this.acknowledgeMessage(channel, originalMsg);
  }


  private acknowledgeMessage(channel: any, message: Record<string, any>): void {
    channel.ack(message);
  }
}