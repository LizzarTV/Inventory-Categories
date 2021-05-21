import { NextFunction, Request, Response } from "express";
import { Logger } from "@nestjs/common";

interface DaprBody {
  traceid: string;
  id: string;
  datacontenttype: string;
  type: string;
  topic: string;
  pubsubname: string;
  data: {
    pattern: string;
    data: any;
  };
  specversion: string;
  source: string;
}

export function DaprMiddleware(req: Request, res: Response, next: NextFunction): void {
  const body = req.body as DaprBody;
  Logger.debug(body, 'Dapr Middleware');
  next();
}