import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
})
export class InterfaceModule {}
