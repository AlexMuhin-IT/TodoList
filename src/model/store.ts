import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";


const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: taskReducer,
})
export type AppRootState = ReturnType<typeof rootReducer>;
// export const store = createStore(rootReducer);
export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;
