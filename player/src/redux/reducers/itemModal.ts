import {Item} from "../../domain/Item";
import {ItemModalAction} from "../actions/types";

export enum ItemModalMode {
  GIVE,
  SHOW,
  NONE
}

export interface ItemModalState {
  currentItem: Item | undefined,
  mode: ItemModalMode,
  open: boolean
}

const initialState: ItemModalState = {
  open: false,
  currentItem: undefined,
  mode: ItemModalMode.NONE
}

export function itemModalReducer(state: ItemModalState = initialState, action: any) {
  switch(action.type) {
    case ItemModalAction.OPEN_GIVE_MODAL:
      return {...state, open: true, currentItem: action.payload.item, mode: ItemModalMode.GIVE}
    case ItemModalAction.OPEN_SHOW_MODAL:
      return {...state, open: true, currentItem: action.payload.item, mode: ItemModalMode.SHOW}
    case ItemModalAction.CLOSE_MODAL:
      return {...state, open: false, currentItem: undefined, mode: ItemModalMode.NONE}
    default:
      return state;
  }
}