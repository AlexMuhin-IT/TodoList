import {TodolistType} from "../App";
import {v1} from "uuid";


type ActionsType = {
    type: string,
    payload: any
}


const todolistId1 = v1();
const todolistId2 = v1();

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all',},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]


export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [
                ...state, {
                    id: v1(),
                    title: action.payload.title,
                    filter: 'all',
                },
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.payload.id) ? action.payload.title : tl)
        }
        // const newTodolists = todolists.map(tl => {(tl.id === todolistId ? { ...tl, filter } : tl)})
        // setTodolists(newTodolists)
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => (tl.id === action.payload.id) ? action.payload.filter : tl)
        }
        default:
            throw new Error(`Unknown action type`);
    }

}