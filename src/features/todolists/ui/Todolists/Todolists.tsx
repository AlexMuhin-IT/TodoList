import React, { memo, useCallback } from "react"
import Grid from "@mui/material/Grid2"
import { Paper } from "@mui/material"
import { Todolist } from "./Todolist/Todolist"
import { addTaskAC} from "../../model/task-reducer"
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { selectTodolists } from "../../../../app/appSelectors"

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksStateType = {
  [key: string]: TaskType[]
}

const Todolists = memo(() => {

  console.log("todolists is called")
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)

  const addTask = useCallback(
    (todolistId: string, title: string) => {
      dispatch(addTaskAC({ title, todolistId }))
    },
    [dispatch],
  )
  return (
    <>
      {todolists.map((tl) => (
        <Grid key={tl.id}>
          <Paper sx={{ p: "10px" }}>
            <Todolist todolist={tl} addTask={addTask} />
          </Paper>
        </Grid>
      ))}
    </>
  )
})

export default Todolists
