import React, { useCallback } from "react"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { Box, Button } from "@mui/material"
import { FilterValuesType, TodolistType } from "../../Todolists"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import { changeTodolistFilterAC } from "../../../../model/todolist-reducer"

type Props = {
  todolist: TodolistType
}

export const FilterTasksButtons = React.memo(({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  console.log("Filter Task Button is called")
  const changeFilter = useCallback(
    (filter: FilterValuesType) => {
      dispatch(changeTodolistFilterAC({ filter, todolistId: todolist.id }))
    },
    [dispatch],
  )

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        color="secondary"
        size={"small"}
        variant="contained"
        className={todolist.filter === "all" ? "active-filter" : ""}
        onClick={() => changeFilter("all")}
      >
        {" "}
        All
      </Button>
      <Button
        color="secondary"
        size={"small"}
        variant="contained"
        className={todolist.filter === "active" ? "active-filter" : ""}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        color="secondary"
        size={"small"}
        variant="contained"
        className={todolist.filter === "completed" ? "active-filter" : ""}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
})
