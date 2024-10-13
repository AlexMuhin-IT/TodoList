// import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";
import {TasksStateType} from "../AppWithRedux";

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



// const todolistId1 = v1();
// const todolistId2 = v1();


const initialState: TasksStateType = {
    // [todolistId1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Figma", isDone: true},
    //     {id: v1(), title: "Redux", isDone: false},
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: "Milk", isDone: true},
    //     {id: v1(), title: "Break", isDone: true},
    //     {id: v1(), title: "Meat", isDone: false},
    //     {id: v1(), title: "Chocolate", isDone: true},
    //     {id: v1(), title: "Apply", isDone: false},
    // ]
}

export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.id];
            return copyState
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE_TASK': {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
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