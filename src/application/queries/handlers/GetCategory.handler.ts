import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppFactory } from '../../../domain/factories/app.factory';
import { AnemicApp } from '../../../domain/models/app.model';
import { RpcException } from '@nestjs/microservices';
import { GetCategoryQuery } from '../impl/GetCategory.query';
import { AppRepository } from '../../../infrastructure/repositories/app.repository';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly factory: AppFactory,
    private readonly repository: AppRepository,
  ) {}

  public async execute(query: GetCategoryQuery): Promise<AnemicApp> {
    const data = await this.repository.findById(query.id);
    if (data !== null) {
      return data.toAnemic();
    }
    throw new RpcException({ code: 404, message: 'Entity not found' });
  }
}
