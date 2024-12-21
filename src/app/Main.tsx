import React from "react"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "common/components"
import { Container } from "@mui/material"
import Todolists from "features/todolists/ui/Todolists/Todolists"
import { useCreateTodolistMutation } from "features/todolists/api/todolistsApi"
import { Path } from "common/routing/Routing"
import { Navigate } from "react-router"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "app/appSlice"

export const Main = () => {
  const [addTodolist] = useCreateTodolistMutation()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addTodolistCallback = (title: string) => {
    addTodolist(title)
  }

  // const addTodolist = (title: string) => {
  //   dispatch(addTodolistTC(title))
  // }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container fixed>
      <Grid sx={{ mb: "30px" }} container spacing={2}>
        <Grid size={8} alignItems={"center"}>
          <AddItemForm addItem={addTodolistCallback} />
        </Grid>
        <Grid container spacing={4}>
          <Todolists />
        </Grid>
      </Grid>
    </Container>
  )
}
