// import { TasksStateType } from "features/todolists/model/taskSlice"
// import { addTodolist, todolistsReducer } from "features/todolists/model/todolistsSlice"
//
// test("ids should be equals", () => {
//   const startTasksState: TasksStateType = {}
//   const startTodolistsState: TodolistType[] = []
//
//   const action = addTodolist("new todolists")
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
