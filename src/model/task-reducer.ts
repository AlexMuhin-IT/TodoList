import {useReducer} from "react";
import {FilterValuesType, TasksStateType, TaskType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskTitleAT | ChangeTaskStatusAT
type RemoveTaskAT = {
    type: 'REMOVE_TASK',
    payload: {
        todoId: string
        id: string
    }
}
type AddTaskAT = {
    type: 'ADD_TASK',
    payload: {
        todoId: string
        title: string
    }
}
type ChangeTaskTitleAT = {
    type: 'CHANGE_TASK_TITLE',
    payload: {
        todoId: string
        id: string
        title: string
    }
}
type ChangeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS',
    payload: {
        todoId: string
        id: string
        taskStatus: boolean
    }
}

const todolistId1 = v1();
const todolistId2 = v1();

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Figma", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Break", isDone: true},
        {id: v1(), title: "Meat", isDone: false},
        {id: v1(), title: "Chocolate", isDone: true},
        {id: v1(), title: "Apply", isDone: false},
    ]
}
export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType[] => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const {todoId, id} = action.payload
            return ([{...state, [todoId]: state[todoId].filter(t => t.id !== id)}]);
        }
        case 'ADD_TASK': {
            const {todoId, title} = action.payload
            // const newTask = {
            //     id: v1(),
            //     title: title,
            //     isDone: false,
            // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
            // }
            return ([{...state, [todoId]: [{id: v1(), title, isDone: false}, ...state[todoId]]}])
        }
        case 'CHANGE_TASK_TITLE': {
            const {todoId, id, title} = action.payload
            // {...tasks,[todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t),}
            return [{...state, [todoId]: state[todoId].map(t => t.id === id ? {...t, title} : t)}]
        }
        case 'CHANGE_TASK_STATUS': {
            const {todoId, id, taskStatus} = action.payload
            // ({...tasks,[todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)})
            return ([{...state, [todoId]: state[todoId].map(t => t.id == id ? {...t, isDone: taskStatus} : t)}])
        }
        default:
            return [state];
    }
}

const removeTaskAC = (todoId: string, id: string): RemoveTaskAT => {
    return {
        type: 'REMOVE_TASK',
        payload: {todoId, id}
    } as const
}
const addTaskAC = (todoId: string, title: string): AddTaskAT => {
    return {
        type: 'ADD_TASK',
        payload: {todoId, title}
    } as const
}
const changeTaskTitleAC = (todoId: string,id:string, title: string): ChangeTaskTitleAT => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {todoId,id, title}
    } as const
}
const changeTaskStatusAC = (todoId: string, id:string, taskStatus: boolean): ChangeTaskStatusAT => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {todoId, id, taskStatus}
    } as const
}