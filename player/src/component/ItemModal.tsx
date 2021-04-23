import React, {useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppState} from "../redux/reducers";
import {Role} from "../domain/Role";
import {ItemModalMode} from "../redux/reducers/itemModal";
import {Item} from "../domain/Item";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select
} from "@material-ui/core";
import {closeModal} from "../redux/actions/itemModalActionCreators";
import Transition from "./Transition";
import {giveItem, showItem} from "../redux/actions/inventoryActionCreators";

interface ItemModalProps {
  open: boolean,
  mode: ItemModalMode,
  currentItem: Item | undefined,
  characters: Role[]
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ItemModal:React.FC<ItemModalProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedCharacter, setSelectedCharacter] = useState<number>(0);

  const handleClose = () => {
    dispatch(closeModal())
  }

  const onSubmit = () => {
    if(props.currentItem && props.currentItem.id) {
      if(props.mode === ItemModalMode.GIVE) {
        dispatch(giveItem(selectedCharacter, props.currentItem.id))
      }
      if(props.mode === ItemModalMode.SHOW) {
        dispatch(showItem(selectedCharacter, props.currentItem.id))
      }
    }
    handleClose();
  }

  const handleCharacterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCharacter(event.target.value as number);
  }

  return (
    <Dialog open={props.open} onClose={handleClose} TransitionComponent={Transition} maxWidth="sm" fullWidth={true}>
      <DialogTitle>{ props.mode === ItemModalMode.GIVE ? `Give ${props.currentItem?.name} to...` : `Show ${props.currentItem?.name} to ...`}</DialogTitle>
      <DialogContent>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Select Character</InputLabel>
          <Select onChange={handleCharacterChange} required={true} label={"Select Character"}>
            {
              props.characters.map((role) => (
                <MenuItem value={role.id}>{role.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button disabled={selectedCharacter === 0} onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    open: state.itemModal.open,
    characters: state.game.characters,
    currentItem: state.itemModal.currentItem,
    mode: state.itemModal.mode
  }
}

export default connect(mapStateToProps)(ItemModal);