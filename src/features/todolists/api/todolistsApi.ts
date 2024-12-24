// 1
import { BaseQueryMeta, BaseQueryResult, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { DomainTodolist } from "features/todolists/model/todolistsSlice"
import { Todolist } from "features/todolists/api/todolistsApi.types"
import { BaseResponse } from "common/types/types"
import { baseApi } from "app/baseApi"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => "todo-lists",
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        },
        providesTags: ["Todolist"],
      }),
      createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => ({ url: "todo-lists", method: "POST", body: { title } }),
        invalidatesTags: ["Todolist"],
      }),
      deleteTodolist: build.mutation<BaseResponse, string>({
        query: (id) => ({ url: `todo-lists/${id}`, method: "DELETE" }),
        invalidatesTags: ["Todolist"],
      }),
      updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
        query: ({ id, title }) => ({ url: `todo-lists/${id}`, method: "PUT", body: { title } }),
        invalidatesTags: ["Todolist"],
      }),
    }
  },
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useUpdateTodolistTitleMutation } = todolistsApi
