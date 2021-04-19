export enum Listeners {
  CONNECTED="CONNECTED",
  DISCONNECTED="DISCONNECTED",
  HOST_LOGIN_SUCCESS="HOST_LOGIN_SUCCESS",
  HOST_ERROR="HOST_ERROR",
  GAME_UPDATE="GAME_UPDATE",
  ITEM_ADDED="ITEM_ADDED",
  ITEM_REMOVED="ITEM_REMOVED",
  ROLE_UPDATE="ROLE_UPDATE"
}

export const actionListeners = () => {
  let enumValues:Array<string> = [];

  for(let value in Listeners) {
    enumValues.push( value );
  }

  return enumValues;
}