import { v1 } from "uuid"
import { FilterValuesType} from "../ui/Todolists/Todolists"
import { Todolist } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"

const initialState: DomainTodolist[] = []



export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map(tl => ({ ...tl, filter: "all" }))
    }
    case "ADD-TODOLIST": {
      const { todolistId, title } = action.payload
      const newTodolist: DomainTodolist = {
        id: todolistId,
        title: title,
        filter: "all",
        order: 0,
        addedDate: ''
      }
      return [...state, newTodolist]
    }
    case "REMOVE-TODOLIST": {
      const { id } = action.payload
      return state.filter((tl) => tl.id !== id)
    }
    case "CHANGE-TODOLIST-TITLE": {
      const { todolistId, title } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl))
    }
    case "CHANGE-TODOLIST-FILTER": {
      const { todolistId, filter } = action.payload
      return state.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl))
    }
    default:
      return state
  }
}
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}
export const removeTodolistAC = (todolistId: string) => ({
  type: "REMOVE-TODOLIST",
  payload: { id: todolistId }
}) as const

export const addTodolistAC = (title: string) => ({
  type: "ADD-TODOLIST",
  payload: { title, todolistId: v1() }
}) as const

export const changeTodolistTitleAC = (payload: { todolistId: string; title: string }) => ({
  type: "CHANGE-TODOLIST-TITLE",
  payload
}) as const

export const changeTodolistFilterAC = (payload: { todolistId: string; filter: FilterValuesType }) => ({
  type: "CHANGE-TODOLIST-FILTER",
  payload
}) as const

export const fetchTodolistsThunk=(dispatch:Dispatch)=>{
  todolistsApi.getTodolists().then(res=>{
    dispatch(setTodolistsAC(res.data))
  })
}






export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>


export type ActionsType =
  | AddTodolistAT
  | RemoveTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT
  | SetTodolistsAT
