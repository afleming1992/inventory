import {InventoryAction, ShownItemAction} from "./types";

export const login = (gameId: number, joinCode: string) => {
  return {
    type: InventoryAction.LOGIN,
    meta: {
      remote: true
    },
    payload: {
      gameId,
      joinCode
    }
  }
}

export const showItem = (recipientRoleId: number, itemId: number) => {
  return {
    type: InventoryAction.SHOW_ITEM,
    meta: {
      remote: true
    },
    payload: {
      recipientRoleId,
      itemId
    }
  }
}

export const giveItem = (recipientRoleId: number, itemId: number) => {
  return {
    type: InventoryAction.GIVE_ITEM,
    meta: {
      remote: true
    },
    payload: {
      recipientRoleId,
      itemId
    }
  }
}

export const dismissShownItem = (id: string) => {
  return {
    type: ShownItemAction.DIMISS,
    data: {
      id
    }
  }
}