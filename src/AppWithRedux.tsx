import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {Container, createTheme, CssBaseline, IconButton, Paper, Switch, ThemeProvider, Toolbar} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from '@mui/material/Grid2';
import {Menu} from "@mui/icons-material";
import {MenuButton} from "./components/MenuButton";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/task-reducer";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    removeTodolistAC,

} from "./model/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./model/store";

type ThemeMode = "light" | "dark";

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

export const AppWithRedux = () => {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolist)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


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
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const updateTodolist = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title}))
    }


    // theme in app
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#18a408',
            },
            secondary: {
                main: '#000998'
            },
            action: {
                active: '#cca126'
            },
        },
    })
    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar sx={{mb: '30px'}} position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <Menu/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
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
                                <Grid>
                                    <Paper sx={{p: '10px'}}>
                                        <Todolist
                                            key={tl.id}
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
        </ThemeProvider>
    );
}

// export default AppWithRedux;
