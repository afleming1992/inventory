import {InventoryAction, SocketAction} from "./types";
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

export const updateItem = (item: Item) => {
  return {
    type: InventoryAction.UPDATE_ITEM,
    meta: {
      remote: true
    },
    payload: {
      item
    }
  }
}

export const changeItemVisibility = (itemId: number, hidden: boolean) => {
  return {
    type: InventoryAction.ITEM_CHANGE_VISIBILITY,
    meta: {
      remote: true
    },
    payload: {
      itemId,
      hidden
    }
  }
}

export const useItem = (itemId: number) => {
  return {
    type: InventoryAction.USE_ITEM,
    meta: {
      remote: true
    },
    payload: {
      itemId
    }
  }
}

export const moveItem = (recipientRoleId: number, itemId:number) => {
  return {
    type: InventoryAction.MOVE_ITEM,
    meta: {
      remote: true
    },
    payload: {
      recipientRoleId,
      itemId
    }
  }
}