import { combineReducers, legacy_createStore } from "redux"
import { todolistsReducer } from "../features/todolists/model/todolist-reducer"
import { taskReducer } from "../features/todolists/model/task-reducer"
import { appReducer } from "./app-reducer"

const rootReducer = combineReducers({
  todolist: todolistsReducer,
  tasks: taskReducer,
  app: appReducer,
})
// export type AppRootState = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
