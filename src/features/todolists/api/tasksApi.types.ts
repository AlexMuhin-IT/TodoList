import { TaskPriority, TaskStatus } from "common/enums"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}
export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
// export type UpdateTaskStatusResponse = {
//   status: number
//   title: string
//   deadline: string
//   description: string
//   priority: number,
//   startDate: string
// }

// export type CreateTaskResponse = {
//   resultCode: number
//   messages: string[]
//   fieldsErrors: FieldError[]
//   data: {
//     item: DomainTask
//   }
// }
// export type DeleteTaskResponse = {
//   resultCode: number,
//   message: string[],
//   data: {
//     item: DomainTask
//   },
// }
// export type UpdateTaskTitleResponse = {
//   resultCode: number,
//   message: string[],
//   data: {
//     item: DomainTask
//   },
// }