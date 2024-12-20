import { UnknownAction } from "redux"
import {
  tasksSlice,
  todolistsReducer,
} from "features/todolists/model"
import { appReducer, appSlice } from "app/appSlice"
import { ThunkAction } from "redux-thunk"
import {
  authReducer,
  authSlice,
} from "features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "features/todolists/model/taskSlice"
import { todolistsSlice } from "features/todolists/model/todolistsSlice"

export const store = configureStore({
  reducer: {
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<
  void,
  RootState,
  unknown,
  UnknownAction
>

// @ts-ignore
window.store = store
