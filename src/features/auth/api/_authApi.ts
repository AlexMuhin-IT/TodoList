// import { BaseResponse } from "common/types/types"
// import { instance } from "common/instance/instance"
// import { LoginArgs } from "features/auth/ui/Login/Login"
//
// export const _authApi = {
//   login(payload: LoginArgs) {
//     return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
//   },
//   logout() {
//     return instance.delete<BaseResponse>("auth/login")
//   },
//   me() {
//     return instance.get<
//       BaseResponse<{
//         id: number
//         email: string
//         login: string
//       }>
//     >(`auth/me`)
//   },
// }
