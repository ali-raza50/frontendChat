import React, { useState } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
  Collapse,
  Box,
  MenuItem,
  Badge,
  Avatar,
  withStyles,
  Menu,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/auth';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    height: 60,
    ...theme.mixins.toolbar
  },
  toolbar2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#3f51b5',
    padding: theme.spacing(0, 1),
    height: 60
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [collapseOpen, setCollapseOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openw = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };
  const handleOpen = () => {
    setCollapseOpen(!collapseOpen);
  };
  const StyledMenuItem = withStyles((theme) => ({
    root: {}
  }))(MenuItem);

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5'
    }
  })((props: any) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      {...props}
    />
  ));

  return (
    <div className={classes.root}>
      {/* implement your layout here */}
      <h1>Menu</h1>

      {/* Here goes your main content */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
