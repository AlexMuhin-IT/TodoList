import React, { useState } from "react"
import { useAppDispatch } from "common/hooks"
import { todolistsApi } from "features/todolists/api/todolistsApi"
import { DomainTodolist, FilterValues } from "features/todolists/lib/types/types"
import Stack from "@mui/material/Stack"
import { BootstrapButton } from "features/todolists/ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons.styles"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const { id } = todolist
  const [selectedFilter, setSelectedFilter] = useState<FilterValues>("all")

  const changeFilterTasksHandler = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === id)
        if (index !== -1) {
          state[index].filter = filter
        }
      }),
    )
    setSelectedFilter(filter) // Обновляем выбранный фильтр
  }

  return (
    <Stack spacing={3} direction="row">
      <BootstrapButton
        size={"small"}
        variant="contained"
        disableRipple
        isActive={selectedFilter === "all"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </BootstrapButton>
      <BootstrapButton
        size={"small"}
        variant="contained"
        disableRipple
        isActive={selectedFilter === "active"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </BootstrapButton>
      <BootstrapButton
        size={"small"}
        variant="contained"
        disableRipple
        isActive={selectedFilter === "completed"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </BootstrapButton>
    </Stack>
  )
}
// import React, { useState } from "react"
// import { BootstrapButton } from "./FilterTasksButtons.styles"
// import { Box, Button } from "@mui/material"
// import { useAppDispatch } from "common/hooks"
// import { todolistsApi } from "features/todolists/api/todolistsApi"
// import { DomainTodolist, FilterValues } from "features/todolists/lib/types/types"
//
// import { styled } from "@mui/material/styles"
// import Stack from "@mui/material/Stack"
// import { purple } from "@mui/material/colors"
//
// type Props = {
//   todolist: DomainTodolist
// }
//
// export const FilterTasksButtons = ({ todolist }: Props) => {
//   const dispatch = useAppDispatch()
//   const { id } = todolist
//   const [selectedFilter, setSelectedFilter] = useState<FilterValues>("all")
//
//   const changeFilterTasksHandler = (filter: FilterValues) => {
//     dispatch(
//       todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
//         const index = state.findIndex((tl) => tl.id === id)
//         if (index !== -1) {
//           state[index].filter = filter
//         }
//       }),
//     )
//     setSelectedFilter(filter)
//   }
//   return (
//     <Box sx={filterButtonsContainerSx}>
//       <Button
//         // color="secondary"
//         size={"small"}
//         variant="contained"
//         className={todolist.filter === "all" ? "active-filter" : ""}
//         onClick={() => changeFilterTasksHandler("all")}
//         // isActive={selectedFilter === "all"}
//
//       >
//         All
//       </Button>
//       <Button
//         // color="secondary"
//         size={"small"}
//         variant="contained"
//         className={todolist.filter === "active" ? "active-filter" : ""}
//         onClick={() => changeFilterTasksHandler("active")}
//         isActive={selectedFilter === "active"}
//
//       >
//         Active
//       </Button>
//       <Button
//         // color="secondary"
//         size={"small"}
//         variant="contained"
//         className={todolist.filter === "completed" ? "active-filter" : ""}
//         onClick={() => changeFilterTasksHandler("completed")}
//         isActive={selectedFilter === "completed"}
//
//       >
//         Completed
//       </Button>
//     </Box>
//   )
// }
//   return (
//     <Stack spacing={3} direction="row">
//       <BootstrapButton
//         size={"small"}
//         variant="contained"
//         disableRipple
//         className={todolist.filter === "all" ? "active-filter" : ""}
//         onClick={() => changeFilterTasksHandler("all")}
//         isActive={selectedFilter === "all"}
//       >
//         All
//       </BootstrapButton>
//       <BootstrapButton
//         size={"small"}
//         variant="contained"
//         disableRipple
//         className={todolist.filter === "active" ? "active-filter" : ""}
//         onClick={() => changeFilterTasksHandler("active")}
//         isActive={selectedFilter === "active"}
//       >
//         Active
//       </BootstrapButton>
//       <BootstrapButton
//         size={"small"}
//         variant="contained"
//         disableRipple
//         className={todolist.filter === "completed" ? "active-filter" : ""}
//         onClick={() => changeFilterTasksHandler("completed")}
//         isActive={selectedFilter === "completed"}
//       >
//         Completed
//       </BootstrapButton>
//     </Stack>
//   )
// }
