import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/Button";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string;
    tasks: TaskType[]
    removeTask: (taskId: string) => void;
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const Todolist = ({title, tasks, removeTask, addTask, changeFilter}: TodolistPropsType) => {
    const [taskTitle, setTaskTitle] = useState('')

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }
    const addTaskOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }
    return (
        <div>
            <h2>{title}</h2>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={addTaskOnKeyDownHandler}
                />
                <Button title={'+'}
                        onClick={addTaskHandler}
                />
            </div>
            {tasks.length === 0 ? (
                <p>Тасков нет</p>
            ) : (
                <ul>
                    {tasks.map((t: TaskType) => {
                        const removeTaskHandler = () => {
                            removeTask(taskTitle)
                        }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <Button
                                    title={'X'}
                                    onClick={removeTaskHandler}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={()=>changeFilterTasksHandler('all')}/>
                <Button title={'Active'} onClick={()=>changeFilterTasksHandler('active')}/>
                <Button title={'Completed'} onClick={()=>changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
        ;
};

