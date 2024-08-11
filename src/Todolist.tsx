import React from 'react';
import {Button} from "./components/Button";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    date?: string
}

export const Todolist = ({title, tasks, date}: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасков нет</p>
            ) : (
                <ul>
                    {tasks.map(tasks => {
                        return (
                            <>
                                <li>
                                    <input type="checkbox" checked={tasks.isDone}/>
                                    <span>{tasks.title}</span>
                                </li>
                            </>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
            <div>{date}</div>
        </div>
    )
}

