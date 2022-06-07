import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Avatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Chip from '@component/Chip';

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
        backgroundColor: 'transparent !important',
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

    let listItemProps = { component: Link, to: item.url };
    if (item.external) {
        listItemProps = { component: 'a', href: item.url };
    }

    const handleOnClick = () => {
        navigate(item.url);
    }

    return (
        <ListItemButton
            disabled={item.disabled}
            className={level > 1 ? classes.listItemNoBack : classes.listItem}
            selected={customization.isOpen === item.id}
            onClick={() => handleOnClick}
            target={itemTarget}
            button
            style={{ paddingLeft: level * 16 + 'px' }}
            {...listItemProps}
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
            {item.chip && (
                <Chip
                    className={item.chip.error && classes.errorChip}
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

export default NavItem;
