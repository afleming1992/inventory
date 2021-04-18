import {combineReducers} from "redux";
import gameReducer, {GameState} from "./game";
import roleReducer, {RoleState} from "./role";
import viewReducer, {ViewState} from "./view";
import socketReducer, {SocketState} from "./socket";
import itemReducer, {ItemState} from "./item";

export interface AppState {
  socket: SocketState,
  game: GameState,
  role: RoleState,
  item: ItemState,
  view: ViewState
}

const rootReducer = combineReducers({
  socket: socketReducer,
  game: gameReducer,
  role: roleReducer,
  item: itemReducer,
  view: viewReducer
});

export default rootReducer;