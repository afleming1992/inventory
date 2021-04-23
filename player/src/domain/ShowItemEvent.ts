import {Role} from "./Role";
import {Item} from "./Item";
import * as uuid from 'uuid';

export class ShowItemEvent {
  public id: string
  public role: Role
  public item: Item

  constructor(role : Role, item : Item) {
    this.id = uuid.v4();
    this.role = role
    this.item = item
  }
}