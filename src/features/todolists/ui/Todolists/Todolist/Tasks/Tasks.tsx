import React from "react"
import { List } from "@mui/material"
import { TaskStatus } from "common/enums"
import { DomainTodolist } from "features/todolists/model/todolistsSlice"
import { Task } from "features/todolists/ui/Todolists/Todolist/Tasks/Task/Task"
import { useGetTasksQuery } from "features/todolists/api/tasksApi"
import { TasksSkeleton } from "features/todolists/ui/skeletons/TasksSkeleton/TasksSkeleton"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { data, isLoading } = useGetTasksQuery({ todolistId: todolist.id })

  let taskForTodolist = data?.items
  if (todolist.filter === "active") {
    taskForTodolist = taskForTodolist?.filter((task) => task.status === TaskStatus.New)
  }
  if (todolist.filter === "completed") {
    taskForTodolist = taskForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }
  if (isLoading) {
    return <TasksSkeleton />
  }
  return (
    <>
      {taskForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {taskForTodolist?.map((task) => (
            <Task key={task.id} task={task} todolist={todolist} disabled={todolist.entityStatus === "loading"} />
          ))}
        </List>
      )}
    </>
  )
}
