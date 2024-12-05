import { setAppStatusAC } from "app/app-reducer"
import { Dispatch } from "redux"
import { Inputs } from "../ui/Login/Login"
import { authApi } from "../api/authApi"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { clearTodolistDataAC } from "../../todolists/model/todolist-reducer"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    case 'SET_IS_INITIALIZED':
      return { ...state, isInitialized: action.payload.isInitialized }
    default:
      return state
  }
}
//ACTION
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {type: 'SET_IS_LOGGED_IN', payload: { isLoggedIn }} as const
}
const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: 'SET_IS_INITIALIZED', payload: { isInitialized } } as const
}

//THUNK
export const loginTC=(data: Inputs)=>(dispatch: Dispatch)=>{
dispatch(setAppStatusAC('loading'))
  authApi.login(data).then((res)=>{
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setIsLoggedInAC(true))
      localStorage.setItem('sn-token', res.data.data.token)
    }else {
      handleServerAppError(res.data, dispatch)
    }
  })
    .catch((error)=>{
      handleServerAppError(error, dispatch)
    })
}
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .logout()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsLoggedInAC(false))
        localStorage.removeItem('sn-token')
        dispatch(clearTodolistDataAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsLoggedInAC(true))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    }).finally(() => {
    dispatch(setIsInitializedAC(true))
  })
}


//TYPE
type ActionType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>














