import React, { useEffect } from "react"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "common/components"
import { addTodolistTC } from "features/todolists/model/todolistsSlice"
import { Container } from "@mui/material"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Path } from "common/routing/Routing"
import { useNavigate } from "react-router"
import Todolists from "features/todolists/ui/Todolists/Todolists"
import { selectIsLoggedIn } from "features/auth/model/authSlice"

export const Main = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  return (
    <Container fixed>
      <Grid sx={{ mb: "30px" }} container spacing={2}>
        <Grid size={8} alignItems={"center"}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={4}>
          <Todolists />
        </Grid>
      </Grid>
    </Container>
  )
}
