import React from "react"
import { List } from "@mui/material"
import { Task } from "features/todolists/ui/Todolists/Todolist/Tasks/Task/Task"
import { TasksSkeleton } from "features/todolists/ui/skeletons/TasksSkeleton/TasksSkeleton"
import { TasksPagination } from "features/todolists/ui/Todolists/Todolist/TasksPagination/TasksPagination"
import { DomainTodolist } from "features/todolists/lib/types/types"
import { useTasks } from "features/todolists/lib/hooks/useTasks"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { tasks, isLoading, totalCount, setPage, page, count } = useTasks(todolist)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks?.map((task) => <Task key={task.id} task={task} todolist={todolist} disabled={todolist.entityStatus === "loading"} />)}
        </List>
      )}
      {count && count > 5 && <TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />}
    </>
  )
}
