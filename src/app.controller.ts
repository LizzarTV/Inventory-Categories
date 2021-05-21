import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  getData(
    @Req() request,
  ): void {
    console.error('request', request.body);
  }
}
