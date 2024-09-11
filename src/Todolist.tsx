import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/Button";
import {FilterValuesType, TaskPropsType} from "./App";

type TodolistPropsType = {
    title: string,
    tasks: TaskPropsType[]
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filterValues: FilterValuesType) => void
    changeTaskStatus:(taskId: string, taskStatus: boolean ) => void
}

export const Todolist = ({title, tasks, addTask, removeTask, changeFilter,changeTaskStatus}: TodolistPropsType) => {

    const [taskTitle, setNewTitle] = useState('')

    const addTaskHandler = () => {
        addTask(taskTitle)
        setNewTitle('')
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }


    return (
        <div>
            <h3>{title}</h3>
            <input
                type="text"
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}
            />
            <Button title={'+'}
                    onClick={addTaskHandler}/>
            <ul>
                {tasks.map((t: TaskPropsType) => {
                    const removeTaskHandler = () => {
                        removeTask(t.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(t.id, newStatusValue)
                    }
                    return (
                        <li key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            <span>{t.title}</span>
                            <Button onClick={removeTaskHandler} title={'X'}/>
                        </li>
                    )
                })}
            </ul>
            <Button onClick={() => changeFilterTasksHandler('all')} title={'All'}/>
            <Button onClick={() => changeFilterTasksHandler('active')} title={'Active'}/>
            <Button onClick={() => changeFilterTasksHandler('completed')} title={'Completed'}/>
        </div>

    )


};

