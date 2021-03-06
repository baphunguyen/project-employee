import React from 'react';

import {List, Typography } from '@mui/material';
import {makeStyles} from "@mui/styles";

import NavItem from '../NavItem';
import NavCollapse from "../NavCollapse";
import {useSelector, useDispatch} from "react-redux";
import * as actionTypes from '@store/actions'

const useStyles = makeStyles((theme) => ({
    menuCaption: {
        ...theme.typography.menuCaption,
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption,
    },
}));

const NavGroup = (props) => {
    const { item } = props;
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();

    const items = item.children.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                // dispatch({
                //     type: actionTypes.MENU_OPEN,
                //     isOpen: menu.id
                // })
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <List
            subheader={
                <Typography variant="caption" className={classes.menuCaption} display="block" gutterBottom>
                    {item.title}
                    {item.caption && (
                        <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )}
                </Typography>
            }
        >
            {items}
        </List>
    );
};

export default NavGroup;
