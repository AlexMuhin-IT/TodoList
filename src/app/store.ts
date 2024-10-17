import {combineReducers, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "../model/todolist-reducer";
import {taskReducer} from "../model/task-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: taskReducer,
})
export type AppRootState = ReturnType<typeof rootReducer>;
// export const store = configureStore({
//     reducer: rootReducer,
// });
export const store = legacy_createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store;
