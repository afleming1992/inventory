export class Item {
  public id: number | undefined
  public name: string = ""
  public imageUrl: string | undefined
  public description: string | undefined
  public maxUsages: number | undefined
  public timesUsed: number | undefined
  public swappable: boolean = true
}