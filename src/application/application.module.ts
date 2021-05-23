import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { GetCategoriesHandler } from './queries/handlers/GetCategories.handler';
import { GetCategoryHandler } from './queries/handlers/GetCategory.handler';
import { CreateCategoryHandler } from './commands/handlers/CreateCategory.handler';
import { UpdateCategoryHandler } from "./commands/handlers/UpdateCategory.handler";
import { DeleteCategoryHandler } from "./commands/handlers/DeleteCategory.handler";
import { RestoreCategoryHandler } from "./commands/handlers/RestoreCategory.handler";

const Handlers = [
  GetCategoriesHandler,
  GetCategoryHandler,
  CreateCategoryHandler,
  UpdateCategoryHandler,
  DeleteCategoryHandler,
  RestoreCategoryHandler
];

@Module({
  imports: [CqrsModule, DomainModule, InfrastructureModule],
  providers: [...Handlers],
  exports: [CqrsModule, ...Handlers],
})
export class ApplicationModule {}
