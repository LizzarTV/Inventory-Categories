import { EventPublisher, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCategoriesQuery } from "../impl/GetCategories.query";
import { AppFactory } from "../../../domain/factories/app.factory";
import { AnemicApp } from "../../../domain/models/app.model";
import { AppDomain } from "../../../domain/aggregates/app.domain";
import { RpcException } from "@nestjs/microservices";

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly factory: AppFactory,
  ) { }

  public async execute(query: GetCategoriesQuery): Promise<AnemicApp[]> {
    const data = null;
    if (data !== null) {
      return data.map((item: AppDomain) => item.toAnemic());
    }
    throw new RpcException({ code: 404, message: 'No Entities found' });
  }
}