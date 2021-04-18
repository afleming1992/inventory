import React from 'react';
import {Item} from "../domain/Item";
import ItemListItem from "./ItemListItem";
import {Button, makeStyles, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {openItemCreateModal} from "../redux/actions/dialogActionCreators";
import {Role} from "../domain/Role";

interface ItemListProps {
  role: Role
  items: Item[]
}

const useStyles = makeStyles((theme) => ({

}));

const ItemList: React.FC<ItemListProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onAddItem = () => {
    dispatch(openItemCreateModal(props.role))
  }

  return (
    <>
      <Typography variant="h5">Items <Button onClick={onAddItem}>Add Item</Button></Typography>
      {
        props.items.map((item) => {
          return (
            <ItemListItem key={item.id} item={item} />
          )
        })
      }
    </>
  );
}

export default ItemList;