import React from 'react';
import {Badge, BottomNavigation, BottomNavigationAction, makeStyles} from "@material-ui/core";
import {InGameView} from "../pages/InGame";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faSuitcase} from "@fortawesome/free-solid-svg-icons";

interface BottomNavigationProps {
  shownItemsNumber: number
  currentView: InGameView,
  setView: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: 0,
    position: "fixed",
    width: "inherit"
  }
}));

const InventoryBottomNav: React.FC<BottomNavigationProps> = (props) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: InGameView) => {
    props.setView(newValue);
  };

  return (
    <BottomNavigation showLabels value={props.currentView} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Your Items" value={InGameView.ITEMS} icon={<FontAwesomeIcon size="2x" icon={faSuitcase}/>} />
      <BottomNavigationAction label="Shown Items" value={InGameView.SHOWN_ITEMS} icon={
        <Badge color="secondary" badgeContent={props.shownItemsNumber}>
          <FontAwesomeIcon size="2x" icon={faEye} />
        </Badge>
      } />
    </BottomNavigation>
  );
}

export default InventoryBottomNav;