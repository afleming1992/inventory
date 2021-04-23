import React from 'react';
import {connect} from "react-redux";
import {AppState} from "../redux/reducers";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {Item} from "../domain/Item";
import InventoryItem, {InventoryItemMode} from "./InventoryItem";

interface InventoryListProps {
  items: Item[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  }
}));

const InventoryList: React.FC<InventoryListProps> = ({items, ...props}) => {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Items</Typography>
        </Grid>
        {
          items.map((item) => (
            <Grid item xs={12} lg={6} xl={6}>
              <InventoryItem item={item} mode={InventoryItemMode.ITEM} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    items: state.item.items
  }
}

export default connect(mapStateToProps)(InventoryList);