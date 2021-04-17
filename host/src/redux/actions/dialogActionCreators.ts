import {RoleModalActions} from "./types";

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