import React, {useEffect } from "react"
import Grid from "@mui/material/Grid2"
import { Paper } from "@mui/material"
import { Todolist } from "./Todolist/Todolist"
import { addTaskAC, fetchTasksTC } from "../../model/task-reducer"
import { useAppDispatch } from "common/hooks"
import { useAppSelector } from "common/hooks"
import { selectTodolists } from "app/appSelectors"
import { todolistsApi } from "../../api/todolistsApi"
import { fetchTodolistsTC, setTodolistsAC } from "../../model/todolist-reducer"

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type DomainTask = {
  id: string
  title: string
  isDone: boolean
}


const Todolists = () => {

  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(fetchTodolistsTC())
  },[])
  

  return (
    <>
      {todolists.map((tl) => (
        <Grid key={tl.id}>
          <Paper sx={{ p: "10px" }}>
            <Todolist key={tl.id} todolist={tl}  />
          </Paper>
        </Grid>
      ))}
    </>
  )
}

export default Todolists
