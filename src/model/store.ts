import {combineReducers, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";
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
