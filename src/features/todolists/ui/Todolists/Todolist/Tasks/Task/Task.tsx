import React, { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { getListItemSx } from "./Task.styles"
import { EditableSpan } from "common/components"
import { TaskStatus } from "common/enums"
import { DomainTask } from "features/todolists/api/tasksApi.types"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "features/todolists/api/tasksApi"
import { DomainTodolist } from "features/todolists/lib/types/types"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
  disabled?: boolean
}

export const Task = ({ task, todolist }: Props) => {
  const [removeTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const disabled = todolist.entityStatus === "loading"

  const removeTaskHandler = () => {
    removeTask({ todolistId: todolist.id, taskId: task.id })
  }
  const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTask({ todolistId: todolist.id, taskId: task.id, model: { ...task, status } })
  }
  const changeTaskTitleHandler = (title: string) => {
    updateTask({ todolistId: todolist.id, taskId: task.id, model: { ...task, title } })
  }

  return (
    <ListItem key={task.id} alignItems={"center"} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskHandler} disabled={disabled} />
      </div>
      <EditableSpan onChange={changeTaskTitleHandler} value={task.title} disabled={disabled} />
      <IconButton aria-label="delete" onClick={removeTaskHandler} size={"small"} disabled={disabled}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}
