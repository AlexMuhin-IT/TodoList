import { FieldError } from "../../../app/AppHttpRequests"
import { TaskPriority, TaskStatus } from "../../../common/enums/enums"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}
export type DomainTask = {
  description: string
  title: string
  // completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskStatusResponse = {
  status: number
  title: string
  deadline: string
  description: string
  priority: number,
  startDate: string
}
export type BaseResponse<T={}>={
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: T
}
export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
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