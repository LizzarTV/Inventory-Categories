import { Injectable } from "@nestjs/common";
import { BaseFactory } from "./base.factory";
import { AppDomain } from "../aggregates/app.domain";
import { AnemicApp, CreateCategory } from "../models/app.model";

@Injectable()
export class AppFactory implements BaseFactory<AnemicApp, AppDomain, CreateCategory> {

  public reconstitute(anemic: AnemicApp): AppDomain {
    const { id, title, slug, active, created_at, updated_at, deleted_at } = anemic;
    return new AppDomain(id, title, slug, active, created_at, updated_at, deleted_at);
  }

  public constitute(domain: AppDomain): AnemicApp {
    return domain.toAnemic();
  }

  public createFactory(data: CreateCategory): AppDomain {
    const domain = new AppDomain(data.id, data.title, data.slug, data.active, new Date(), null, null);
    domain.createCategory();
    return domain;
  }

}