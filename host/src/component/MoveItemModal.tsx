import React, {useState} from 'react';
import {Role} from "../domain/Role";
import {Item} from "../domain/Item";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel, makeStyles,
  MenuItem,
  Select,
  Slide
} from "@material-ui/core";
import {AppState} from "../redux/reducers";
import {TransitionProps} from "@material-ui/core/transitions";
import {connect, useDispatch} from "react-redux";
import {closeItemMoveModal} from "../redux/actions/dialogActionCreators";
import {moveItem} from "../redux/actions/inventoryActionCreators";

interface MoveItemModalProps {
  currentItem: Item
  roles: Role[],
  modalOpen: boolean
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const MoveItemModal: React.FC<MoveItemModalProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeItemMoveModal())
  }

  const [selectedRole, setSelectedRole] = useState<number>(0);

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRole(event.target.value as number);
  }

  const onSubmit = (event: any) => {
    if(props.currentItem.id) {
      dispatch(moveItem(selectedRole, props.currentItem.id))
    }
    handleClose();
  }

  return (
    <Dialog open={props.modalOpen} onClose={handleClose} TransitionComponent={Transition} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Move {props.currentItem.name}</DialogTitle>
      <DialogContent>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Move Item to</InputLabel>
          <Select onChange={handleRoleChange} required={true} label="Move item to">
            <MenuItem value={0}><em>Please select...</em></MenuItem>
            {
              props.roles.map((role) => (
                <MenuItem value={role.id}>{role.roleName}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button disabled={selectedRole === 0} onClick={onSubmit}>Move</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    currentItem: state.item.currentItem || new Item(),
    roles: state.role.roles,
    modalOpen: state.item.showMoveItemModal
  }
}

export default connect(mapStateToProps)(MoveItemModal);