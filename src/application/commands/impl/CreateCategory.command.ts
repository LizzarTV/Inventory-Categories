import { ICommand } from '@nestjs/cqrs';

export class CreateCategoryCommand implements ICommand {
  constructor(public readonly title: string) {}
}
