import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DomainModule } from "../domain/domain.module";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";
import { GetCategoriesHandler } from "./queries/handlers/GetCategories.handler";
import { GetCategoryHandler } from "./queries/handlers/GetCategory.handler";

const Handlers = [GetCategoriesHandler, GetCategoryHandler];

@Module({
  imports: [
    CqrsModule,
    DomainModule,
    InfrastructureModule,
  ],
  providers: [...Handlers],
  exports: [CqrsModule, ...Handlers],
})
export class ApplicationModule {}