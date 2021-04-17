import React, {useState} from 'react';
import {AppState} from "../redux/reducers";
import {connect, useDispatch} from "react-redux";
import {Button, CircularProgress, Container, CssBaseline, makeStyles, TextField} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {createGame, login} from "../redux/actions/inventoryActionCreators";

interface LoginProps {
  connected: boolean,
  joining: boolean
}

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login: React.FC<LoginProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [hostKey, setHostKey] = useState("");

  const onCreate = (event:any) => {
    event.preventDefault();
    dispatch(createGame());
  }

  const onJoining = (event:any) => {
    event.preventDefault();
    dispatch(login(hostKey))
  }

  const onHostKeyChange = (event: any) => {
    const {name, value} = event.target;
    if( name === "hostKey" ) {
      setHostKey(value);
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {
          props.connected &&
          <>
            <form className={classes.form} onSubmit={onJoining} noValidate autoComplete="off">
              <TextField name="hostKey" onChange={onHostKeyChange} label="Existing Game Host Key" fullWidth required variant="outlined" />
              <div className={classes.buttonWrapper}>
                <Button type="submit" size="large" fullWidth color="primary" className={classes.submit} variant="contained" disabled={props.joining}>Join Game</Button>
                { props.joining && <CircularProgress size={26} className={classes.buttonProgress} /> }
              </div>
            </form>
            <br />
            <Button size="large" fullWidth color="primary" variant="contained" onClick={onCreate}>Create Game</Button>
          </>
        }
      </div>
    </Container>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    connected: state.socket.connected,
    joining: state.game.joining
  }
}
export default connect(mapStateToProps)(Login)