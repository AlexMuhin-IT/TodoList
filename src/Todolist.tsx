import React from 'react';
import {Button} from "./components/Button";

type TodolistPropsType = {
    title: string;
    tasks: TaskType[]
    onClick?: (event: React.MouseEvent) => void;
}
type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {
    const removeTask = (id: number) => {

    }
    return (
        <div>
            <h2>{title}</h2>
            <div>
                <input/>
                <button>+</button>
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
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
        ;
};

