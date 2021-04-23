import React, {useState} from 'react';
import GameNavBar from "../component/GameNavBar";
import InventoryList from "../component/InventoryList";
import ItemModal from "../component/ItemModal";
import ShownItems from "../component/ShownItems";
import {BottomNavigation, Container, makeStyles} from "@material-ui/core";
import InventoryBottomNav from "../component/InventoryBottomNav";
import { AppState } from '../redux/reducers';
import {connect} from "react-redux";

interface InGameProps {
  shownItemTotal: number
}

export enum InGameView {
  ITEMS,
  SHOWN_ITEMS
}

const useStyles = makeStyles((theme) => ({
  content: {
    marginBottom: "56px"
  }
}))

const InGame: React.FC<InGameProps> = (props) => {
  const classes = useStyles();
  const [view, setView] = useState(InGameView.ITEMS);

  return (
    <>
      <GameNavBar />
      <Container disableGutters className={classes.content} maxWidth={false}>
        {
          view === InGameView.ITEMS &&
          <InventoryList />
        }
        {
          view == InGameView.SHOWN_ITEMS &&
          <ShownItems />
        }
        <InventoryBottomNav shownItemsNumber={props.shownItemTotal} currentView={view} setView={setView} />
      </Container>
      <ItemModal />
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    shownItemTotal: state.item.shownItems.length
  }
}

export default connect(mapStateToProps)(InGame);