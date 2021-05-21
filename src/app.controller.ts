import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AppService } from './app.service';
import { Request } from "express";

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  getData(
    @Req() request: Request,
  ): void {
    console.error('request', request.body);

  }
}
