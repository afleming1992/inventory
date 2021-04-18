import React, {useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, FormControlLabel,
  makeStyles,
  Slide, Switch,
  TextField
} from "@material-ui/core";
import {TransitionProps} from "@material-ui/core/transitions";
import {Item} from "../domain/Item";
import {closeItemUpdateModal} from "../redux/actions/dialogActionCreators";
import {Role} from "../domain/Role";
import {createItem} from "../redux/actions/inventoryActionCreators";
import {AppState} from "../redux/reducers";

export enum ItemUpdateModalMode {
  NONE,
  CREATE,
  UPDATE
}

interface ItemUpdateModalProps {
  showModal: boolean,
  mode: ItemUpdateModalMode,
  currentItem: Item
  assignedToRole: Role | undefined
}

const useStyles = makeStyles((theme) => ({

}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ItemUpdateModal:React.FC<ItemUpdateModalProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState(props.currentItem.name || "");
  const [imageUrl, setImageUrl] = useState(props.currentItem.imageUrl || "");
  const [description, setDescription] = useState(props.currentItem.description || "");
  const [maxUsages, setMaxUsages] = useState<number | undefined>(undefined);
  const [swappable, setSwappable] = useState(props.currentItem.swappable || true);
  const [visible, setVisible] = useState(!props.currentItem.hidden || false);

  const onSubmit = () => {
    const item = new Item();
    item.id = props.currentItem.id;
    item.name = name;
    item.imageUrl = imageUrl;
    item.description = description;
    item.maxUsages = maxUsages;
    item.swappable = swappable;
    item.hidden = !visible;
    if(props.assignedToRole){
      dispatch(createItem(props.assignedToRole.id || 0, item));
    }
    handleClose();
  }
  
  const handleClose = () => {
    dispatch(closeItemUpdateModal())
  }

  const canSubmit = () => {
    return name.length > 0;
  }

  return (
    <Dialog open={props.showModal} onClose={handleClose} TransitionComponent={Transition}>
      <form>
        <DialogTitle>
          { props.mode === ItemUpdateModalMode.CREATE ? `Create Item for ${props.assignedToRole?.roleName}` : `Update ${props.currentItem.name}` }
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(event:any) => {setName(event.target.value)}}
          />
          <TextField
            fullWidth
            label="Image URL"
            margin="normal"
            variant="outlined"
            value={imageUrl}
            onChange={(event:any) => {setImageUrl(event.target.value)}}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(event:any) => {setDescription(event.target.value)}}
          />
          <TextField
            fullWidth
            type="number"
            margin="normal"
            variant="outlined"
            label="Max Usages"
            value={maxUsages}
            onChange={(event:any) => {setMaxUsages(event.target.value)}}
            />
            <FormControlLabel
              control={<Switch checked={swappable} onChange={(event:any) => {setSwappable(event.target.checked)}} />}
              label="Swappable (Can be traded)"
            />
            <FormControlLabel
              control={<Switch checked={visible} onChange={(event:any) => {setVisible(event.target.checked)}} />}
              label="Hidden (If checked, Player can't see item)"
            />
        </DialogContent>
        <DialogActions>
          <Button disabled={!canSubmit()} onClick={onSubmit}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    showModal: state.item.showUpdateModal,
    mode: state.item.mode,
    assignedToRole: state.item.assignedToRole,
    currentItem: state.item.currentItem || new Item()
  }
}

export default connect(mapStateToProps)(ItemUpdateModal);