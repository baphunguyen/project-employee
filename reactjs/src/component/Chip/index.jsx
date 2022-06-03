import React from 'react';
import MuiChip from '@mui/material/Chip';

const Chip = (props) => {
    const { ...rest } = props;

    return <MuiChip {...rest} />;
};

export default Chip;
