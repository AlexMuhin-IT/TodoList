import { FieldError } from "../../../app/AppHttpRequests"

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type BaseResponse<D={}>={
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: D
}
