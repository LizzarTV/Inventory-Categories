import { AggregateRoot } from "@nestjs/cqrs";
import { Nullable } from "../../shared";

export class AppDomain extends AggregateRoot {

  constructor(
    private readonly id: string,
    private title: string,
    private slug: string,
    private active: boolean,
    private readonly created_at: Date,
    private updated_at: Nullable<Date>,
    private deleted_at: Nullable<Date>,
  ) {
    super();
  }

  public isDeleted(): boolean {
    return !!this.deleted_at;
  }

  public isUpdated(): boolean {
    return !!this.updated_at;
  }

  // TODO: Return AnemicModel
  public toAnemic() {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      active: this.active,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      isUpdated: this.isUpdated(),
      isDeleted: this.isDeleted(),
    }
  }
}