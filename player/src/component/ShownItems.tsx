import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import {ShowItemEvent} from "../domain/ShowItemEvent";
import InventoryItem, {InventoryItemMode} from "./InventoryItem";
import {Alert, AlertTitle} from "@material-ui/lab";
import {AppState} from "../redux/reducers";
import {connect} from "react-redux";

interface ShownItemsProps {
  shownItems: ShowItemEvent[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  }
}));

const ShownItems: React.FC<ShownItemsProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.root} spacing={2}>
        {
          props.shownItems.length == 0 &&
          <Alert severity="info" variant="filled">
            <AlertTitle>No Shown Items</AlertTitle>
          </Alert>
        }
        {
          props.shownItems.map((showItem) => (
              <InventoryItem item={showItem.item} mode={InventoryItemMode.SHOWN_ITEM} shownItemId={showItem.id} />
          ))
        }
      </Grid>
    </>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    shownItems: state.item.shownItems
  }
}

export default connect(mapStateToProps)(ShownItems);