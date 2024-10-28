import React from 'react';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode} from "./appSelectors";
import JsEvgen from "../common/components/JsEvgen";



export const App = () => {
    console.log('app is called')
    const themeMode = useAppSelector(selectThemeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
            <JsEvgen/>
        </ThemeProvider>
    );
}