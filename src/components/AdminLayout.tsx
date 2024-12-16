import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useRouter } from 'next/router';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            },
        },
    ],
}),
);

const sideBarContent = [
    {
        label: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/dashboard'
    },
    {
        label: 'Logs',
        icon: <SummarizeIcon />,
        path: '/logs'
    },
    {
        label: 'Micro services',
        icon: <MiscellaneousServicesIcon />,
        path: '/micro-services'
    },
    {
        label: 'Users',
        icon: <PeopleAltIcon />,
        path: '/users'
    },
    {
        label: 'Roles',
        icon: <SettingsAccessibilityIcon />,
        path: '/user-roles'
    },
]

export default function AdminLayout({ children }: any) {
    const router = useRouter();
    const theme = useTheme();
    const [open, setOpen] = React.useState<any>(null);

    React.useEffect(() => {
        if (localStorage.getItem('open') === null) {
            localStorage.setItem('open', 'false');
        }

        setOpen(localStorage.getItem('open') === 'true' ? true : false)
    }, [])

    const handleDrawer = () => {
        localStorage.setItem('open', (!open).toString());
        setOpen(!open);
    }

    const navigate = (url: string) => {
        router.push(url);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }

    return (
        <Box sx={{ display: open === null ? 'none' : 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        TAS Logs and Definition
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawer}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {sideBarContent.map((item, index) => (
                        <ListItem key={index} disablePadding className="sideNav">
                            <ListItemButton
                                onClick={() => { navigate(item.path) }}
                                sx={{ justifyContent: open ? 'initial' : 'center' }}>
                                <ListItemIcon
                                    sx={{ mr: open ? 3 : 'auto' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding className={`sideNav !fixed !bottom-0 ${open ? '!w-60' : '!w-[65px]'}`}>
                        <ListItemButton sx={{ justifyContent: open ? 'initial' : 'center' }} onClick={handleLogout}>
                            <ListItemIcon sx={{ mr: open ? 3 : 'auto' }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={'Logout'}
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} className={open ? 'open' : 'close'}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}