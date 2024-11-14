import { FieldError } from "../../../app/AppHttpRequests"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}
export type DomainTask ={
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
export type CreateTaskResponse = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: {
    item: DomainTask
  }
}
export type UpdateTaskResponse={
  status: number
  title: string
  deadline: string
  description: string
  priority: number,
  startDate: string
}
export type DeleteTaskResponse={
  resultCode: number,
  message: string[],
  data: {
    item: DomainTask
  },
}