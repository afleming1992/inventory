import {InventoryAction, SocketAction} from "./types";
import {Role} from "../../domain/Role";
import {Item} from "../../domain/Item";

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

export const updateRole = (roleId: number, roleName: string | undefined, hidden: boolean) => {
  return {
    type: InventoryAction.UPDATE_ROLE,
    meta: {
      remote: true
    },
    payload: {
      id: roleId,
      roleName,
      hidden
    }
  }
}

export const createItem = (roleId: number, item: Item) => {
  return {
    type: InventoryAction.CREATE_ITEM,
    meta: {
      remote: true
    },
    payload: {
      roleId,
      item
    }
  }
}