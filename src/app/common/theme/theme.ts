import {createTheme} from "@mui/material";
import {ThemeMode} from "../../app-reducer";


export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#18a408',
            },
            secondary: {
                main: '#000998'
            },
            action: {
                active: '#cca126'
            },
        },
    })
}
