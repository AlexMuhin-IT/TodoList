import React, { useEffect } from "react"
import { List } from "@mui/material"
import { useAppDispatch } from "common/hooks"
import { TaskStatus } from "common/enums"
import { DomainTodolist } from "features/todolists/model/todolistsSlice"
import { Task } from "features/todolists/ui/Todolists/Todolist/Tasks/Task/Task"
import { useGetTasksQuery } from "features/todolists/api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  // const tasks = useAppSelector(selectTasks)
  const { data } = useGetTasksQuery({ todolistId: todolist.id })
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchTasksTC(todolist.id))
  // }, [])

  let taskForTodolist = data?.items

  // const allTodolistTasks = tasks[todolist.id]

  // let taskForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    taskForTodolist = taskForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    taskForTodolist = taskForTodolist?.filter((task) => task.status === TaskStatus.Completed)
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
