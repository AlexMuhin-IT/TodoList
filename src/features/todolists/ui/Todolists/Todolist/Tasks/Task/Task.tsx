import React, { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { TaskType } from "../../../Todolists"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks"
import { EditableSpan } from "common/components"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../../../../model/task-reducer"

type Props = {
  task: TaskType
  todolistId: string
}

export const Task = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()
  // console.log("Task is called")
  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ todolistId, taskId: task.id }))
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC({ todolistId, taskId: task.id, taskStatus: newStatusValue }))
  }
  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }))
  }

  return (
    <ListItem alignItems={"center"} disableGutters disablePadding sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
      </div>
      <EditableSpan onChange={changeTaskTitleHandler} value={task.title} />
      <IconButton aria-label="delete" onClick={removeTaskHandler} size={"small"}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}
