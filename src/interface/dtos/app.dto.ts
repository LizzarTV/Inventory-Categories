import { Optional } from "../../shared";

export interface GetCategory {
  id: string;
}

export interface CreateCategory {
  title: string;
}

export interface UpdateCategory {
  id: string;
  title: Optional<string>;
  active: Optional<boolean>;
}

export interface DeleteCategory {
  id: string;
}

export type DTO = GetCategory | CreateCategory | UpdateCategory | DeleteCategory;