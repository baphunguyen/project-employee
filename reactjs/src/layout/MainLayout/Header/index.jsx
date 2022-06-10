import React from 'react';
import { Box, Grid, IconButton, Hidden } from '@mui/material';
import {makeStyles} from "@mui/styles";

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

import Customization from './Customization';
import ProfileSection from './ProfileSection';

import logo from '@assets/images/logo.svg';
import { drawerWidth } from '@store/constant';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: `${theme.spacing(1.25)} !important`,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menuIcon: {
        fontSize: '1.5rem !important',
    },
}));

const Header = (props) => {
    const { drawerToggle } = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box width={drawerWidth}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Hidden smDown>
                        <Grid item>
                            <Box mt={0.5}>
                                <img src={logo} alt="Logo" />
                            </Box>
                        </Grid>
                    </Hidden>
                    <Grid item>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={drawerToggle}
                        >
                            <MenuTwoToneIcon className={classes.menuIcon} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <div className={classes.grow} />

            <Customization />
            <ProfileSection />
        </React.Fragment>
    );
};

export default React.memo(Header);
