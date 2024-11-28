import { RootState } from "./store"


export const selectTodolists = (state: RootState) => state.todolist
export const selectTasks = (state: RootState) => state.tasks


export const selectThemeMode = (state: RootState) => state.app.themeMode
export const selectStatus = (state: RootState) => state.app.status
export const selectError = (state: RootState) => state.app.error

