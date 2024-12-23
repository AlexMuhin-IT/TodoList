import { tasksSlice, todolistsReducer } from "features/todolists/model"
import { appReducer, appSlice } from "app/appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "features/todolists/model/taskSlice"
import { todolistsSlice } from "features/todolists/model/todolistsSlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "app/baseApi"

export const store = configureStore({
  reducer: {
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
