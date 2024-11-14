import {
  DomainTask,
  GetTasksResponse, UpdateTaskModel
} from "./tasksApi.types"
import { Todolist } from "./todolistsApi.types"
import { instance } from "../../../common/instance/instance"
import { BaseResponse } from "../../../common/types/types"

export const tasksApi = {
  getTasks(tl: Todolist) {
    return instance.get<GetTasksResponse>(`todo-lists/${tl.id}/tasks`)
  },
  createTask(payload: { title: string, todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  // createTask(payload: { title: string; todolistId: string }) {
  //   const { title, todolistId } = payload
  //   return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  // },
  removeTask(payload: { taskId: string, todolistId: string }) {
    const { taskId, todolistId } = payload
    return instance
      .delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, {})
  },
  updateTask(payload: { taskId: string, todolistId: string, model: UpdateTaskModel }) {
    const { taskId, todolistId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }





  // changeTaskStatus(payload: { e:ChangeEvent<HTMLInputElement>, task:DomainTask,todoListId:string}) {
  //   const {e, task,todoListId}=payload
  //   let status = e.currentTarget.checked ? 2 : 0
  //   const model = {
  //     status,
  //     title: task.title,
  //     deadline: task.deadline,
  //     description: task.description,
  //     priority: task.priority,
  //     startDate: task.startDate
  //   }
  //   return instance.put<BaseResponse<{item: DomainTask}>>(`todo-lists/${todoListId}/tasks/${task.id}`, model,)
  // },
  //
  // changeTaskTitle(payload: { title: string, task:DomainTask, todoListId:string }) {
  //   const {title, task,todoListId}=payload
  //   const model: UpdateTaskModel = {
  //     status: task.status,
  //     title,
  //     deadline: task.deadline,
  //     description: task.description,
  //     priority: task.priority,
  //     startDate: task.startDate
  //   }
  //   return instance.put<BaseResponse<{item: DomainTask}>>(
  //     `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${task.id}`,
  //     model,
  //     )
  // }
}