import s from "./Page404.module.css"
import { Button } from "@mui/material"
import { Path } from "common/routing/Routing"

export const Page404 = () => {
  return (
    <div className={s.container}>
      <img alt={""} className={s.img} />
      <h2 className={s.subTitle}>нет такой страницы</h2>
      <Button className={s.button} href={Path.Main} variant="contained" size={"large"} sx={{ m: "auto" }}>
        Todolist's
      </Button>
    </div>
  )
}
