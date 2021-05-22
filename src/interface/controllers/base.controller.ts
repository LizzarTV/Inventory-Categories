import { AppService } from "../../app.service";
import { Logger } from "@nestjs/common";
import { DaprBody } from "../../shared/dapr.interface";

export class BaseController {

  protected getDaprData<T>(data: DaprBody): { pattern: string; data: T } {
    Logger.debug(data.id, 'ID');
    Logger.debug(data.traceid, 'Trace ID');
    Logger.debug(data.topic, 'Topic');
    return data.data;
  }

  protected getList() {
    Logger.debug('Get List');
    return [];
  }

  protected getSingle(id: string) {
    Logger.debug(id, 'Get Single');
    return { id }
  }

  protected create(title: string) {
    Logger.debug(title, 'Create');
    return { title };
  }

}