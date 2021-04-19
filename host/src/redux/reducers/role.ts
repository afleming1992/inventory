import {Role} from "../../domain/Role";
import {RoleUpdateModalMode} from "../../component/RoleUpdateModal";
import {RoleModalActions} from "../actions/types";
import {Listeners} from "../actions/listeners";
import {Item} from "../../domain/Item";
import itemReducer from "./item";

export interface RoleState {
  roles: Role[]
  currentRole: Role | undefined,
  showUpdateModal: boolean,
  mode: RoleUpdateModalMode
}

const initialState: RoleState = {
  roles: [],
  currentRole: undefined,
  showUpdateModal: false,
  mode: RoleUpdateModalMode.NONE
}

export default function roleReducer(state: RoleState = initialState, action: any) {
  switch(action.type) {
    case Listeners.GAME_UPDATE:
    case Listeners.HOST_LOGIN_SUCCESS:
      return {...state, roles: action.data.roles}
    case Listeners.ROLE_UPDATE:
      return {...state, roles: updateRole(state.roles, action.data)}
    case Listeners.ITEM_ADDED:
      return {...state, roles: addItemToRole(state.roles, action.data.roleId, action.data.item)}
    case Listeners.ITEM_REMOVED:
      return {...state, roles: removeItemFromRole(state.roles, action.data.roleId, action.data.item)}
    case RoleModalActions.OPEN_CREATE_ROLE_MODAL:
      return {...state, currentRole: new Role(), showUpdateModal:true, mode: RoleUpdateModalMode.CREATE}
    case RoleModalActions.CLOSE_ROLE_MODAL:
      return {...state, currentRole: undefined, showUpdateModal: false, mode: RoleUpdateModalMode.NONE}
    default:
      return state;
  }
}

function updateRole(roles: Role[], updatedRole: Role) : Role[] {
  let updatedRoles = [...roles];
  updatedRoles = updatedRoles.filter((role) => role.id !== updatedRole.id);
  updatedRoles.push(updatedRole);
  return updatedRoles.sort(function(a, b) {
    if(a.id && b.id) {
      return a.id - b.id;
    } else {
      return 1;
    }
  });
}

function addItemToRole(roles: Role[], roleId: number, itemToBeAdded: Item) {
  let roleToUpdate = roles.find((role) => role.id === roleId);
  if(roleToUpdate !== undefined){
    roleToUpdate.items.push(itemToBeAdded);
    return updateRole(roles, roleToUpdate);
  } else {
    return roles;
  }
}

function removeItemFromRole(roles: Role[], roleId: number, itemToBeRemoved: Item) {
  let roleToUpdate = roles.find((role) => role.id === roleId);
  if(roleToUpdate !== undefined) {
    roleToUpdate.items = roleToUpdate.items.filter((item) => item.id !== itemToBeRemoved.id);
    return updateRole(roles, roleToUpdate);
  } else {
    return roles;
  }
}

