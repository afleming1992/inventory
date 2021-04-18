import React from "react";
import {Item} from "../domain/Item";
import {Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import VisibilityToggle from "./VisibilityToggle";
import {changeItemVisibility, updateRole} from "../redux/actions/inventoryActionCreators";
import {useDispatch} from "react-redux";

interface ItemListItemProps {
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
  }
}));

const ItemListItem: React.FC<ItemListItemProps> = ({item, ...props}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onVisibilityChange = (event: any) => {
    if(item.id) {
      dispatch(changeItemVisibility(item.id, !event.target.checked))
    }
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
            <Typography variant="subtitle2">{item.maxUsages - (item.timesUsed || 0)}/{item.maxUsages} usages remaining</Typography>
          }
        </CardContent>
        <CardActions>
          <VisibilityToggle hidden={item.hidden} withLabel={false} onChange={onVisibilityChange} />
          {
            item.maxUsages && <Button>Use Item</Button>
          }
          <Button>Edit</Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default ItemListItem;