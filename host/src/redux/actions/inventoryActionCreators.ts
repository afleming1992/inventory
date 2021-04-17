import {InventoryAction, SocketAction} from "./types";

export const createGame = (): SocketAction => {
  return {
    type: InventoryAction.CREATE_GAME,
    meta: {
      remote: true
    },
    payload: {}
  }
}

export const login = (hostKey: string): SocketAction => {
  return {
    type: InventoryAction.LOGIN,
    meta: {
      remote: true
    },
    payload: {
      hostKey
    }
  }
}

export const createRole = (name: string): SocketAction => {
  return {
    type: InventoryAction.CREATE_ROLE,
    meta: {
      remote: true
    },
    payload: {
      name
    }
  }
}