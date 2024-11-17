import React, { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks"
import { EditableSpan } from "common/components"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums"
import { DomainTodolist } from "../../../../../model/todolist-reducer"
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskTC,
  updateTaskStatusTC
} from "../../../../../model/task-reducer"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {

  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ todolistId: todolist.id, taskId: task.id }))
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    // const newStatusValue = e.currentTarget.checked
    dispatch(updateTaskStatusTC({ todolistId: todolist.id, taskId: task.id, status }))
  }
  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId: todolist.id, taskId: task.id, title }))
  }

  return (
    <ListItem key={task.id} alignItems={"center"} disableGutters disablePadding
              sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
      </div>
      <EditableSpan onChange={changeTaskTitleHandler} value={task.title} />
      <IconButton aria-label="delete" onClick={removeTaskHandler} size={"small"}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}
