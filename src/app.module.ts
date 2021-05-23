import { HttpModule, Module } from "@nestjs/common";
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { InterfaceModule } from "./interface/interface.module";
import { AmqpModule } from "./amqp.module";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    AmqpModule,
    InterfaceModule,
  ],
  providers: [AppService],
})
export class AppModule {}
