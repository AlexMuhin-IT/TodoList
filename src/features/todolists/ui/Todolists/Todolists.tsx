import React from "react"
import Grid from "@mui/material/Grid2"
import { Paper } from "@mui/material"
import { Todolist } from "features/todolists/ui/Todolists/Todolist/Todolist"
import { useGetTodolistsQuery } from "features/todolists/api/todolistsApi"
import { TodolistSkeleton } from "features/todolists/ui/skeletons/TodolistSkeleton/TodolistSkeleton"

const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

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
