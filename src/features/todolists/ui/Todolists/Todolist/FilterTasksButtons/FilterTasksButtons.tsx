import React from "react"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { Box, Button } from "@mui/material"
import { useAppDispatch } from "common/hooks"
import { changeTodolistFilter, DomainTodolist, FilterValuesType } from "features/todolists/model/todolistsSlice"
import { todolistsApi } from "features/todolists/api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const { filter, id } = todolist

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === id)
        if (index !== -1) {
          state[index].filter = filter
        }
      }),
    )
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        color="secondary"
        size={"small"}
        variant="contained"
        className={todolist.filter === "all" ? "active-filter" : ""}
        onClick={() => changeFilterTasksHandler("all")}
      >
        {" "}
        All
      </Button>
      <Button
        color="secondary"
        size={"small"}
        variant="contained"
        className={todolist.filter === "active" ? "active-filter" : ""}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        color="secondary"
        size={"small"}
        variant="contained"
        className={todolist.filter === "completed" ? "active-filter" : ""}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
