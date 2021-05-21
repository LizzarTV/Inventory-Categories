import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded({ extended: true }));
  app.use(json({ type: 'application/*+json' }));
  app.use((req, res, next) => {
    console.log('req.body', req.body);
    next();
  });
  await app.listen(3000);
}
bootstrap();
