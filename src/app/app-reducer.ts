export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "loading" as RequestStatus
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.payload }

    case "SET_STATUS":
      return { ...state, status: action.payload.status }

    default:
      return state
  }
}
export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: { status },
  } as const
}
export const changeThemeAC = (themeMode: ThemeMode) => {
  return {
    type: "CHANGE_THEME",
    payload: themeMode
  } as const
}

type ChangeThemeActionType =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof setAppStatusAC>

type ActionsType = ChangeThemeActionType
