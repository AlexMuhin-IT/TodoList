//
//
// // let startState: TasksStateType = {}
//
// import { addTask, removeTask, setTasks } from "features/todolists/model/taskSlice"
// import { addTodolist, DomainTodolist, removeTodolist } from "features/todolists/model/todolistsSlice"
//
// let startState: DomainTodolist = {}
//
// beforeEach(() => {
//   startState = {
//     ["todolistId1"]: [
//       { id: "1", title: "CSS", isDone: false },
//       { id: "2", title: "JS", isDone: true },
//       { id: "3", title: "React", isDone: false },
//     ],
//     todolistId2: [
//       { id: "1", title: "bread", isDone: false },
//       { id: "2", title: "milk", isDone: true },
//       { id: "3", title: "tea", isDone: false },
//     ],
//   }
// })
// beforeEach(() => {
//   startState = {
//     ["todolistId1"]: [],
//     ["todolistId2"]: [],
//   }
// })
//
// test("correct task should be deleted from correct array", () => {
//   const endState = taskReducer(
//     startState,
//     removeTask({
//       todolistId: "todolistId2",
//       taskId: "2",
//     }),
//   )
//
//   expect(endState).toEqual({
//     todolistId1: [
//       { id: "1", title: "CSS", isDone: false },
//       { id: "2", title: "JS", isDone: true },
//       { id: "3", title: "React", isDone: false },
//     ],
//     todolistId2: [
//       { id: "1", title: "bread", isDone: false },
//       { id: "3", title: "tea", isDone: false },
//     ],
//   })
// })
// test("correct task should be added to correct array", () => {
//   const endState = taskReducer(
//     startState,
//     addTask({
//       todolistId: "todolistId2",
//       title: "juce",
//     }),
//   )
//
//   expect(endState["todolistId1"].length).toBe(3)
//   expect(endState["todolistId2"].length).toBe(4)
//   expect(endState["todolistId2"][0].id).toBeDefined()
//   expect(endState["todolistId2"][0].title).toBe("juce")
//   expect(endState["todolistId2"][0].isDone).toBe(false)
// })
// test("status of specified task should be changed", () => {
//   const endState = taskReducer(
//     startState,
//     changeTaskStatus({
//       taskId: "2",
//       taskStatus: false,
//       todolistId: "todolistId2",
//     }),
//   )
//
//   expect(endState["todolistId2"][1].isDone).toBe(false)
//   expect(endState["todolistId1"][0].isDone).toBe(false)
// })
// test("title of specified task should be changed", () => {
//   const endState = taskReducer(
//     startState,
//     changeTaskTitleAC({
//       taskId: "1",
//       title: "HTML&CSS",
//       todolistId: "todolistId1",
//     }),
//   )
//   expect(endState["todolistId1"][0].title).toBe("HTML&CSS")
//   expect(endState["todolistId2"][0].title).toBe("bread")
// })
//
// test("new array should be added when new todolists is added", () => {
//   const endState = taskReducer(startState, addTodolist("new todolists"))
//
//   const keys = Object.keys(endState)
//   const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
//   if (!newKey) {
//     throw Error("new key should be added")
//   }
//
//   expect(keys.length).toBe(3)
//   expect(endState[newKey]).toEqual([])
// })
// test("property with todolistId should be deleted", () => {
//   const action = removeTodolist("todolistId2")
//
//   const endState = taskReducer(startState, action)
//
//   const keys = Object.keys(endState)
//
//   expect(keys.length).toBe(1)
//   expect(endState["todolistId2"]).not.toBeDefined()
//   // or
//   expect(endState["todolistId2"]).toBeUndefined()
// })
//
// test("new array should be added when new todolists is added", () => {
//   const action = setTasks(startState["todolistId1"], ["todolistId2"])
//   const endState = taskReducer(
//     {
//       todolistId2: [],
//       todolistId1: [],
//     },
//     action,
//   )
//
//   // const keys = Object.keys(endState)
//   // const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
//   // if (!newKey) {
//   //   throw Error("new key should be added")
//   // }
//
//   expect(endState["todolistId1"].length).toBe(3)
//   expect(endState["todolistId2"].length).toBe(0)
// })
