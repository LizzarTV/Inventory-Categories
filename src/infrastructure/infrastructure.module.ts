import { Module } from "@nestjs/common";

const Repositories = [];
const Mappers = [];
const Entities = [];

@Module({
  imports: [],
  providers: [
    ...Entities,
    ...Mappers,
    ...Repositories
  ],
  exports: [
    ...Entities,
    ...Mappers,
    ...Repositories
  ],
})
export class InfrastructureModule {}