import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  getData(@Body() body: any): void {
    console.error('BODY', body);
  }
}
