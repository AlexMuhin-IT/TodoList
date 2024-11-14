import React from "react"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { TodolistType } from "../../Todolists"
import s from "./TodolistTitle.module.css"
import { useAppDispatch } from "common/hooks"
import { changeTodolistTitleAC, removeTodolistAC } from "../../../../model/todolist-reducer"
import { EditableSpan } from "common/components"
type Props = {
  todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTodolist = () => {
    dispatch(removeTodolistAC(todolist.id))
  }

  const updateTodolist = (title: string) => {
    dispatch(changeTodolistTitleAC({ todolistId: todolist.id, title }))
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={todolist.title} onChange={updateTodolist} />
      </h3>
      <IconButton aria-label="delete" onClick={removeTodolist} size={"medium"}>
        <Delete />
      </IconButton>
    </div>
  )
}
