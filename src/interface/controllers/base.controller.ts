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

  protected getList(): void {
    Logger.debug('Get List');
  }

  protected getSingle(id: string): void {
    Logger.debug(id, 'Get Single');
  }

  protected create(title: string): void {
    Logger.debug(title, 'Create');
  }

}