import { FilterValuesType } from "../ui/Todolists/Todolists"
import { Todolist } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"
import { setAppStatusAC } from "app/app-reducer"


export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }
    case "ADD-TODOLIST": {
      const { title, id } = action.payload.todolist
      const newTodolist: DomainTodolist = {
        id: id,
        title: title,
        filter: "all",
        order: 0,
        addedDate: ""
      }
      return [newTodolist, ...state]
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
export const removeTodolistAC = (todolistId: string) => ({
  type: "REMOVE-TODOLIST",
  payload: { id: todolistId }
}) as const

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const changeTodolistTitleAC = (payload: { todolistId: string; title: string }) => ({
  type: "CHANGE-TODOLIST-TITLE",
  payload
}) as const
export const changeTodolistFilterAC = (payload: { todolistId: string; filter: FilterValuesType }) => ({
  type: "CHANGE-TODOLIST-FILTER",
  payload
}) as const
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
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

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi.getTodolists().then(res => {
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC('idle'))
  })
}
export const addTodolistTC = (title: string ) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi.createTodolist(title).then(res => {
    dispatch(addTodolistAC(res.data.data.item))
    dispatch(setAppStatusAC('idle'))
  })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi.deleteTodolist(todolistId).then(res => {
    dispatch(removeTodolistAC(todolistId))
    dispatch(setAppStatusAC('idle'))
  })
}
export const updateTodolistTitleTC = (payload:{todolistId:string, title: string } ) => (dispatch: Dispatch) => {
  const { todolistId, title } = payload
  todolistsApi.updateTodolist({title,todolistId}).then(res => {
    dispatch(changeTodolistTitleAC({todolistId, title }))
  })
}

