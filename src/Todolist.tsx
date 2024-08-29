import React, {ChangeEvent, useState} from 'react';
import {Button} from "./components/Button";
import {strict} from "node:assert";

type TodolistProps = {
    title: string;
    tasks: TasksPropsType[]
    addTask: (title: string) => void;
    removeTask: (id: string) => void;

}
export type TasksPropsType = {
    id: string;
    title: string;
    isDone: boolean;

}


export const Todolist = ({title, tasks, addTask, removeTask}: TodolistProps) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value);

    const handleAddTask = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    };

    // const handlerRemoveTask = () => {
    //     removeTask()
    //     setNewTaskTitle('')
    // }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input placeholder={'Введите название'} type="text" value={newTaskTitle}
                       onChange={onNewTaskTitleChange}/>
                <Button
                    title={'+'}
                    onClick={handleAddTask}/>
            </div>
            <ul>
                {tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                            <Button title={'X'}/>
                        </li>
                    )


                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Competed</button>
            </div>
        </div>
    )
        ;
};

