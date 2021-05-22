import { Controller, Logger, Post, Req } from "@nestjs/common";
import { BaseController } from "./base.controller";
import { AppService } from "../../app.service";
import { DTO, GetCategory } from "../dtos/app.dto";

@Controller()
export class AppController extends BaseController {

  constructor() {
    super();
  }

  @Post()
  requestDaprData(@Req() request): void {
    const daprData = this.getDaprData<DTO>(request.body);
    Logger.debug(daprData, 'Dapr Data');
    this.ByPattern(daprData.pattern, daprData.data);
  }

  private ByPattern(pattern: string, data: DTO): void {
    Logger.debug(pattern, 'Dapr Pattern');
    Logger.debug(data, 'Dapr Data');
    switch (pattern) {
      case 'category-list':
        this.getList();
        break;
      case 'category-single':
        const single = data as GetCategory;
        this.getSingle(single.id);
        break;
    }
  }
}