import {Item} from "./Item";

export class Role {
  public id: number | undefined
  public roleName: string | undefined
  public hidden: boolean = true
  public joinCode: string | undefined
  public items: Item[] | undefined
}