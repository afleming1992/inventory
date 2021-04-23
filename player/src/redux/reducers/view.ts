import {Listeners} from "../actions/listeners";

export enum ViewState {
  LOADING,
  IN_GAME
}

export default function viewReducer(state: ViewState = ViewState.LOADING, action: any) {
  switch(action.type) {
    case Listeners.LOGIN_SUCCESS:
      return ViewState.IN_GAME;
    default:
      return state;
  }
}