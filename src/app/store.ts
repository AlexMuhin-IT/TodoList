import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { todolistsReducer } from "../features/todolists/model/todolist-reducer"
import { taskReducer } from "../features/todolists/model"
import { appReducer } from "./app-reducer"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"

const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: taskReducer,
  app: appReducer,
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
