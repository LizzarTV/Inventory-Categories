import { EventPublisher, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AppFactory } from "../../../domain/factories/app.factory";
import { AnemicApp } from "../../../domain/models/app.model";
import { AppDomain } from "../../../domain/aggregates/app.domain";
import { RpcException } from "@nestjs/microservices";
import { GetCategoryQuery } from "../impl/GetCategory.query";

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly factory: AppFactory,
  ) { }

  public async execute(query: GetCategoryQuery): Promise<AnemicApp[]> {
    const data = null;
    if (data !== null) {
      return data.map((item: AppDomain) => item.toAnemic());
    }
    throw new RpcException({ code: 404, message: 'Entity not found' });
  }
}