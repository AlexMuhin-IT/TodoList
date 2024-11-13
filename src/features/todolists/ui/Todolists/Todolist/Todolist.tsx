import { TodolistType } from "../Todolists"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import s from "./TodolistTitle/TodolistTitle.module.css"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import React, { useCallback } from "react"

type TodolistPropsType = {
  todolist: TodolistType
  addTask: (todolistId: string, title: string) => void
}
export const Todolist = React.memo(({ todolist, addTask }: TodolistPropsType) => {
  console.log("todolist is called")
  const addTaskCallback = useCallback(
    (title: string) => {
      addTask(todolist.id, title)
    },
    [todolist.id],
  )

  return (
    <div className={s.wrapper}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
