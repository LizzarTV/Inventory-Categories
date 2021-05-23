import { Module } from "@nestjs/common";
import { AppController } from "./controllers/app.controller";
import { AmqpModule } from "../amqp.module";

@Module({
  imports: [
    AmqpModule
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export class InterfaceModule {}