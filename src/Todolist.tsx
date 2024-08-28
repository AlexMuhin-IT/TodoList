import React from 'react';

type TodolistProps = {
    title: string;
    tasks: TasksPropsType[]
}
type TasksPropsType = {
    id: number;
    title: string;
    isDone: boolean;
}


export const Todolist = ({title, tasks}: TodolistProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t => (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button>X</button>
                    </li>
                ))}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Competed</button>
            </div>
        </div>
    );
};

