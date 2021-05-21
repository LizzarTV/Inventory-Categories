import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'body-parser';
import { DaprMiddleware } from "./dapr.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded({ extended: true }));
  app.use(json({ type: 'application/*+json' }));
  app.use(DaprMiddleware);
  await app.listen(3000);
}
bootstrap();
