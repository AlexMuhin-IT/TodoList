import { v1 } from "uuid"
import { AddTodolistAT, RemoveTodolistAT } from "./todolist-reducer"
// import { TasksStateType } from "../ui/Todolists/Todolists"
import { Dispatch } from "redux"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
// import { TaskPriority, TaskStatus } from "common/enums"
import { AppThunk, RootState } from "app/store"
import { TaskStatus } from "common/enums"

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
      const { todolistId } = action.payload
      return { ...state, [todolistId]: [] }
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
    case "CHANGE_TASK_TITLE": {
      const { todolistId, taskId, title } = action.payload
      return { ...state, [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, title } : t)) }
    }
    case "CHANGE_TASK_STATUS": {
      const { todolistId, taskId, status } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, status: status } : t))
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
export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
  return {
    type: "CHANGE_TASK_TITLE",
    payload
  } as const
}
export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; status: TaskStatus }) => {
  return {
    type: "CHANGE_TASK_STATUS",
    payload
  } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload
  } as const
}


export type ActionType =
  | RemoveTaskAT
  | AddTaskAT
  | ChangeTaskTitleAT
  | ChangeTaskStatusAT
  | AddTodolistAT
  | RemoveTodolistAT
  | SetTasksAT

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  tasksApi.getTasks(todolistId).then(res => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}
export const addTaskTC =
  (payload: { title: string, todolistId: string }): AppThunk =>
    (dispatch) => {
      tasksApi.createTask(payload).then((res) => {
        dispatch(addTaskAC({ task: res.data.data.item }))
      })
    }
export const removeTaskTC =
  (payload: { todolistId: string, taskId: string }) => (dispatch: Dispatch) => {
    tasksApi.removeTask(payload).then((res) => {
      dispatch(removeTaskAC(payload))
    })
  }
export const updateTaskStatusTC = (payload: { taskId: string, status: TaskStatus, todolistId: string }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { taskId, todolistId, status } = payload
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate
      }
      tasksApi.updateTask({taskId,todolistId,model}).then(res=>{
        dispatch(changeTaskStatusAC(payload))
      })
    }
  }