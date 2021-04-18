import React from 'react';
import {FormControlLabel, makeStyles, Switch, Typography} from "@material-ui/core";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface VisibilityToggle {
  hidden: boolean,
  withLabel: boolean,
  onChange: any
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1)
  }
}));

const VisibilityToggle:React.FC<VisibilityToggle> = (props) => {
  const classes = useStyles();

  return (
    <>
      <FormControlLabel
        control={<Switch checked={!props.hidden} onChange={props.onChange} name="" color="secondary" />}
        label={<FontAwesomeIcon className={classes.icon} icon={props.hidden ? faEyeSlash : faEye} />} />
    </>
  )
}

export default VisibilityToggle;
