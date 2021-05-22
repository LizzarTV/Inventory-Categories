import { Controller, Logger, Post, Req, Res } from "@nestjs/common";
import { BaseController } from "./base.controller";
import { AppService } from "../../app.service";
import { DTO, GetCategory } from "../dtos/app.dto";

@Controller()
export class AppController extends BaseController {

  constructor() {
    super();
  }

  @Post()
  requestDaprData(@Req() request, @Res() response): any {
    const daprData = this.getDaprData<DTO>(request.body);
    const data = this.ByPattern(daprData.pattern, daprData.data);
    return response.send(data);
  }

  private ByPattern(pattern: string, data: DTO): any {
    Logger.debug(pattern, 'Dapr Pattern');
    Logger.debug(data, 'Dapr Data');
    switch (pattern) {
      case 'category-list':
        return this.getList();
      case 'category-single':
        const single = data as GetCategory;
        return this.getSingle(single.id);
    }
  }
}