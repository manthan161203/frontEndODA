import React, { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { AppContext } from '../App';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [doctorOpen, setDoctorOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { setUserName, setRole, setIsLoggedIn } = useContext(AppContext);
    const userName = localStorage.getItem('userName');


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDoctorClick = () => {
        setDoctorOpen(!doctorOpen);
    };

    const mainLinks = [
        { text: 'Dashboard', route: '/admin' },
        { text: 'Patient', route: '/admin-page/patient' },
        { text: 'Manage Hospital', route: '/admin-page/hospital' },
        { text: 'Add Hospital', route: '/create-hospital' }
    ];

    const settings = [
        { text: 'Your Profile', icon: <AccountCircleIcon />, route: '/your-profile' },
        { text: 'Admin Profile', icon: <AdminPanelSettingsIcon />, route: '/admin-profile' },
        { text: 'Logout', icon: <ExitToAppIcon />, route: '/logout' }
    ];

    const subLinks = [
        { text: 'Clinical Doctor', route: '/admin-page/clinicaldoctor' },
        { text: 'Therapist', route: '/admin-page/therapist' },
        { text: 'Hospital Doctor', route: '/admin-page/doctor' }
    ];

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (route) => {
        if (route === '/your-profile') {
            window.location.href = `/profile-admin/${userName}`;
        } else if (route === '/admin-profile') {
            window.location.href = `/profile-role-admin/${userName}`;
        } else if (route === '/logout') {
            localStorage.removeItem("userName");
            localStorage.removeItem("role");
            localStorage.removeItem("isLoggedIn");
            // setUserName(null);
            // setRole("");
            // setIsLoggedIn(false);
            window.location.href = "/login";
        } else {
            // Handle other links
            window.location.href = route;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">Eazy Health Care (Admin Panel)</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {/* <img src="https://via.placeholder.com/40" alt="Logo" style={{ width: 40, height: 40, marginRight: theme.spacing(2) }} /> */}
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {settings.map((item) => (
                            <MenuItem key={item.text} onClick={() => handleItemClick(item.route)}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <Typography variant="inherit" noWrap>
                                    {item.text}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {mainLinks.map((link) => (
                        <ListItem key={link.text} disablePadding onClick={() => handleItemClick(link.route)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItemButton onClick={handleDoctorClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Doctors" />
                        {doctorOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={doctorOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {subLinks.map((link) => (
                                <ListItem key={link.text} disablePadding onClick={() => handleItemClick(link.route)}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={link.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}
