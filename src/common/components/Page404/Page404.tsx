import s from "./Page404.module.css"
import { Button } from "@mui/material"
import { Path } from "common/routing/Routing"
import { Route, Routes } from "react-router"

export const Page404 = () => {
  return (
    <div className={s.container}>
      {/*<h1 className={s.title}>404</h1>*/}
      <img alt={""} className={s.img} />
      {/*<h2 className={s.subTitle}>page not found</h2>*/}
      <h2 className={s.subTitle}>нет такой страницы</h2>
      <Button className={s.button} href={Path.Main} variant="contained" size={"large"} sx={{ m: "auto" }}>
        Todolist's
      </Button>

      {/*<Routes>*/}
      {/*  <Route*/}
      {/*    path="/*"*/}
      {/*    // element={*/}
      {/*    // }*/}
      {/*  />*/}
      {/*</Routes>*/}
    </div>
  )
}
