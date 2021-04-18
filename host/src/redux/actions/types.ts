import {Action} from "redux";

export enum InventoryAction {
  CREATE_GAME = "HOST_CREATE_GAME",
  LOGIN = "HOST_LOGIN",
  CREATE_ROLE = "HOST_CREATE_ROLE",
  CREATE_ITEM = "HOST_CREATE_ITEM",
  UPDATE_ROLE = "HOST_UPDATE_ROLE",
  UPDATE_ITEM = "HOST_UPDATE_ITEM",
  MOVE_ITEM = "HOST_MOVE_ITEM",
  ITEM_CHANGE_VISIBILITY = "HOST_ITEM_CHANGE_VISIBILITY",
  USE_ITEM = "HOST_USE_ITEM"
}

export enum RoleModalActions {
  OPEN_CREATE_ROLE_MODAL= "OPEN_CREATE_ROLE_MODAL",
  OPEN_UPDATE_ROLE_MODAL="OPEN_UPDATE_ROLE_MODAL",
  CLOSE_ROLE_MODAL="CLOSE_ROLE_MODAL"
}

export enum ItemModalActions {
  OPEN_CREATE_ITEM_MODAL="OPEN_CREATE_ITEM_MODAL",
  OPEN_UPDATE_ITEM_MODAL="OPEN_UPDATE_ITEM_MODAL",
  CLOSE_ITEM_MODAL="CLOSE_ITEM_MODAL"
}

export interface SocketAction extends Action {
  type: InventoryAction,
  meta: {
    remote: boolean,
    isGameRequest?: boolean
  },
  payload: Object
}