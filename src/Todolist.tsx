import React from 'react';
import {Button} from "./components/Button";
import { TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]

    removeTask: (taskId: string) => void;
}


export const Todolist = ({title, tasks, removeTask}: TodolistPropsType) => {

    return (
        <div>
            <h2>{title}</h2>
            <div>
                <input type="text" checked={true}/>
                <Button title={'+'}/>
            </div>
            <div>
                {tasks.length === 0 ?
                    <p>NO TASK</p> : (
                        <ul>
                            {tasks.map(t => {
                                return (
                                    <li key={t.id}>
                                        <input type="checkbox" checked={t.isDone}/>
                                        <span>{t.title}</span>
                                        <Button onClick={()=>removeTask(t.id)}
                                                title={'X'}/>
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }
            </div>
            <div>
                <Button title={'ALL'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>

        </div>
    )
        ;
};

