import React, {ChangeEvent, useState} from 'react';
import {Button} from "./components/Button";

type TodolistPropsType = {
    title: string;
    tasks: TaskType[]
    removeTask: (taskId: string) => void;
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const Todolist = ({title, tasks, removeTask, addTask}: TodolistPropsType) => {
    const [taskTitle, setTaskTitle] = useState('')

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }
    return (
        <div>
            <h2>{title}</h2>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={event => {
                           if (event.key === 'Enter') {
                               addTaskHandler()
                           }
                       }}

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
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <Button
                                    title={'X'}
                                    onClick={() => removeTask(t.id)}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => {
                }}/>
                <Button title={'Active'} onClick={() => {
                }}/>
                <Button title={'Completed'} onClick={() => {
                }}/>
            </div>
        </div>
    )
        ;
};

