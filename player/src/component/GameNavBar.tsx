import React from 'react';
import {connect} from "react-redux";
import {AppState} from "../redux/reducers";
import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Role} from "../domain/Role";

interface GameNavBarProps {
  role: Role | undefined
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));

const GameNavBar: React.FC<GameNavBarProps> = ({role, ...props}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            { role ? `${role.name}'s Inventory` : "Loading..." }
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    role: state.game.currentRole
  }
}

export default connect(mapStateToProps)(GameNavBar);