import React from "react"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import s from "./TodolistTitle.module.css"
import { useAppDispatch } from "common/hooks"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "features/todolists/model/todolistsSlice"
import { EditableSpan } from "common/components"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const removeTodolist = () => {
    dispatch(removeTodolistTC(id))
  }

  const updateTodolist = (title: string) => {
    dispatch(updateTodolistTitleTC({ id: id, title }))
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolist} disabled={todolist.entityStatus === "loading"} />
      </h3>
      <IconButton
        aria-label="delete"
        onClick={removeTodolist}
        size={"medium"}
        disabled={todolist.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </div>
  )
}
