import React from 'react';

import {Fade, Button, ClickAwayListener, Paper, Popper, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import {makeStyles} from "@mui/styles";
import { useNavigate } from 'react-router-dom';

import LockOpenTwoTone from '@mui/icons-material/LockOpenTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '250px',
        backgroundColor: theme.palette.background.paper,
        paddingBottom: 0,
        borderRadius: '10px',
    },
    subHeader: {
        backgroundColor: theme.palette.grey.A400,
        color: theme.palette.common.white,
        padding: '5px 15px',
    },
    menuIcon: {
        fontSize: '1.5rem',
    },
    menuButton: {
        [theme.breakpoints.down('sm')]: {
            minWidth: '50px',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '35px',
        },
    },
    textHello: {
        margin: '10px !important',
    }
}));

const ProfileSection = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleListItemClick = (event, index) => {
        if (index === 1) {
            navigate('/changepassword');
        }
        if (index === 2) {
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <Button
                className={classes.menuButton}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <AccountCircleTwoToneIcon className={classes.menuIcon} />
            </Button>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: {
                        offset: {
                            enable: true,
                            offset: '0px, 10px',
                        },
                        preventOverflow: {
                            padding: 0,
                        },
                    },
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List component="nav" className={classes.root}>
                                    <ListItemText secondary={'Hello: ' + user.data.fullname} className={classes.textHello}/>
                                    <ListItemButton button onClick={(event) => handleListItemClick(event, 1)}>
                                        <ListItemIcon>
                                            <LockOpenTwoTone />
                                        </ListItemIcon>
                                        <ListItemText primary="Change Password" />
                                    </ListItemButton>
                                    <ListItemButton button onClick={(event) => handleListItemClick(event, 2)}>
                                        <ListItemIcon>
                                            <MeetingRoomTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default ProfileSection;
