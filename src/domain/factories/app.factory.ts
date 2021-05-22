import { Injectable } from "@nestjs/common";
import { BaseFactory } from "./base.factory";
import { AppDomain } from "../aggregates/app.domain";

@Injectable()
export class AppFactory implements BaseFactory<any, AppDomain, any> {

  public reconstitute(anemic: any): AppDomain {
    return new AppDomain();
  }

  public constitute(domain: AppDomain): any {
    return domain.toAnemic();
  }

  public createFactory(data: any): AppDomain {
    const domain = new AppDomain();
    return domain;
  }

}