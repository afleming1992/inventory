import {Item} from "./Item";

export class Role {
  public id: number | undefined
  public roleName: string | undefined
  public hidden: boolean | undefined
  public joinCode: string | undefined
  public itemList: Item[] | undefined
}