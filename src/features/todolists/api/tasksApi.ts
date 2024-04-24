import { DomainTask, GetTasksResponse } from "./tasksApi.types"
import { BaseResponse } from "common/types/types"
import { baseApi } from "app/baseApi"

export const PAGE_SIZE = 5

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<
      GetTasksResponse,
      {
        todolistId: string
        args: { page: number }
      }
    >({
      query: ({ todolistId, args }) => {
        const params = {
          ...args,
          count: PAGE_SIZE,
        }
        return {
          method: "GET",
          url: `todo-lists/${todolistId}/tasks`,
          params,
        }
      },
      // providesTags: (res, err, { todolistId }) => [{ type: "Task", id: todolistId }],
      providesTags: (res, err, { todolistId }) =>
        res
          ? [
              ...res.items.map(
                ({ id }) =>
                  ({
                    type: "Task",
                    id,
                  }) as const,
              ),
              {
                type: "Task",
                id: todolistId,
              },
            ]
          : ["Task"],
    }),

    createTask: build.mutation<
      BaseResponse,
      {
        title: string
        todolistId: string
      }
    >({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      // invalidatesTags: ["Task"],
      invalidatesTags: (res, err, { todolistId }) => [
        {
          type: "Task",
          id: todolistId,
        },
      ],
    }),
    deleteTask: build.mutation<
      BaseResponse,
      {
        taskId: string
        todolistId: string
      }
    >({
      query: ({ taskId, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Task"],
      invalidatesTags: (res, err, { todolistId }) => [
        {
          type: "Task",
          id: todolistId,
        },
      ],
    }),

    updateTask: build.mutation<
      BaseResponse,
      {
        taskId: string
        todolistId: string
        model: DomainTask
      }
    >({
      query: ({ taskId, todolistId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: { ...model },
      }),
      invalidatesTags: (res, err, { todolistId }) => [
        {
          type: "Task",
          id: todolistId,
        },
      ],
    }),
  }),
})
export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
