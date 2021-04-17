import React, {useState} from 'react';
import {Box, makeStyles, Tab, Tabs, Typography} from "@material-ui/core";
import {Role} from "../domain/Role";
import {AppState} from "../redux/reducers";
import {connect} from "react-redux";
import RoleManager from "./RoleManager";

interface RoleSelectorProps {
  roles: Role[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const RoleSelector:React.FC<RoleSelectorProps> = (props) => {
  const classes = useStyles();

  const [visibleRole, setVisibleRole] = useState(0);

  const onRoleSelection = (event: React.ChangeEvent<{}>, newValue: number) => {
    setVisibleRole(newValue)
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={visibleRole}
        onChange={onRoleSelection}
        className={classes.tabs}
      >
        {
          props.roles.map((role) => {
            return (
              <Tab label={role.roleName} value={role.id} />
            );
          })
        }
      </Tabs>
      {
        props.roles.map((role) => {
          if (role.id) {
            return (
              <TabPanel value={visibleRole} index={role.id}>
                <RoleManager role={role}/>
              </TabPanel>
            );
          } else {
            return <></>
          }
        })
      }
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    roles: state.role.roles
  }
}

export default connect(mapStateToProps)(RoleSelector);