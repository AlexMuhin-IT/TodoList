import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/Button";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/addItemForm/AddItemForm";

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
                             removeTodolist
                         }: TodolistPropsType) => {


    const changeFilterTasksHandler = (todolistId: string, filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
const addTaskCallback = (title:string)=>{
        addTask(todolistId, title)
}
    return (
        // <div className={todolistId < todolistId ? 'todolist-wrapper' : 'todolist-secondary'}>
        <div className={'todolist-wrapper'}>
            <div className={'todolist-title-container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskCallback} />
            <div>
                <ul>
                    {tasks.map((t: TaskType) => {
                        const removeTaskHandler = () => {
                            removeTask(todolistId, t.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(todolistId, t.id, newStatusValue)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <div className={'style-tasks'}>
                                    <input
                                        type="checkbox"
                                        checked={t.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />
                                    <span>{t.title}</span>
                                    <Button onClick={removeTaskHandler} title={'X'}/>
                                </div>
                            </li>
                        )
                    })}
                </ul>
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

