import React, { useState } from "react"
import { useAppDispatch } from "common/hooks"
import { todolistsApi } from "features/todolists/api/todolistsApi"
import { DomainTodolist, FilterValues } from "features/todolists/lib/types/types"

import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

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

  const BootstrapButton = styled(Button)(({ isActive }: { isActive: boolean }) => ({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 12,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: isActive ? "#00d91d" : "#00d91d",
    borderColor: isActive ? "#00d91d" : "green",
    color: isActive ? "white" : "inherit",
    "&:hover": {
      backgroundColor: isActive ? "#00d91d" : "#0063cc",
      borderColor: "#00d91d",
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  }))

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

//   const BootstrapButton = styled(Button)({
//     isActive: true,
//     ":active": "#00d91d",
//     boxShadow: "none",
//     textTransform: "none",
//     fontSize: 16,
//     padding: "6px 12px",
//     border: "1px solid",
//     lineHeight: 1.5,
//     // backgroundColor: "#0063cc",
//     backgroundColor: "secondary",
//     borderColor: "green",
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:hover": {
//       backgroundColor: "#00d91d",
//       borderColor: "#00d91d",
//       boxShadow: "none",
//     },
//     "&:active": {
//       boxShadow: "none",
//       backgroundColor: "#0062cc",
//       // backgroundColor: "secondary",
//       borderColor: "#005cbf",
//     },
//     "&:focus": {
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
//     },
//   })
//   return (
// <Box sx={filterButtonsContainerSx}>
//   <Button
//     // color="secondary"
//     size={"small"}
//     variant="contained"
//     className={todolist.filter === "all" ? "active-filter" : ""}
//     onClick={() => changeFilterTasksHandler("all")}
//   >
//     All
//   </Button>
//   <Button
//     // color="secondary"
//     size={"small"}
//     variant="contained"
//     className={todolist.filter === "active" ? "active-filter" : ""}
//     onClick={() => changeFilterTasksHandler("active")}
//   >
//     Active
//   </Button>
//   <Button
//     // color="secondary"
//     size={"small"}
//     variant="contained"
//     className={todolist.filter === "completed" ? "active-filter" : ""}
//     onClick={() => changeFilterTasksHandler("completed")}
//   >
//     Completed
//   </Button>
// </Box>
//     <Stack spacing={3} direction="row">
//       <BootstrapButton
//         size={"small"}
//         variant="contained"
//         disableRipple
//         className={todolist.filter === "all" ? "active-filter" : ""}
//         onClick={() => changeFilterTasksHandler("all")}
//       >
//         All
//       </BootstrapButton>
//       <BootstrapButton
//         size={"small"}
//         variant="contained"
//         disableRipple
//         className={todolist.filter === "active" ? "active-filter" : ""}
//         onClick={() => changeFilterTasksHandler("active")}
//       >
//         Active
//       </BootstrapButton>
//       <BootstrapButton
//         size={"small"}
//         variant="contained"
//         disableRipple
//         className={todolist.filter === "completed" ? "active-filter" : ""}
//         onClick={() => changeFilterTasksHandler("completed")}
//       >
//         Completed
//       </BootstrapButton>
//     </Stack>
//   )
// }

// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText(purple[500]),
//   backgroundColor: purple[500],
//   "&:hover": {
//     backgroundColor: purple[700],
//   },
// }))

// export default function CustomizedButtons() {
//   return (
//     <Stack spacing={2} direction="row">
//       <ColorButton variant="contained">Custom CSS</ColorButton>
//       <BootstrapButton variant="contained" disableRipple>
//         Bootstrap
//       </BootstrapButton>
//     </Stack>
//   );
// }
