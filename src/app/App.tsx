import React from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useAppSelector} from "./hooks";
import {RootState} from "./store";
import {getTheme} from "./common/theme/theme";
import {Header} from "../Header";
import Main from "../Main";
import {ThemeMode} from "./app-reducer";


export const App = () => {

    // theme in app
    const themeMode = useAppSelector<RootState, ThemeMode>(state => state.app.themeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}