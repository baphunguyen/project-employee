import React from 'react';

import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './../themes';
import Routes from '../Routes';

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';


// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <React.Fragment>
            <CssBaseline />
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme(customization)}>
                    <Routes />
                </ThemeProvider>
            </StylesProvider>
        </React.Fragment>
    );
};

export default App;
