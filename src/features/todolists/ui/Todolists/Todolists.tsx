import React, {useEffect } from "react"
import Grid from "@mui/material/Grid2"
import { Paper } from "@mui/material"
import { Todolist } from "./Todolist/Todolist"
import { addTaskAC} from "../../model/task-reducer"
import { useAppDispatch } from "common/hooks"
import { useAppSelector } from "common/hooks"
import { selectTodolists } from "app/appSelectors"
import { todolistsApi } from "../../api/todolistsApi"
import { setTodolistsAC } from "../../model/todolist-reducer"

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

const Todolists = () => {
  const dispatch = useAppDispatch()

  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    todolistsApi.getTodolists().then(res=>{
      const todolists = res.data
      dispatch(setTodolistsAC(res.data))
    })
  })

  const addTask = (todolistId: string, title: string) => {
      dispatch(addTaskAC({ title, todolistId }))}

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
}

export default Todolists
