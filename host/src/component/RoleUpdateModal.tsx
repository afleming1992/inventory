import React, {useState} from 'react';
import {Role} from "../domain/Role";
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slide, TextField,
} from "@material-ui/core";
import {TransitionProps} from "@material-ui/core/transitions";
import {connect, useDispatch} from "react-redux";
import {AppState} from "../redux/reducers";
import {closeRoleUpdateModal} from "../redux/actions/dialogActionCreators";
import {createRole} from "../redux/actions/inventoryActionCreators";

export enum RoleUpdateModalMode {
  NONE,
  CREATE,
  UPDATE
}

interface RoleUpdateModalProps {
  showModal: boolean
  mode: RoleUpdateModalMode
  role: Role
}

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  itemText: {
    marginLeft: theme.spacing(2)
  }
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RoleUpdateModal:React.FC<RoleUpdateModalProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState(props.role.roleName || "");

  const onNameChange = (event: any) => {
    const {name, value} = event.target;
    setName(value);
  }

  const canSubmit = () => {
    return name.length > 0
  }

  const onSubmit = () => {
    dispatch(createRole(name));
    handleClose();
  }

  const handleClose = () => {
    dispatch(closeRoleUpdateModal());
  }

  return (
    <Dialog open={props.showModal} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle>Create Role</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          onChange={onNameChange}
          id="name"
          label="Role Name"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={!canSubmit()} onClick={onSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    showModal: state.role.showUpdateModal,
    mode: state.role.mode,
    role: state.role.currentRole || new Role(),
  }
}

export default connect(mapStateToProps)(RoleUpdateModal)