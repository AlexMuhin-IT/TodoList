import { createSlice } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"
export type RequestStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
  },

  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
  reducers: (create) => ({
    setAppError: create.reducer<{ error: string | null }>(
      (state, action) => {
        state.error = action.payload.error
      },
    ),
    setAppStatus: create.reducer<{ status: RequestStatus }>(
      (state, action) => {
        state.status = action.payload.status
      },
    ),
    changeTheme: create.reducer<{ themeMode: ThemeMode }>(
      (state, action) => {
        state.themeMode = action.payload.themeMode
      },
    ),
  }),
})
export const {
  selectThemeMode,
  selectStatus,
  selectError,
} = appSlice.selectors
export const { setAppError, setAppStatus, changeTheme } =
  appSlice.actions
export const appReducer = appSlice.reducer
