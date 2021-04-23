import React, {useState} from 'react';
import {Box, makeStyles, Tab, Tabs, Typography} from "@material-ui/core";
import {Role} from "../domain/Role";
import RoleManager from "./RoleManager";
import RoleName from "./RoleName";
import {connect} from "react-redux";
import {AppState} from "../redux/reducers";

interface RoleSelectorProps {
  roles: Role[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    width: '100%'
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  className: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      className={className}
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
          props.roles.sort((a, b) => a.roleName.localeCompare(b.roleName)).map((role) => {
            return (
              <Tab label={<RoleName hidden={role.hidden} roleName={role.roleName || ""} />} value={role.id} />
            );
          })
        }
      </Tabs>
      {
        props.roles.map((role) => {
          if (role.id) {
            return (
              <TabPanel className={classes.tab} value={visibleRole} index={role.id}>
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