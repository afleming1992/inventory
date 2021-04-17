import {applyMiddleware, compose, createStore} from "redux";
import createSocketIoMiddleware from "../redux/middleware/socketMiddleware"
import rootReducer from "../redux/reducers/index";
import io from 'socket.io-client';
import {actionListeners} from "./actions/listeners";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const socket = io.connect();

const socketIoMiddleware = createSocketIoMiddleware(socket, actionListeners());

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  let store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(socketIoMiddleware))
  )

  socket.on("connect", () => {
    store.dispatch({"type":"CONNECTED"});
  });

  socket.on("reconnect", () => {
    store.dispatch({"type":"CONNECTED"});
  })

  socket.on("disconnect", () => {
    store.dispatch({"type":"DISCONNECTED"});
  })

  return store;
}