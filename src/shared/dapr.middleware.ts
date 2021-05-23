import { NextFunction, Request, Response } from 'express';
import { Logger } from '@nestjs/common';
import { DaprBody } from './dapr.interface';

export function DaprMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const body = req.body as DaprBody;
  // Logger.debug(body, 'Dapr Middleware');
  next();
}
