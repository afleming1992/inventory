import React from 'react';
import './App.css';
import {Backdrop, CircularProgress, createMuiTheme, CssBaseline, makeStyles, ThemeProvider} from "@material-ui/core";
import {SnackbarProvider} from "notistack";
import {AppState} from "./redux/reducers";
import {connect} from "react-redux";
import {ViewState} from "./redux/reducers/view";
import GameManager from "./pages/GameManager";
import Login from "./pages/Login";

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
      dark: "#4b636e",
      contrastText: "#fff"
    },
    secondary: {
      light: "#62727b",
      main: "#fffa55",
      dark: "#102027"
    }
  }
})

const useStyles = makeStyles((theme) => ({

}));

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <Backdrop open={!props.connected}>
            <CircularProgress />
          </Backdrop>
          {
            props.view === ViewState.LOGIN &&
            <Login />
          }
          {
            props.view === ViewState.GAME &&
            <GameManager />
          }
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
};

const mapStateToProps = (state: AppState) => {
  return {
    connected: state.socket.connected,
    view: state.view
  }
}

export default connect(mapStateToProps)(App);
