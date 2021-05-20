import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  getData(@Res() response): void {
    console.error('BODY', response);
  }
}
