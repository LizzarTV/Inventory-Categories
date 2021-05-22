import { Controller, Logger, Post, Req } from "@nestjs/common";
import { BaseController } from "./base.controller";
import { AppService } from "../../app.service";
import { DTO } from "../dtos/app.dto";

@Controller()
export class AppController extends BaseController {

  constructor() {
    super();
  }

  @Post()
  requestDaprData(@Req() request): void {
    const daprData = this.getDaprData<DTO>(request.body);
    Logger.debug(daprData, 'Dapr Data');
  }
}