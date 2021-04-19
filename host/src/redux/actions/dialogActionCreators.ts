import {ItemModalActions, RoleModalActions} from "./types";
import {Role} from "../../domain/Role";
import {Item} from "../../domain/Item";

export const openRoleCreateModal = () => {
  return {
    type: RoleModalActions.OPEN_CREATE_ROLE_MODAL
  }
}

export const openRoleUpdateModal = (roleId: number) => {
  return {
    type: RoleModalActions.OPEN_UPDATE_ROLE_MODAL,
    data: {
      roleId
    }
  }
}

export const closeRoleUpdateModal = () => {
  return {
    type: RoleModalActions.CLOSE_ROLE_MODAL
  }
}

export const openItemCreateModal = (role: Role) => {
  return {
    type:ItemModalActions.OPEN_CREATE_ITEM_MODAL,
    data: {
      role
    }
  }
}

export const openItemUpdateModal = (item: Item) => {
  return {
    type:ItemModalActions.OPEN_UPDATE_ITEM_MODAL,
    data: {
      item
    }
  }
}

export const closeItemUpdateModal = () => {
  return {
    type:ItemModalActions.CLOSE_ITEM_UPDATE_MODAL
  }
}

export const openItemMoveModal = (item: Item) => {
  return {
    type: ItemModalActions.OPEN_MOVE_ITEM_MODAL,
    data: {
      item
    }
  }
}

export const closeItemMoveModal = () => {
  return {
    type: ItemModalActions.CLOSE_MOVE_ITEM_MODAL
  }
}