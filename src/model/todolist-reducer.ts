import {useState} from "react";
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


export const todolistReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state
        }
        case 'ADD-TODOLIST': {
            return state
        }
        default:
            throw new Error(`Unknown action type`);
    }
}