import {ItemUpdateModalMode} from "../../component/ItemUpdateModal";
import {Item} from "../../domain/Item";
import {ItemModalActions} from "../actions/types";
import {RoleUpdateModalMode} from "../../component/RoleUpdateModal";
import {Role} from "../../domain/Role";

export interface ItemState {
  assignedToRole: Role | undefined,
  currentItem: Item | undefined,
  showMoveItemModal: boolean,
  showUpdateModal: boolean,
  mode: ItemUpdateModalMode
}

const initialState: ItemState = {
  assignedToRole: undefined,
  currentItem: undefined,
  showMoveItemModal: false,
  showUpdateModal: false,
  mode: ItemUpdateModalMode.NONE
}

export default function itemReducer(state: ItemState = initialState, action: any) {
  switch(action.type) {
    case ItemModalActions.OPEN_CREATE_ITEM_MODAL:
      return {...state, currentItem: new Item(), showUpdateModal:true, mode: ItemUpdateModalMode.CREATE, assignedToRole: action.data.role}
    case ItemModalActions.OPEN_UPDATE_ITEM_MODAL:
      return {...state, currentItem: action.data.item, showUpdateModal:true, mode: ItemUpdateModalMode.UPDATE}
    case ItemModalActions.CLOSE_ITEM_UPDATE_MODAL:
      return {...state, currentRole: undefined, showUpdateModal: false, mode: RoleUpdateModalMode.NONE, assignedToRole: undefined}
    case ItemModalActions.OPEN_MOVE_ITEM_MODAL:
      return {...state, showMoveItemModal: true, currentItem: action.data.item}
    case ItemModalActions.CLOSE_MOVE_ITEM_MODAL:
      return {...state, showMoveItemModal: false, currentItem: undefined}
    default:
      return state;
  }
}