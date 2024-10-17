// import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";
import {TasksStateType} from "../app/App";

export type ActionType =
    RemoveTaskAT |
    AddTaskAT |
    ChangeTaskTitleAT |
    ChangeTaskStatusAT |
    AddTodolistAT |
    RemoveTodolistAT


export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>


const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload
            const copyState = {...state}
            delete copyState[id];
            return copyState
        }
        case 'ADD-TODOLIST': {
            const {todolistId} = action.payload
            return {...state, [todolistId]: []}
        }
        case 'REMOVE_TASK': {
            const {todolistId, taskId} = action.payload
            return ({
                ...state,
                [todolistId]: state[todolistId].filter(t => t.id !== taskId)
            })
        }
        case 'ADD_TASK': {
            const {todolistId, title} = action.payload
            return ({...state, [todolistId]: [{id: v1(), title, isDone: false}, ...state[todolistId]]})
        }
        case 'CHANGE_TASK_TITLE': {
            const {todolistId, taskId, title} = action.payload
            return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, title} : t)}
        }
        case 'CHANGE_TASK_STATUS': {
            const {todolistId, taskId, taskStatus} = action.payload
            return ({...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})
        }
        default:
            return state;
    }
}

export const removeTaskAC = (payload:{todolistId: string, taskId: string}) => {
    return {
        type: 'REMOVE_TASK',
        payload
    } as const
}
export const addTaskAC = (payload:{todolistId: string, title: string}) => {
    return {type: 'ADD_TASK', payload} as const
}
export const changeTaskTitleAC = (payload:{todolistId: string, taskId: string, title: string}) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload
    } as const
}
export const changeTaskStatusAC = (payload:{todolistId: string, taskId: string, taskStatus: boolean}) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload
    } as const
}