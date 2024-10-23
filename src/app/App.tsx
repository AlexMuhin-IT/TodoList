import React, {useState} from 'react';
import './App.css';
import {Todolist} from "../Todolist";
import {AddItemForm} from "../components/addItemForm/AddItemForm";
import {Container, createTheme, CssBaseline, IconButton, Paper, Switch, ThemeProvider, Toolbar} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from '@mui/material/Grid2';
import {Menu} from "@mui/icons-material";
import {MenuButton} from "../components/MenuButton";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/task-reducer";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    removeTodolistAC,

} from "../model/todolist-reducer";

import {useAppDispatch, useAppSelector} from "./hooks";
import {changeThemeAC} from "./app-reducer";
import {RootState} from "./store";
import {getTheme} from "./common/theme/theme";
import {Header} from "../Header";
import Main from "../Main";

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

export const App = () => {

    // theme in app
    const themeMode = useAppSelector<RootState, ThemeMode>(state => state.app.themeMode)

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}