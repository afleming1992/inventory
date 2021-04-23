import {combineReducers} from "redux";
import socketReducer, {SocketState} from "./socket";
import gameReducer, {GameState} from "./game";
import itemReducer, {ItemState} from "./items";
import viewReducer, {ViewState} from "./view";
import {itemModalReducer, ItemModalState} from "./itemModal";

export interface AppState {
  socket: SocketState,
  game: GameState,
  item: ItemState,
  view: ViewState,
  itemModal: ItemModalState
}

const rootReducer = combineReducers({
  socket: socketReducer,
  game: gameReducer,
  item: itemReducer,
  view: viewReducer,
  itemModal: itemModalReducer
});

export default rootReducer;