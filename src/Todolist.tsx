import React, {ChangeEvent} from 'react';
import {Button} from "./components/Button";
import {TaskPropsType} from "./App";

type TodolistPropsType = {
    title: string,
    tasks: TaskPropsType[]
    addTask: (t: TaskPropsType) => void
    removeTask: () => void
}

export const Todolist = ({title, tasks, addTask}: TodolistPropsType) => {


    const addTaskHandler = () => {
        // addTask()
    }

    return (
        <div>
            <h3>{title}</h3>
            <input type="text"/>
            <Button title={'+'} onClick={addTaskHandler}/>
            <ul>
                {tasks.map((t: TaskPropsType) => {
                const removeTaskHandler = () => {

                }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button
                                onClick={removeTaskHandler}
                                title={'X'}
                            /></li>
                    )
                })}
            </ul>
            <Button title={'All'}/>
            <Button title={'Active'}/>
            <Button title={'Completed'}/>
        </div>

    )


};

