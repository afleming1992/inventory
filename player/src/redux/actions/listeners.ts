export enum Listeners {
  CONNECTED = "CONNECTED",
  SHOWN_ITEM = "SHOWN_ITEM",
  ITEM_ADDED = "ITEM_ADDED",
  ITEM_REMOVED = "ITEM_REMOVED",
  SHOW_ITEM_SUCCESS = "SHOW_ITEM_SUCCESS",
  GAME_ERROR = "GAME_ERROR",
  ROLE_UPDATE = "ROLE_UPDATE",
  OTHER_ROLES_UPDATE = "OTHER_ROLES_UPDATE",
  ITEM_UPDATE = "ITEM_UPDATE",
  FULL_INVENTORY_UPDATE = "FULL_INVENTORY_UPDATE",
  DISCONNECTED = "DISCONNECTED",
  LOGIN_SUCCESS = "LOGIN_SUCCESS"
}

export const actionListeners = () => {
  let enumValues:Array<string> = [];

  for(let value in Listeners) {
    enumValues.push( value );
  }

  return enumValues;
}