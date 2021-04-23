import React from 'react';
import {Item} from "../domain/Item";
import {
  Button,
  Card,
  CardContent, CardMedia,
  makeStyles,
  Typography
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {openGiveModal, openShowModal} from "../redux/actions/itemModalActionCreators";
import UsesLeftButton from "./UsesLeftButton";
import {Role} from "../domain/Role";
import {dismissShownItem} from "../redux/actions/inventoryActionCreators";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

interface InventoryItemProps {
  shownItemId?: string | undefined,
  currentOwner?: Role | undefined,
  mode: InventoryItemMode,
  item: Item
}

export enum InventoryItemMode {
  ITEM,
  SHOWN_ITEM
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(1)
  },
  details: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  media: {
    height: theme.spacing(13),
    width: theme.spacing(13)
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    flexGrow: 1,
    float:"left",
    align:"left",
    textAlign: "left"
  },
  right: {
    flexGrow: 1,
    float:"right",
    align:"right",
    textAlign: "right"
  }
}));

const InventoryItem:React.FC<InventoryItemProps> = ({item, mode, currentOwner, shownItemId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onGive = () => {
    dispatch(openGiveModal(item));
  }

  const onShow = () => {
    dispatch(openShowModal(item));
  }

  const onDimissShownItem = (id: string) => {
    dispatch(dismissShownItem(id))
  }

  return (
    <Card className={classes.root}>
      {
        item.imageUrl && <CardMedia className={classes.media} image={item.imageUrl} />
      }
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
        {
          mode === InventoryItemMode.ITEM &&
          <div className={classes.buttons}>
            <div className={classes.left}>
              {
                item.swappable &&
                <Button size="large" onClick={onGive}>Give</Button>
              }
              <Button size="large" onClick={onShow}>Show</Button>
            </div>
            <div className={classes.right}>
              {
                item.maxUsages &&
                <UsesLeftButton maxUsages={item.maxUsages} timesUsed={item.timesUsed || 0} />
              }
            </div>
          </div>
        }
        {
          mode === InventoryItemMode.SHOWN_ITEM &&
          <div className={classes.buttons}>
            <div className={classes.right}>
              <Button size="large" onClick={() => onDimissShownItem(shownItemId || "")}><FontAwesomeIcon icon={faTimes} size="2x" />&nbsp;Dismiss</Button>
            </div>
          </div>
        }
      </div>
    </Card>
  );
}

export default InventoryItem;