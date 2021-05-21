import { Body, Controller, Get, Logger, Post, Req, Res } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  getData(
    @Req() request,
  ): void {
    Logger.debug(request.body, 'Request')
  }
}
