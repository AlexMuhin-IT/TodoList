// import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../app/App";

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>

export type ActionsType = AddTodolistAT
    | RemoveTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT

// const todolistId1 = v1();
// const todolistId2 = v1();

const initialState: TodolistType[] = [
    // {id: todolistId1, title: 'What to learn', filter: 'all',},
    // {id: todolistId2, title: 'What to buy', filter: 'all'},
]


export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const {todolistId, title,} = action.payload
            return [{id: todolistId, title: title, filter: 'all'}, ...state]
        }
        case 'REMOVE-TODOLIST': {
            const {id} = action.payload
            return state.filter(tl => tl.id !== id)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const {todolistId, title} = action.payload
            return state.map(tl => (tl.id === todolistId) ? {...tl, title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const {todolistId, filter, } = action.payload
            return state.map(tl => tl.id === todolistId ? {...tl, filter} : tl)
        }
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST', payload: {id: todolistId}
} as const)

export const addTodolistAC = (title: string) => ({
    type: 'ADD-TODOLIST', payload: {title, todolistId: v1()}
} as const)

export const changeTodolistTitleAC = (payload: { todolistId: string, title: string }) => ({
    type: 'CHANGE-TODOLIST-TITLE', payload
} as const)

export const changeTodolistFilterAC = (payload: { todolistId: string, filter: FilterValuesType }) => ({
    type: 'CHANGE-TODOLIST-FILTER', payload
} as const)