import React from 'react';
import {connect, useDispatch} from "react-redux";
import {AppState} from "../redux/reducers";
import {GameState} from "../redux/reducers/game";
import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {openRoleCreateModal} from "../redux/actions/dialogActionCreators";

interface GameNavBarProps {
  game: GameState
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));

const GameNavBar: React.FC<GameNavBarProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Game: { props.game.hostKey }
          </Typography>
          <Button color="inherit" onClick={() => dispatch(openRoleCreateModal())}>Add Role</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    game: state.game
  }
}

export default connect(mapStateToProps)(GameNavBar)