import { createTheme } from "@mui/material"

type ThemeMode = "light" | "dark"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#18a408",
      },
      secondary: {
        main: "#000998",
      },
      action: {
        active: "#cca126",
      },
    },
  })
}
