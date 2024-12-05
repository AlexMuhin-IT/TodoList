import React, { useEffect } from "react"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectThemeMode } from "./appSelectors"
import { ErrorSnackbar } from "common/components"
import { Routing } from "common/routing/Routing"
import { initializeAppTC } from "features/auth/model/auth-reducer"
import { selectIsInitialized } from "app/authSelector"
import s from "./App.module.css"

export const App = () => {

  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing/>
      <ErrorSnackbar/>
    </ThemeProvider>
  )
}
