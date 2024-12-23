import { createAction } from "@reduxjs/toolkit"

// export type ClearTasksAndTodolists = {
//   tasks: TasksStateType
//   todolists: DomainTodolist[]
// }

export const clearTasksAndTodolists = createAction("common/clear-tasks-todolists")
