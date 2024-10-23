import React, {ChangeEvent} from 'react';

import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {EditableSpan} from "./components/editableSpan/EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem, TextField} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {FilterValuesType, TaskType} from "./Main";


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
                             addTask,
                             removeTask,
                             changeTaskStatus,
                             tasks,
                             updateTask,
                             changeFilter,
                             filter,
                             todolistId,
                             removeTodolist,
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
        <div className={'todolist-wrapper'}>
            <div className={'todolist-title-container'}>
                <h3><EditableSpan
                    value={title}
                    onChange={updateTodolistHandler}/>
                </h3>
                <IconButton aria-label="delete"
                            onClick={removeTodolistHandler}
                            size={'medium'}
                >
                    <Delete/>
                </IconButton>
            </div>
            <div>

                <AddItemForm addItem={addTaskCallback}/>
                {tasks?.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List>
                        {tasks?.map((t: TaskType) => {
                            const removeTaskHandler = () => {
                                removeTask(todolistId, t.id)
                                // dispatch(removeTaskAC({props.todolistId, t.id}))
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(todolistId, t.id, newStatusValue)
                            }
                            const changeTaskTitleHandler = (title: string) => {
                                updateTask(todolistId, t.id, title)
                            }
                            return (
                                <ListItem
                                    alignItems={"center"}
                                    disableGutters
                                    disablePadding
                                    key={t.id}
                                    sx={getListItemSx(t.isDone)}>
                                    <div>
                                        <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                    </div>

                                    <EditableSpan onChange={changeTaskTitleHandler} value={t.title}/>
                                    <IconButton aria-label="delete"
                                                onClick={removeTaskHandler}
                                                size={'small'}>
                                        <Delete/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                )}
                <Box sx={filterButtonsContainerSx}>
                    <Button
                        color='secondary'
                        size={"small"}
                        variant="contained"
                        className={filter === 'all' ? 'active-filter' : ''}
                        onClick={() => changeFilterTasksHandler(todolistId, 'all')}
                    > All</Button>
                    <Button
                        color='secondary'
                        size={"small"}
                        variant="contained"
                        className={filter === 'active' ? 'active-filter' : ''}
                        onClick={() => changeFilterTasksHandler(todolistId, 'active')}
                    >Active</Button>
                    <Button
                        color='secondary'
                        size={"small"}
                        variant="contained"
                        className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => changeFilterTasksHandler(todolistId, 'completed')}
                    >Completed</Button>
                </Box>
            </div>
        </div>
    )
};

