import { Dispatch } from "redux"
import { BaseResponse } from "common/types/types"
import { setAppError, setAppStatus } from "app/appSlice"

export const handleServerAppError = <T>(
  data: BaseResponse<T>,
  dispatch: Dispatch,
) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: "Some error occurred" }))
  }
  dispatch(setAppStatus({ status: "failed" }))
}
