import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import s from "./TodolistTitle/TodolistTitle.module.css"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { AddItemForm } from "common/components"
import React from "react"
import { useCreateTaskMutation } from "features/todolists/api/tasksApi"
import { DomainTodolist } from "features/todolists/lib/types/types"

export type TodolistPropsType = {
  todolist: DomainTodolist
}
export const Todolist = ({
  todolist,
}: TodolistPropsType) => {
  const [addTask] =
    useCreateTaskMutation()

  const addTaskCallback = (
    title: string,
  ) => {
    addTask({
      todolistId: todolist.id,
      title,
    })
  }

  return (
    <div className={s.wrapper}>
      <TodolistTitle
        todolist={todolist}
      />
      <AddItemForm
        addItem={addTaskCallback}
        disabled={
          todolist.entityStatus ===
          "loading"
        }
      />
      <Tasks todolist={todolist} />
      <FilterTasksButtons
        todolist={todolist}
      />
    </div>
  )
}
