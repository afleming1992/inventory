import React from 'react';
import {Role} from "../domain/Role";
import {Container, Typography} from "@material-ui/core";
import VisibilityToggle from "./VisibilityToggle";
import {useDispatch} from "react-redux";
import {updateRole} from "../redux/actions/inventoryActionCreators";
import ItemList from "./ItemList";

interface RoleManagerProps {
  role: Role
}

const RoleManager: React.FC<RoleManagerProps> = (props) => {
  const dispatch = useDispatch();

  const onVisibilityChange = (event: any) => {
    dispatch(updateRole(props.role.id || 0, props.role.roleName, !event.target.checked))
  }

  return (
    <>
      <Typography variant="h4">{props.role.roleName}</Typography>
      <Typography variant="h5">Join Code: {props.role.joinCode}</Typography>
      <hr />
      <VisibilityToggle hidden={props.role.hidden} withLabel={true} onChange={onVisibilityChange} />
      <hr />
      <ItemList items={props.role.items || []} role={props.role} />
    </>
  )
}

export default RoleManager;