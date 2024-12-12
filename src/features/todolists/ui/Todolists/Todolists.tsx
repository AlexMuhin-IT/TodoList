import React, { useEffect } from "react"
import Grid from "@mui/material/Grid2"
import { Paper } from "@mui/material"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { fetchTodolistsTC, selectTodolists } from "features/todolists/model/todolistsSlice"
import { Todolist } from "features/todolists/ui/Todolists/Todolist/Todolist"

const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((tl) => (
        <Grid key={tl.id}>
          <Paper sx={{ p: "10px" }}>
            <Todolist key={tl.id} todolist={tl} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}

export default Todolists
