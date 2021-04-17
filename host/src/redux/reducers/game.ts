import {InventoryAction} from "../actions/types";
import {Listeners} from "../actions/listeners";

export interface GameState {
  inGame: boolean
  gameId: number | undefined,
  hostKey: string | undefined,
  joining: boolean
}

const initialState: GameState = {
  inGame: false,
  gameId: undefined,
  hostKey: undefined,
  joining: false
}

export default function gameReducer(state: GameState = initialState, action: any) {
  switch(action.type) {
    case InventoryAction.CREATE_GAME:
      return {...state, joining: true}
    case InventoryAction.LOGIN:
      return {...state, joining: true}
    case Listeners.HOST_LOGIN_SUCCESS:
      return {...state, joining: false, hostKey: action.data.hostKey, gameId: action.data.id}
    case Listeners.DISCONNECTED:
      return initialState;
    default:
      return state;
  }
}