import {Role} from "../../domain/Role";
import {RoleUpdateModalMode} from "../../component/RoleUpdateModal";
import {RoleModalActions} from "../actions/types";
import {Listeners} from "../actions/listeners";

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

