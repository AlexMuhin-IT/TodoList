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
            // const todolistId = v1()
            // const newTodolist: TodolistType = {
            //     id: todolistId,
            //     title: title,
            //     filter: 'all'
            // }
            // setTodolists([newTodolist, ...todolists])
            // setTasks({...tasks, [todolistId]: []})
            return [
                ...state, {
                    id: v1(),
                    title: action.payload.title,
                    filter: 'all',
                },
            ]
        }
        default:
            throw new Error(`Unknown action type`);
    }
// export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST': {
//             return state.filter(tl => tl.id !== action.payload.id)
//         }
//         default:
//             throw new Error(`Unknown action type`);
//     }
}