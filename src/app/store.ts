import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../model/todolist-reducer";
import {taskReducer} from "../model/task-reducer";



const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: taskReducer,
})
export type AppRootState = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;
