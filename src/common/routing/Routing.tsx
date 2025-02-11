import { Route, Routes } from "react-router"
import { Login } from "features/auth/ui/Login/Login"
import { Main } from "app/Main"
import { Page404 } from "common/components/Page404/Page404"

export const Path = {
  Main: "/",
  Login: "login",
  Error: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.Error} element={<Page404 />} />
    </Routes>
  )
}
