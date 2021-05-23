import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_CONNECTION_STRING],
      queue: process.env.AMQP_QUEUE,
      queueOptions: {
        durable: false
      },
      noAck: false,
    }
  });
  app.listen(() => Logger.debug('Category Service is listening'));
}
bootstrap();
