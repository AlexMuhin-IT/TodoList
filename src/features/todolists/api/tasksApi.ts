import { GetTasksResponse, UpdateTaskDomainModel } from "./tasksApi.types"
import { BaseResponse } from "common/types/types"
import { baseApi } from "app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string }>({
      query: ({ todolistId }) => ({ url: `todo-lists/${todolistId}/tasks` }),
      providesTags: ["Task"],
    }),
    createTask: build.mutation<BaseResponse, { title: string; todolistId: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation<BaseResponse, { taskId: string; todolistId: string }>({
      query: ({ taskId, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation<BaseResponse, { taskId: string; todolistId: string; model: UpdateTaskDomainModel }>({
      query: ({ taskId, todolistId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: { ...model },
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})
export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

// export const _tasksApi = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
//   },
//
//   createTask(payload: { title: string; todolistId: string }) {
//     const { title, todolistId } = payload
//     return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
//   },
//
//   removeTask(payload: { taskId: string; todolistId: string }) {
//     const { taskId, todolistId } = payload
//     return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, {})
//   },
//
//   updateTask(payload: { taskId: string; todolistId: string; model: UpdateTaskDomainModel }) {
//     const { taskId, todolistId, model } = payload
//     return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
//   },
// }
