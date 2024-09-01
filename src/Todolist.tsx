import React from 'react';
import {Button} from "./components/Button";
import {TaskType} from "./App";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId:string)=>void
}

export const Todolist = ({title, tasks, removeTask}:TodolistPropsType)  => {

    // removeTask = ()=>{
    //     removeTask()
    // }

    return (
        <div>
            <div>
                <h3>{title}</h3>
                <input type="text"/>
                <Button

                    title='+'/>
            </div>
            {tasks.length === 0 ? (
                <p>'Тасок нет!'</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <Button
                                    onClick={()=>removeTask(t.id)}
                                    title={'X'}/>
                            </li>
                        )
                    })}
                </ul>
                )}

            <Button title={'All'}/>
            <Button title={'Active'}/>
            <Button title={'Completed'}/>
        </div>
    );
};
