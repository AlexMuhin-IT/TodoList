import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type AddTodolistAT = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string,
    }
}
type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string,
    }
}
type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id: string,
        filter: FilterValuesType,
    }
}
type ChangeTodolistAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id: string,
        title: string,
    }
}

export type ActionsType = AddTodolistAT |
    RemoveTodolistAT |
    ChangeTodolistAT |
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
                id: v1(),
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

export const AddTodolistAC = (title: string): AddTodolistAT => ({
    type: 'ADD-TODOLIST',
    payload: {title}
} as const)

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({
    type: 'REMOVE-TODOLIST',
    payload: {id}
} as const)
export const ChangeTodolistAC = (id: string, title: string): ChangeTodolistAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {id, title}
} as const)
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {id, filter}
} as const)