// import { addTodolistAC, todolistsReducer } from "../todolist-reducer"
// import { taskReducer } from "../task-reducer"
// import { TasksStateType, TodolistType } from "../../ui/Todolists/Todolists"
//
// test("ids should be equals", () => {
//   const startTasksState: TasksStateType = {}
//   const startTodolistsState: TodolistType[] = []
//
//   const action = addTodolistAC("new todolists")
//
//   const endTasksState = taskReducer(startTasksState, action)
//   const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//   const keys = Object.keys(endTasksState)
//   const idFromTasks = keys[0]
//   const idFromTodolists = endTodolistsState[0].id
//
//   expect(idFromTasks).toBe(action.payload.todolistId)
//   expect(idFromTodolists).toBe(action.payload.todolistId)
// })
