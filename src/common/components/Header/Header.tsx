import AppBar from "@mui/material/AppBar"
import { IconButton, Switch, Toolbar } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { MenuButton } from "../MenuButton/MenuButton"
import React from "react"
import { getTheme } from "../../theme/theme"
import { changeThemeAC } from "../../../app/app-reducer"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { selectThemeMode } from "../../../app/appSelectors"
import { Clock } from "../Clock/Clock"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode == "light" ? "dark" : "light"))
  }
  return (
    <AppBar sx={{ mb: "30px" }} position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <Menu />
          <Clock />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
    </AppBar>
  )
}
