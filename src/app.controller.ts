import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  getData(
    @Req() request,
    @Res() response,
    @Body() body,
  ): void {
    console.error('request', request);
    console.error('response', response);
    console.error('body', body);

  }
}
