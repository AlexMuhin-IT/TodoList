import React, { useEffect } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components/Header/Header"
import { Main } from "./Main"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectThemeMode } from "./appSelectors"
import { fetchTodolistsTC } from "../features/todolists/model/todolist-reducer"
import { ErrorSnackbar } from "common/components"

export const App = () => {

  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
      <ErrorSnackbar/>
    </ThemeProvider>
  )
}
