import AppBar from "@mui/material/AppBar"
import {
  IconButton,
  LinearProgress,
  Switch,
  Toolbar,
} from "@mui/material"
import { Menu } from "@mui/icons-material"
import { MenuButton } from "../MenuButton/MenuButton"
import React from "react"
import { getTheme } from "../../theme/theme"
import {
  useAppDispatch,
  useAppSelector,
} from "common/hooks"
import { Clock } from "../Clock/Clock"
import {
  logoutTC,
  selectIsLoggedIn,
} from "features/auth/model/authSlice"
import {
  changeTheme,
  selectStatus,
  selectThemeMode,
} from "app/appSlice"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    dispatch(
      changeTheme({
        themeMode: themeMode == "light" ? "dark" : "light",
      }),
    )
  }
  const logoutHandler = () => {
    dispatch(logoutTC())
  }
  return (
    <AppBar sx={{ mb: "30px" }} position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton color="inherit">
          <Menu />
          <Clock />
        </IconButton>
        <div>
          {/*<MenuButton>Login</MenuButton>*/}
          {isLoggedIn && (
            <MenuButton onClick={logoutHandler}>
              Logout
            </MenuButton>
          )}
          {/*<MenuButton onClick={logoutHandler}>Logout</MenuButton>*/}
          <MenuButton
            background={theme.palette.primary.dark}
          >
            Faq
          </MenuButton>
          <Switch
            color={"default"}
            onChange={changeModeHandler}
          />
        </div>
      </Toolbar>
      {status === "loading" && (
        <LinearProgress color="error" />
      )}
    </AppBar>
  )
}
