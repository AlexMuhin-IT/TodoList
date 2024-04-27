import React from "react"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import s from "./TodolistTitle.module.css"
import { useAppDispatch } from "common/hooks"
import { EditableSpan } from "common/components"
import { todolistsApi, useDeleteTodolistMutation, useUpdateTodolistTitleMutation } from "features/todolists/api/todolistsApi"
import { RequestStatus } from "app/appSlice"
import { DomainTodolist } from "features/todolists/lib/types/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useDeleteTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const { title, id } = todolist
  const dispatch = useAppDispatch()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === id)
        if (index !== -1) {
          state[index].entityStatus = status
        }
      }),
    )
  }
  const removeTodolistHandler = () => {
    updateQueryData("loading")
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData("idle")
      })
  }
  // const removeTodolistCallback = () => {
  //   removeTodolist(id)
  // }
  //
  const updateTodolistCallback = (title: string) => {
    updateTodolistTitle({
      id: id,
      title,
    })
  }
  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistCallback} disabled={todolist.entityStatus === "loading"} />
      </h3>
      <IconButton aria-label="delete" onClick={removeTodolistHandler} size={"medium"} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </div>
  )
}
