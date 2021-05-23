import { AggregateRoot } from '@nestjs/cqrs';
import { Nullable } from '../../shared';
import { BadRequestException, Logger } from '@nestjs/common';
import { AnemicApp } from '../models/app.model';
import { NotEmptyStringValidation } from '../validations/not-empty.validation';

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

  public toAnemic(): AnemicApp {
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
    };
  }

  public createCategory(): void {
    try {
      this.validateAll(this.title, this.slug);
      // TODO: CreatedEvent
      Logger.debug(this.toAnemic(), 'CategoryDomain createCategory');
    } catch (e) {
      // TODO: ErrorEvent
      Logger.error(e, 'CategoryDomain createCategory');
    }
  }

  private validateTitle(title: string): void {
    if (NotEmptyStringValidation(title.trim())) {
      throw new BadRequestException('Title is empty.');
    }
  }

  private validateSlug(slug: string): void {
    if (NotEmptyStringValidation(slug.trim())) {
      throw new BadRequestException('Slug is empty.');
    }
  }

  private validateAll(title: string, slug: string): void {
    const titleStatus = NotEmptyStringValidation(title);
    const slugStatus = NotEmptyStringValidation(slug);
    if (titleStatus && slugStatus) {
      throw new BadRequestException();
    }
  }
}
