import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { ChangeEvent } from "react"
import s from "features/todolists/ui/Todolists/Todolist/TasksPagination/TasksPagination.module.css"
import { PAGE_SIZE } from "features/todolists/api/tasksApi"

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <>
      <Pagination
        size={"small"}
        count={Math.ceil(totalCount / PAGE_SIZE)}
        page={page}
        onChange={changePageHandler}
        shape="rounded"
        color="standard"
        className={s.pagination}
      />
      <div className={s.totalCount}>
        <Typography variant="caption">Total: {totalCount}</Typography>
      </div>
    </>
  )
}
