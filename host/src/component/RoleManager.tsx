import React from 'react';
import {Role} from "../domain/Role";
import {Typography} from "@material-ui/core";

interface RoleManagerProps {
  role: Role
}

const RoleManager: React.FC<RoleManagerProps> = (props) => {
  return (
    <>
      <Typography variant="h4">{props.role.roleName}</Typography>
    </>
  )
}

export default RoleManager;