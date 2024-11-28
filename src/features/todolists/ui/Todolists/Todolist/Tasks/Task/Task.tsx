import React, { ChangeEvent } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks"
import { EditableSpan } from "common/components"
import { DomainTask, UpdateTaskDomainModel } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums"
import { DomainTodolist } from "../../../../../model/todolist-reducer"
import { removeTaskTC, updateTaskTC } from "../../../../../model/task-reducer"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
  disabled?: boolean
}

export const Task = ({ task, todolist, disabled }: Props) => {

  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ todolistId: todolist.id, taskId: task.id }))
  }

  const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const domainModel: UpdateTaskDomainModel = {
      status: status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate
    }
    dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel }))
  }

  const changeTaskTitleHandler = (title: string) => {
    const domainModel: UpdateTaskDomainModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate
    }
    dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel }))
  }

  return (
    <ListItem key={task.id} alignItems={"center"}
              sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed}
                  onChange={changeTaskHandler}
                  disabled={disabled}
        />
      </div>
      <EditableSpan onChange={changeTaskTitleHandler}
                    value={task.title}
                    disabled={disabled}
      />
      <IconButton aria-label="delete"
                  onClick={removeTaskHandler}
                  size={"small"}
                  disabled={disabled}
      >
        <Delete />
      </IconButton>
    </ListItem>
  )
}
