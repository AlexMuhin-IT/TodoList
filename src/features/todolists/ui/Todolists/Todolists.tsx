import React from "react"
import Grid from "@mui/material/Grid2"
import { Paper } from "@mui/material"
import { Todolist } from "features/todolists/ui/Todolists/Todolist/Todolist"
import { useGetTodolistsQuery } from "features/todolists/api/todolistsApi"

const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {todolists?.map((tl) => (
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
