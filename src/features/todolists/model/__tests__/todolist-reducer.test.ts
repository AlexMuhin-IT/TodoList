// import { v1 } from "uuid"
// import {
//   addTodolist,
//   changeTodolistTitle,
//   changeTodolistFilter,
//   removeTodolist,
//   todolistsReducer, DomainTodolist
// } from "../todolist-reducer"
//
// let todolistId1: string
// let todolistId2: string
// let startState: Array<DomainTodolist> = []
//
// beforeEach(() => {
//   todolistId1 = v1()
//   todolistId2 = v1()
//
//   startState = [
//     { id: todolistId1, title: "What to learn", filter: "all",order:0,addedDate:'', entityStatus: 'idle' },
//     { id: todolistId2, title: "What to buy", filter: "all",order:0,addedDate:'', entityStatus: 'idle'},
//   ]
// })
//
// test("correct todolists should be added", () => {
//   const newTodolist: DomainTodolist = {
//     id: 'any id',
//     title: "New Todolist",
//     filter: "all",
//     order: 0,
//     addedDate: "",
//     entityStatus: 'idle'
//   }
//   const endState = todolistsReducer(startState, addTodolist(newTodolist))
//
//   expect(endState.length).toBe(3)
//   expect(endState[0].title).toBe("New Todolist")
// })
// test("correct todolists should be removed", () => {
//   const endState = todolistsReducer(startState, removeTodolist(todolistId1))
//
//   expect(endState.length).toBe(1)
//   expect(endState[0].id).toBe(todolistId2)
//   // expect(endState[1].id).toBe(todolistId2);
// })
// test("correct todolists should change its name", () => {
//
//   const endState = todolistsReducer(
//     startState,
//     changeTodolistTitle({ todolistId: todolistId2, title: newTodolistTitle }),
//   )
//
//   expect(endState[0].title).toBe("What to learn")
//   expect(endState[1].title).toBe(newTodolistTitle)
// })
// test("correct filter of todolists should be change", () => {
//
//   const newFilter = "completed"
//   const endState = todolistsReducer(startState, changeTodolistFilter({ todolistId: todolistId2, filter: newFilter }))
//
//   expect(endState[0].filter).toBe("all")
//   expect(endState[1].filter).toBe("completed")
// })
