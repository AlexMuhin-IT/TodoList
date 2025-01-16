import AppBar from "@mui/material/AppBar"
import { IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { MenuButton } from "../MenuButton/MenuButton"
import React from "react"
import { getTheme } from "../../theme/theme"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Clock } from "../Clock/Clock"
import { changeTheme, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn } from "app/appSlice"
import { useLogoutMutation } from "features/auth/api/authApi"
import { ResultCode } from "common/enums"
import { baseApi } from "app/baseApi"
import zIndex from "@mui/material/styles/zIndex"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const changeModeHandler = () => {
    dispatch(
      changeTheme({
        themeMode: themeMode == "light" ? "dark" : "light",
      }),
    )
  }
  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(
            setIsLoggedIn({
              isLoggedIn: false,
            }),
          )
          localStorage.removeItem("sn-token")
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }
  return (
    <AppBar sx={{ mb: "30px", pt: "5px" }} position="static">
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
        //test merge
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"primary"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {/*<div>{status === "loading" && <LinearProgress color="error" />}</div>*/}
      <div>
        {status === "loading" && (
          <LinearProgress
            color="error"
            sx={{
              position: "absolute",
              top: 115,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          />
        )}
      </div>
    </AppBar>
  )
}
