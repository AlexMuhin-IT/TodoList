import { AddTodolistAT, DomainTodolist, RemoveTodolistAT } from "./todolist-reducer"
import { Dispatch } from "redux"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel } from "../api/tasksApi.types"
import { AppThunk, RootState } from "app/store"
import { setAppStatusAC } from "app/app-reducer"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case "REMOVE-TODOLIST": {
      const { id } = action.payload
      const copyState = { ...state }
      delete copyState[id]
      return copyState
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
      return { [newTodolist.id]: [], ...state }
    }
    case "REMOVE_TASK": {
      const { todolistId, taskId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].filter((t) => t.id !== taskId)
      }
    }
    case "ADD_TASK": {
      const newTask: DomainTask = action.payload.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }
    case "UPDATE-TASK": {
      const { todolistId, taskId, domainModel } = action.payload
      return {
        ...state, [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, ...domainModel } : t))
      }
    }
    default:
      return state
  }
}

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return {
    type: "REMOVE_TASK",
    payload
  } as const
}
export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD_TASK", payload } as const
}
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload
  } as const
}
export const changeTaskAC = (payload: { todolistId: string; taskId: string; domainModel: UpdateTaskDomainModel }) => {
  return {
    type: "UPDATE-TASK",
    payload
  } as const
}


export type ActionType =
  | RemoveTaskAT
  | AddTaskAT
  | AddTodolistAT
  | RemoveTodolistAT
  | SetTasksAT
  | ChangeTaskAT

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>
export type ChangeTaskAT = ReturnType<typeof changeTaskAC>


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  tasksApi.getTasks(todolistId).then(res => {
    dispatch(setAppStatusAC('loading'))
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
    dispatch(setAppStatusAC('idle'))
  })
}
export const addTaskTC = (payload: { title: string, todolistId: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi.createTask(payload)
      .then((res) => {
        dispatch(addTaskAC({ task: res.data.data.item }))
        dispatch(setAppStatusAC("idle"))
      })
  }
export const removeTaskTC = (payload: { todolistId: string, taskId: string }) =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.removeTask(payload).then((res) => {
      dispatch(removeTaskAC(payload))
      dispatch(setAppStatusAC('idle'))
    })
  }

export const updateTaskTC = (payload: { taskId: string, todolistId: string, domainModel: UpdateTaskDomainModel }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { taskId, todolistId, domainModel } = payload
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)
    dispatch(setAppStatusAC('loading'))
    tasksApi.updateTask({ taskId, todolistId, domainModel })
      .then(res => {
        dispatch(changeTaskAC({ taskId, todolistId, domainModel: res.data.data.item }))
        dispatch(setAppStatusAC('idle'))
      })
  }