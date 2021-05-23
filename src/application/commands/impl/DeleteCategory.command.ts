import { ICommand } from "@nestjs/cqrs";
import { Optional } from "../../../shared";

export class DeleteCategoryCommand implements ICommand {
  constructor(
    public readonly id: string,
  ) { }
}