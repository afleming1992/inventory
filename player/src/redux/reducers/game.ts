import {Role} from "../../domain/Role";
import {Listeners} from "../actions/listeners";

export interface GameState {
  characters: Role[],
  currentRole: Role | undefined
}

const initialState: GameState = {
  characters: [],
  currentRole: undefined
}

export default function gameReducer(state: GameState = initialState, action: any) {
  switch(action.type) {
    case Listeners.ROLE_UPDATE:
      return {...state, currentRole: action.data}
    case Listeners.OTHER_ROLES_UPDATE:
      return {...state, characters: action.data}
    default:
      return state;
  }
}