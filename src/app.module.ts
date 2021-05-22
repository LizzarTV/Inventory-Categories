import { HttpModule, Module } from "@nestjs/common";
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { InterfaceModule } from "./interface/interface.module";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    InterfaceModule,
  ],
  providers: [AppService],
})
export class AppModule {}
