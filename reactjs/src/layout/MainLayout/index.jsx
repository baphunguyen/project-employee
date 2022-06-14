import React from 'react';
import clsx from 'clsx';
import {useMediaQuery, useTheme, AppBar, CssBaseline, Toolbar } from '@mui/material';
import {makeStyles} from "@mui/styles";

import { drawerWidth } from '@store/constant';
import Header from './Header';
import Sidebar from './Sidebar';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        width: '100%',
        minHeight: '100vh',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
        },
        background: theme.palette.background.default,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        background: theme.palette.background.default,
    },
    main: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        },
    },
    trans: {
        transitionDuration: '0.5s !important',
    },
    hidden: {
        visibility: 'hidden'
    },
    header: {
        zIndex: '1201 !important',
    },
}));

const MainLayout = ({ children }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    React.useEffect(() => {
        setDrawerOpen(matchUpMd);
    }, [matchUpMd]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.header}>
                <Toolbar>
                    <Header drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
                </Toolbar>
            </AppBar>
            <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
            <main className={clsx(classes.content, { [classes.contentShift]: drawerOpen })}>
                <div className={classes.toolbar} />
                    <div className={classes.main}>
                        {children}
                    </div>
            </main>
        </div>
    );
};

export default MainLayout;
