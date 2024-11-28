import { Todolist } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppStatusAC } from "app/app-reducer"

export type FilterValuesType = "all" | "active" | "completed"
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET_TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }
    case "ADD_TODOLIST": {
      const { title, id } = action.payload.todolist
      const newTodolist: DomainTodolist = {
        id: id,
        title: title,
        filter: "all",
        order: 0,
        addedDate: "",
        entityStatus: "idle"
      }
      return [newTodolist, ...state]
    }
    case "REMOVE_TODOLIST": {
      const { id } = action.payload
      return state.filter((tl) => tl.id !== id)
    }
    case "CHANGE_TODOLIST_TITLE": {
      const { id, title } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl))
    }
    case "CHANGE_TODOLIST_FILTER": {
      const { id, filter } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, filter } : tl))
    }
    case "CHANGE_TODOLIST_ENTITY_STATUS": {
      const { id, entityStatus } = action.payload
      return state.map(tl => tl.id === id
        ? { ...tl, entityStatus }
        : tl)
    }
    default:
      return state
  }
}
export const removeTodolistAC = (todolistId: string) => ({
  type: "REMOVE_TODOLIST",
  payload: { id: todolistId }
}) as const

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD_TODOLIST", payload: { todolist } } as const
}
export const changeTodolistTitleAC = (payload: { id: string; title: string }) => ({
  type: "CHANGE_TODOLIST_TITLE",
  payload
}) as const
export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => ({
  type: "CHANGE_TODOLIST_FILTER",
  payload
}) as const
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET_TODOLISTS", todolists } as const
}
export const changeTodolistEntityStatusAC = (
  payload: { id: string, entityStatus: RequestStatus }) => {
  return { type: "CHANGE_TODOLIST_ENTITY_STATUS", payload } as const
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>


export type ActionsType =
  | AddTodolistAT
  | RemoveTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT
  | SetTodolistsAT
  | ChangeTodolistEntityStatusAT

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi.getTodolists().then(res => {
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC("idle"))
  })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi.createTodolist(title).then(res => {
    dispatch(addTodolistAC(res.data.data.item))
    dispatch(setAppStatusAC("idle"))
  })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
  todolistsApi.deleteTodolist(id).then(res => {
    dispatch(removeTodolistAC(id))
    dispatch(setAppStatusAC("idle"))
  })
}
export const updateTodolistTitleTC = (payload: { id: string, title: string }) => (dispatch: Dispatch) => {
  const { id, title } = payload
  dispatch(setAppStatusAC("loading"))
    todolistsApi.updateTodolist({ title, id }).then(res => {
    dispatch(changeTodolistTitleAC({ id, title }))
      dispatch(setAppStatusAC("idle"))
  })
}

