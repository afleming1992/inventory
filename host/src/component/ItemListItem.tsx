import React from "react";
import {Item} from "../domain/Item";
import {Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import VisibilityToggle from "./VisibilityToggle";
import {changeItemVisibility, updateRole, useItem} from "../redux/actions/inventoryActionCreators";
import {useDispatch} from "react-redux";
import {openItemUpdateModal} from "../redux/actions/dialogActionCreators";

interface ItemCard {
  item: Item
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(1)
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto',
  },
  image: {
    width: 151
  },
  imageContainer: {
    display: 'flex',
    margin: theme.spacing(1)
  },
  red: {
    color: "red",
    fontWeight: "bold"
  },
  normal: {

  }
}));

const ItemCard: React.FC<ItemCard> = ({item, ...props}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onVisibilityChange = (event: any) => {
    if(item.id) {
      dispatch(changeItemVisibility(item.id, !event.target.checked))
    }
  }

  const OnUseItem = () => {
    dispatch(useItem(item.id || 0));
  }

  const onMoveItem = () => {

  }

  const isItemOutOfUses = () => {
    return (item.timesUsed || 0) >= (item.maxUsages || 0);
  }

  const onEditClick = () => {
    dispatch(openItemUpdateModal(item));
  }

  return (
    <Card className={classes.root}>
      <div className={classes.imageContainer}>
        <CardMedia
          className={classes.image}
          image={item.imageUrl}
          />
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5">
            {item.name}
          </Typography>
          <Typography variant="subtitle1">
            {item.description}
          </Typography>
          {
            item.maxUsages &&
            <Typography variant="subtitle2" className={isItemOutOfUses() ? classes.red : classes.normal}>
              {item.maxUsages - (item.timesUsed || 0)}/{item.maxUsages} usages remaining
            </Typography>
          }
        </CardContent>
        <CardActions>
          <VisibilityToggle hidden={item.hidden} withLabel={false} onChange={onVisibilityChange} />
          <Button onClick={onMoveItem}>Move</Button>
          {
            item.maxUsages && <Button disabled={isItemOutOfUses()} onClick={OnUseItem}>Use Item</Button>
          }
          <Button onClick={onEditClick}>Edit</Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default ItemCard;