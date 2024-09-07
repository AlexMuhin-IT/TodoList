import React, {ChangeEvent, useState} from 'react';
import {Button} from "./components/Button";
import {TaskPropsType} from "./App";

type TodolistPropsType = {
    title: string,
    tasks: TaskPropsType[]
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
}

export const Todolist = ({title, tasks, addTask, removeTask}: TodolistPropsType) => {

    const [taskTitle, setNewTitle] = useState('')



    const addTaskHandler = () => {
        addTask(taskTitle)
        setNewTitle('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button title={'+'}
                    onClick={addTaskHandler}/>
            <ul>
                {tasks.map((t: TaskPropsType) => {
                    const removeTaskHandler = () => {
                        removeTask(t.id)
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button onClick={removeTaskHandler} title={'X'}/>
                        </li>
                    )
                })}
            </ul>
            <Button onClick={()=>{}} title={'All'}/>
            <Button onClick={()=>{}} title={'Active'}/>
            <Button onClick={()=>{}} title={'Completed'}/>
        </div>

    )


};

