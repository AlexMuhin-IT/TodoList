import React from 'react';
import {Button} from "./components/Button";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    task: Array<TaskType>
    date?: string
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export const Todolist = ({title, task, date, removeTask, changeFilter}: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'} onClick={() => {
                }}/>
            </div>
            {task.length === 0 ? (
                <p>Тасков нет</p>
            ) : (
                <ul>
                    {task.map(task => {
                        return (
                            <>
                                <li>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'X'} onClick={() => removeTask(task.id)}/>
                                </li>
                            </>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}

