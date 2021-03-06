import { AnemicBase } from './base.model';

export interface AnemicApp extends AnemicBase {
  readonly title: string;
  readonly slug: string;
  readonly active: boolean;
}

export interface CreateCategory {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly active: boolean;
}
