import {Item} from "../../domain/Item";
import {Listeners} from "../actions/listeners";
import {ShowItemEvent} from "../../domain/ShowItemEvent";
import {ShownItemAction} from "../actions/types";
import {Role} from "../../domain/Role";

export interface ItemState {
  items: Item[]
  shownItems: ShowItemEvent[]
}

const initialState: ItemState = {
  items: [],
  shownItems: []
}

export default function itemReducer(state: ItemState = initialState, action: any) {
  switch(action.type) {
    case Listeners.SHOWN_ITEM:
      return {...state, shownItems: addShownItem(state.shownItems, action.data.role, action.data.item)}
    case ShownItemAction.DIMISS:
      return {...state, shownItems: removeShownItem(state.shownItems, action.data.id)}
    case Listeners.ITEM_ADDED:
      return {...state, items: addOrReplaceItem(state.items, action.data.item)}
    case Listeners.ITEM_REMOVED:
      return {...state, items: removeItem(state.items, action.data)}
    case Listeners.ROLE_UPDATE:
      return {...state, items: action.data.items}
    default:
      return state;
  }
}

function addOrReplaceItem(items: Item[], replacementItem: Item) {
  let updatedItems = [...items];
  if(replacementItem.id) {
    updatedItems = removeItem(items, replacementItem.id || 0)
  }
  updatedItems.push(replacementItem);
  return updatedItems;
}

function removeItem(items: Item[], itemToRemoveId: number) {
  let updatedItems = [...items];
  updatedItems = updatedItems.filter((item) => item.id != itemToRemoveId)
  return updatedItems;
}

function addShownItem(shownItems: ShowItemEvent[], owner: Role, item: Item) {
  let updatedShownItems = [...shownItems];
  updatedShownItems.push(new ShowItemEvent(owner, item));
  return updatedShownItems;
}

function removeShownItem(shownItems: ShowItemEvent[], shownItemId: string) {
  let updatedShownItems = [...shownItems];
  updatedShownItems = updatedShownItems.filter((item) => item.id !== shownItemId);
  return updatedShownItems;
}