import { ICommand } from "@nestjs/cqrs";
import { Optional } from "../../../shared";

export class RestoreCategoryCommand implements ICommand {
  constructor(
    public readonly id: string,
  ) { }
}