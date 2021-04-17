import {combineReducers} from "redux";
import gameReducer, {GameState} from "./game";
import roleReducer, {RoleState} from "./role";
import viewReducer, {ViewState} from "./view";
import socketReducer, {SocketState} from "./socket";

export interface AppState {
  socket: SocketState,
  game: GameState,
  role: RoleState,
  view: ViewState
}

const rootReducer = combineReducers({
  socket: socketReducer,
  game: gameReducer,
  role: roleReducer,
  view: viewReducer
});

export default rootReducer;