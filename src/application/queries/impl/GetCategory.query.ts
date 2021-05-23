import { IQuery } from '@nestjs/cqrs';

export class GetCategoryQuery implements IQuery {
  constructor(id: string) { }
}
