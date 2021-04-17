
export interface SocketState {
  connected: boolean
}

const initialState: SocketState = {
  connected: false
}

export default function socketReducer(state: SocketState = initialState, action: any) {
  switch(action.type) {
    case "CONNECTED":
      return {...state, connected: true}
    case "DISCONNECTED":
      return {...state, connected: false}
    default:
      return state;
  }
}

