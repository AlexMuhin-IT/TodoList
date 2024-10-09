import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>

export type ActionsType =
    AddTodolistAT |
    RemoveTodolistAT |
    ChangeTodolistTitleAT |
    ChangeTodolistFilterAT

const todolistId1 = v1();
const todolistId2 = v1();


const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all',},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]


export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.payload.todoId,
                title: action.payload.title,
                filter: 'all'
            }]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.payload.id) ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state
    }
}

export const addTodolistAC = (todoId: string, title: string) => ({
    type: 'ADD-TODOLIST',
    payload: {
        todoId,
        title
    }
} as const)
export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {id}
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {id, title}
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {id, filter}
} as const)