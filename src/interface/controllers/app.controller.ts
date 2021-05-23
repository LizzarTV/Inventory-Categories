import { Controller, Inject, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { DTO, GetCategory } from "../dtos/app.dto";
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class AppController implements OnApplicationBootstrap {

  constructor(
    @Inject('AMQP_SERVICE') private readonly proxy: ClientProxy,
  ) { }

  async onApplicationBootstrap(): Promise<void> {
    await this.proxy.connect().then(() => Logger.debug('Proxy connected...')).catch(err => Logger.error(err));
  }

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
  getCategory(@Payload() data: any, @Ctx() context: RmqContext) {
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