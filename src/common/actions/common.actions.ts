import { createAction } from "@reduxjs/toolkit"
import { TasksStateType } from "features/todolists/model/taskSlice"
import { DomainTodolist } from "features/todolists/model/todolistsSlice"

// export type ClearTasksAndTodolists = {
//   tasks: TasksStateType
//   todolists: DomainTodolist[]
// }

export const clearTasksAndTodolists = createAction("common/clear-tasks-todolists")
