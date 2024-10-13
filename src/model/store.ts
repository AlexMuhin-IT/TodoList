import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: taskReducer,
})
export type AppRootState = ReturnType<typeof rootReducer>;
export const store = configureStore({
// export const store = createStore(rootReducer);
    reducer: rootReducer,
});


// @ts-ignore
window.store = store;
