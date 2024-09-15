import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/Button";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {EditableSpan} from "./components/editableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TodolistPropsType = {
    todolistId: string,
    title: string,
    tasks: TaskType[]
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             addTask,
                             removeTask,
                             changeFilter,
                             changeTaskStatus,
                             filter,
                             todolistId,
                             removeTodolist,
                             updateTask,
                             updateTodolist
                         }: TodolistPropsType) => {


    const changeFilterTasksHandler = (todolistId: string, filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const addTaskCallback = (title: string) => {
        addTask(todolistId, title)
    }
    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }

    return (
        // <div className={todolistId < todolistId ? 'todolist-wrapper' : 'todolist-secondary'}>
        <div className={'todolist-wrapper'}>
            <div className={'todolist-title-container'}>
                <h3><EditableSpan
                    value={title}
                    onChange={updateTodolistHandler}/>
                </h3>
                {/*<Button*/}
                {/*    title={'x'}*/}
                {/*    onClick={removeTodolistHandler}/>*/}
                <IconButton aria-label="delete"
                            onClick={removeTodolistHandler}
                            size={'medium'}
                >
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            <div>
                {
                    tasks.length === 0
                        ? <p>Тасок нет</p>
                        : <ul>
                            {tasks.map((t: TaskType) => {
                                const removeTaskHandler = () => {
                                    removeTask(todolistId, t.id)
                                }
                                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    const newStatusValue = e.currentTarget.checked
                                    changeTaskStatus(todolistId, t.id, newStatusValue)
                                }
                                const changeTaskTitleHandler = (title: string) => {
                                    updateTask(todolistId, t.id, title)
                                }
                                return (
                                    <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                        <div className={'style-tasks'}>
                                            <input
                                                type="checkbox"
                                                checked={t.isDone}
                                                onChange={changeTaskStatusHandler}
                                            />
                                            <EditableSpan onChange={changeTaskTitleHandler} value={t.title}/>
                                            {/*<Button onClick={removeTaskHandler} title={'X'}/>*/}
                                            <IconButton aria-label="delete"
                                                        onClick={removeTaskHandler}
                                                        size={'small'}
                                            >
                                                <Delete/>
                                            </IconButton>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                }
            </div>
            <div className={'style-button'}>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler(todolistId, 'all')}
                    title={'All'}/>
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler(todolistId, 'active')}
                    title={'Active'}/>
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler(todolistId, 'completed')}
                    title={'Completed'}/>
            </div>
        </div>
    )
};

