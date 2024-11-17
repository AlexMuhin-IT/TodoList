import {  DomainTask,  GetTasksResponse, UpdateTaskDomainModel} from "./tasksApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { taskId: string, todolistId: string }) {
    const { taskId, todolistId } = payload
    return instance
      .delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, {})
  },
  updateTask(payload: { taskId: string, todolistId: string, domainModel: UpdateTaskDomainModel }) {
    const { taskId, todolistId, domainModel } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, domainModel)
  }
}