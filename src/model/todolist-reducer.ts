import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


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
type AddTodolistAT = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string,
        id: string
    }
}
type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string,
    }
}
type ActionsType = AddTodolistAT | RemoveTodolistAT | ChangeTodolistAT | ChangeTodolistFilterAT

const todolistId1 = v1();
const todolistId2 = v1();

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all',},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]


export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
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
            return state.map(tl => (tl.id === action.payload.id) ? action.payload.title : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            throw new Error(`Unknown action type`);
    }

}