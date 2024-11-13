import React from "react"
import { List } from "@mui/material"
import { TaskType, TodolistType } from "../../Todolists"
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector"
import { selectTasks } from "../../../../../../app/appSelectors"
import { Task } from "./Task/Task"

type Props = {
  todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  // console.log("Tasks is called")
  const allTodolistTasks = tasks[todolist.id]

  let taskForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    taskForTodolist = allTodolistTasks.filter((task) => !task.isDone)
  }

  if (todolist.filter === "completed") {
    taskForTodolist = allTodolistTasks.filter((task) => task.isDone)
  }
  return (
    <>
      {taskForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {taskForTodolist.map((task: TaskType) => (
            <Task key={task.id} task={task} todolistId={todolist.id} />
          ))}
        </List>
      )}
    </>
  )
}
