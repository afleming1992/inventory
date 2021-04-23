import React, {useEffect} from 'react';
import './App.css';
import {Backdrop, CircularProgress, Container, createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {SnackbarProvider} from "notistack";
import {AppState} from "./redux/reducers";
import {connect, useDispatch} from "react-redux";
import {login} from "./redux/actions/inventoryActionCreators";
import {ViewState} from "./redux/reducers/view";
import {Alert, AlertTitle} from "@material-ui/lab";
import InGame from "./pages/InGame";

interface AppProps {
  connected: boolean,
  view: ViewState
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: "#a7c0cd",
      main: "#78909c",
      dark: "#93fde3",
      contrastText: "#fff"
    },
    secondary: {
      light: "#62727b",
      main: "#fffa55",
      dark: "#102027"
    }
  }
})

const App: React.FC<AppProps> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(props.connected){
      const params = new URLSearchParams(window.location.search) // id=123
      let gameId = params.get('game') // 123
      let joinCode = params.get("joinCode")

      if(gameId && joinCode) {
        dispatch(login(parseInt(gameId), joinCode));
      } else {
        alert("Nope");
      }
    }
  },[props.connected])

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline/>
          <Backdrop open={!props.connected}>
            <CircularProgress/>
          </Backdrop>
          {
            props.view === ViewState.LOADING &&
            <Alert variant="filled">
              <AlertTitle>Loading into Game....</AlertTitle>
            </Alert>
          }
          {
            props.view === ViewState.IN_GAME &&
            <InGame />
          }
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    connected: state.socket.connected,
    view: state.view
  }
}

export default connect(mapStateToProps)(App);
