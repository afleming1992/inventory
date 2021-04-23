import {Item} from "./Item";

export class Role {
  public id: number | undefined
  public roleName: string = ""
  public hidden: boolean = true
  public joinCode: string | undefined
  public items: Item[] = []
}