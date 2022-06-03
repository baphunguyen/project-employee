import React from 'react';
import {Card, CardContent, Typography, Divider } from '@mui/material';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'transparent',
        boxShadow: 'none !important',
        border: 'none',
    },
    cardClass: {
        padding: theme.spacing(3),
    },
    cardContent: {
        paddingLeft: '0 !important',
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
    },
    divider: {
        marginBottom: `${theme.spacing(3)} !important`,
        marginTop: `${theme.spacing(2)} !important`,
    },
    spacer: {
        marginBottom: theme.spacing(3),
    },
    breadcrumbTitle: {
        fontWeight: '500 !important',
        marginTop: `${theme.spacing(1)} !important`,
    },
}));

const Breadcrumbs = (props) => {
    const classes = useStyles();
    const { color, outline, size, title, divider, isCard, ...rest } = props;
    let cardClass = classes.root;
    if (isCard) {
        cardClass = classes.cardClass;
    }

    return (
        <Card className={cardClass}>
            <CardContent className={classes.cardContent}>
                {title && (
                    <Typography className={classes.breadcrumbTitle} variant="h3">
                        {title}
                    </Typography>
                )}
                {divider === false && !isCard && <div className={classes.spacer} />}
                {divider !== false && <Divider className={classes.divider} />}
            </CardContent>
        </Card>
    );
};

export default Breadcrumbs;
