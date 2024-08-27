import React from 'react';
import {Button} from "./components/Button";

type TodolistPropsType = {
    title: string;
    tasks: TaskType[]
    removeTask: (taskId: number) => void;
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, removeTask}: TodolistPropsType) => {

    return (
        <div>
            <h2>{title}</h2>
            <div>
                <input/>
                <Button title={'+'} onClick={()=>{}}/>
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
                <Button title={'All'} onClick={()=>{}}/>
                <Button title={'Active'} onClick={()=>{}}/>
                <Button title={'Completed'} onClick={()=>{}}/>
            </div>
        </div>
    )
        ;
};

