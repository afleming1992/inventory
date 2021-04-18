import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";

interface RoleNameProps {
  hidden: boolean,
  roleName: string
}

const RoleName: React.FC<RoleNameProps> = (props) => {
  return (
    <>
      <p>{props.roleName} { props.hidden ? <FontAwesomeIcon icon={faEyeSlash} /> : <></>}</p>
    </>
  );
}

export default RoleName;