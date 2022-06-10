import React from 'react';
import {Typography, ListItemButton, ListItemIcon, ListItemText, Collapse, List, Chip, Avatar } from '@mui/material';
import {makeStyles} from "@mui/styles";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useSelector, useDispatch} from "react-redux";
import * as actionTypes from '@store/actions'

import NavItem from './../NavItem';

const useStyles = makeStyles((theme) => ({
    collapseIcon: {
        fontSize: '1rem',
    },
    listIcon: {
        minWidth: '25px',
    },
    listItem: {
        borderRadius: '5px',
        marginBottom: '5px',
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
        marginRight: '5px',
    },
}));

const NavCollapse = (props) => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const { menu, level } = props;
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
        dispatch({
          type: actionTypes.MENU_OPEN,
          isOpen: menu.id
        })
    };

    const menus = menu.children.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                  <Typography key={item.id} variant="h6" color="error" align="center">
                      Menu Items Error
                  </Typography>
                );
        }
    });

    const Icon = menu.icon;
    const menuIcon = menu.icon ? (
      <Icon />
    ) : (
      <ArrowForwardIcon fontSize={level > 0 ? 'inherit' : 'default'} />
    );
    let menuIconClass = !menu.icon ? classes.listIcon : '';
    return (
      <React.Fragment>
          <ListItemButton
            className={level > 1 ? classes.listItemNoBack : classes.listItem}
            selected={customization.isOpen === menu.id}
            onClick={handleClick}
            style={{ paddingLeft: level * 16 + 'px' }}
          >
              <ListItemIcon className={menuIconClass}>{menuIcon}</ListItemIcon>
              <ListItemText
                primary={
                    <Typography
                      variant={customization.isOpen === menu.id ? 'subtitle1' : 'body1'}
                      color="inherit"
                    >
                        {menu.title}
                    </Typography>
                }
                secondary={
                  menu.caption && (
                    <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                        {menu.caption}
                    </Typography>
                  )
                }
              />
              {open ? <ExpandLess className={classes.collapseIcon} /> : <ExpandMore className={classes.collapseIcon} />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                  {menus}
              </List>
          </Collapse>
      </React.Fragment>
    );
};

export default NavCollapse;