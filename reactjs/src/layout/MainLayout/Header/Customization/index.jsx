import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Button } from '@mui/material';
import {makeStyles} from "@mui/styles";

import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';

import * as actionTypes from '@store/actions';


const useStyles = makeStyles((theme) => ({
    menuButton: {
        [theme.breakpoints.down('sm')]: {
            minWidth: '50px',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '35px',
        },
    },
}));

const Customization = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch({
            type: actionTypes.NAV_TYPE,
            navType: customization.navType === 'light' ? 'dark' : 'light'
        });
    };

    return (
        <React.Fragment>
            <Tooltip title={customization.navType === 'light'? 'Dark Theme': 'Light Theme'}>
                <Button className={classes.menuButton} color="inherit" onClick={handleChange}>
                    {customization.navType === 'light' && <Brightness6OutlinedIcon className={classes.menuIcon}/>}
                    {customization.navType === 'dark' && <Brightness6Icon className={classes.menuIcon} />}
                </Button>
            </Tooltip>
        </React.Fragment>
    );
};

export default React.memo(Customization);
