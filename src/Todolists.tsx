import React from 'react';
import Grid from "@mui/material/Grid2";
import {Container, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {RootState} from "./app/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/task-reducer";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model/todolist-reducer";
import {AddItemForm} from "./components/addItemForm/AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type TasksStateType = {
    [key: string]: TaskType[]
}


const Todolists = () => {
    const dispatch = useAppDispatch();

    const todolists = useAppSelector<RootState, TodolistType[]>(state => state.todolist)
    const tasks = useAppSelector<RootState, TasksStateType>(state => state.tasks)


    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC({todolistId, taskId}))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC({title, todolistId}))
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, taskStatus}))
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title}))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    return (
        <Container fixed>
            <Grid sx={{mb: '30px'}} container spacing={2}>
                <Grid size={8} alignItems={"center"}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>

                    {todolists.map(tl => {
                        const allTodolistTasks = tasks[tl.id]
                        let taskForTodolist = allTodolistTasks
                        if (tl.filter === 'active') {
                            taskForTodolist = allTodolistTasks.filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                            taskForTodolist = allTodolistTasks.filter(t => t.isDone)
                        }
                        return (
                            <Grid key={tl.id}>
                                <Paper sx={{p: '10px'}}>
                                    <Todolist
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Todolists;