import React, { useEffect, useState } from "react"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { ErrorSnackbar } from "common/components"
import { Routing } from "common/routing/Routing"
import s from "./App.module.css"
import { selectThemeMode, setIsLoggedIn } from "app/appSlice"
import { useMeQuery } from "features/auth/api/authApi"
import { ResultCode } from "common/enums"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      {isInitialized && (
        <>
          <Header />
          <Routing />
        </>
      )}
      {!isInitialized && (
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
