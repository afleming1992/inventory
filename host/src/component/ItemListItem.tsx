import React from "react";
import {Item} from "../domain/Item";
import {Card, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";

interface ItemListItemProps {
  item: Item
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
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
  }
}));

const ItemListItem: React.FC<ItemListItemProps> = ({item, ...props}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.image}
        image={item.imageUrl}
        />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5">
            {item.name}
          </Typography>
          <Typography variant="subtitle1">
            {item.description}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

export default ItemListItem;