import { HttpModule, Module } from "@nestjs/common";
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
})
export class AppModule {}
