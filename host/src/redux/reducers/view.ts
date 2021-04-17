import {Listeners} from "../actions/listeners";

export enum ViewState {
  LOGIN,
  GAME
}

export default function viewReducer(state: ViewState = ViewState.LOGIN, action:any) {
  switch(action.type) {
    case Listeners.HOST_LOGIN_SUCCESS:
      return ViewState.GAME
    case Listeners.DISCONNECTED:
      return ViewState.LOGIN
    default:
      return state;
  }
}