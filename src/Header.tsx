import AppBar from "@mui/material/AppBar";
import {IconButton, Switch, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {MenuButton} from "./components/MenuButton";
import React from "react";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {RootState} from "./app/store";
import {getTheme} from "./app/common/theme/theme";
import {changeThemeAC, ThemeMode} from "./app/app-reducer";


export const Header = () => {

    const themeMode = useAppSelector<RootState, ThemeMode>(state=>state.app.themeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch();
    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode == 'light' ? 'dark' : 'light'))
    }
    return (
        <AppBar sx={{mb: '30px'}} position="static">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <Menu/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>

    )
}
