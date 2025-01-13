import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { todolistsApi } from "features/todolists/api/todolistsApi"
import { tasksApi } from "features/todolists/api/tasksApi"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setAppStatus: create.reducer<{
      status: RequestStatus
    }>((state, action) => {
      state.status = action.payload.status
    }),
    changeTheme: create.reducer<{
      themeMode: ThemeMode
    }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setIsLoggedIn: create.reducer<{
      isLoggedIn: boolean
    }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (todolistsApi.endpoints.getTodolists.matchPending(action) || tasksApi.endpoints.getTasks.matchPending(action)) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { setAppError, setAppStatus, changeTheme, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors

export const appReducer = appSlice.reducer
