import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Avatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as actionTypes from '@store/actions'


const useStyles = makeStyles((theme) => ({
    listIcon: {
        minWidth: '25px',
    },
    listItem: {
        borderRadius: '5px !important',
        marginBottom: '5px !important',
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption,
    },
    listItemNoBack: {
        paddingTop: '8px',
        paddingBottom: '8px',
        borderRadius: '5px',
    },
    errorChip: {
        color: theme.palette.error.main,
        backgroundColor: '#ffcdd2',
        marginRight: '20px',
    },
    listItemTypography: {
        ...theme.typography.cardTitle
    }
}));

const NavItem = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const { item, level } = props;

    const Icon = item.icon;
    const itemIcon = item.icon ? (
        <Icon color={customization.navType === 'light'? 'inherit' : 'primary'} />
    ) : (
        <ArrowForwardIcon color="inherit" fontSize={level > 0 ? 'inherit' : 'default'} />
    );

    let itemIconClass = !item.icon ? classes.listIcon : '';

    let itemTarget = '';
    if (item.target) {
        itemTarget = '_blank';
    }

    const handleClick = () => {
        dispatch({
            type: actionTypes.MENU_OPEN,
            isOpen: item.id
        })
        navigate(item.url);
    }

    return (
        <ListItemButton
            disabled={item.disabled}
            className={level > 1 ? classes.listItemNoBack : classes.listItem}
            selected={customization.isOpen === item.id}
            target={itemTarget}
            onClick={handleClick}
            button
            style={{ paddingLeft: level * 16 + 'px' }}
        >
            <ListItemIcon className={itemIconClass}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography
                        variant={customization.isOpen === item.id ? 'subtitle1' : 'body1'}
                        color="inherit"
                        className={classes.listItemTypography}
                    >
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
        </ListItemButton>
    );
};

export default NavItem;
