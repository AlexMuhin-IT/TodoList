import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {
    Container,
    createTheme,
    CssBaseline,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from '@mui/material/Grid2';
import {Menu} from "@mui/icons-material";
import {MenuButton} from "./components/MenuButton";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,

    taskReducer
} from "./model/task-reducer";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolist-reducer";

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

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);
    const [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Figma", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Break", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Chocolate", isDone: true},
            {id: v1(), title: "Apply", isDone: false},
        ]
    })


    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasks(removeTaskAC({todolistId, taskId}))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC({todolistId, title}))
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC({todolistId, taskId, title}))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        dispatchTasks(changeTaskStatusAC({todolistId, taskId, taskStatus}))
    }


    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatchTodolists(changeTodolistFilterAC({todolistId, filter}))
    }
    const removeTodolist = (todolistId: string) => {
        // dispatchTodolists(removeTodolistAC(todolistId))

        dispatchTodolists(removeTodolistAC(todolistId))
        dispatchTasks(removeTodolistAC(todolistId))
    }
    const addTodolist = (title: string) => {
        dispatchTodolists(addTodolistAC( title))
        dispatchTasks(addTodolistAC( title))
    }
    const updateTodolist = (todolistId: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC({todolistId, title}))
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

export default App;
