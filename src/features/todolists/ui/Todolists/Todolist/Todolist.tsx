import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import s from "./TodolistTitle/TodolistTitle.module.css"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { AddItemForm } from "common/components"
import React from "react"
import { DomainTodolist } from "../../../model/todolist-reducer"
import { useAppDispatch } from "common/hooks"
import { addTaskTC } from "../../../model/task-reducer"

export type TodolistPropsType = {
  todolist: DomainTodolist
}
export const Todolist = ({ todolist }: TodolistPropsType) => {
  const dispatch = useAppDispatch()

  const addTaskCallback = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }))
  }


  return (
    <div className={s.wrapper}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback}
                   disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
