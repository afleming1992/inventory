import {ItemModalAction} from "./types";
import {Item} from "../../domain/Item";

export const openGiveModal = (item: Item) => {
  return {
    type: ItemModalAction.OPEN_GIVE_MODAL,
    payload: {
      item
    }
  }
}

export const openShowModal = (item: Item) => {
  return {
    type: ItemModalAction.OPEN_SHOW_MODAL,
    payload: {
      item
    }
  }
}

export const closeModal = () => {
  return {
    type: ItemModalAction.CLOSE_MODAL,
  }
}
