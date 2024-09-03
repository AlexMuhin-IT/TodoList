import React, {ChangeEvent} from 'react';
import {Button} from "./components/Button";
import {FilterValueType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    changeFilter: (filter: FilterValueType) => void
    removeTask: (taskId: string) => void;
    addTask: (title: string) => void
}


export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = React.useState('');

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }
    const onClickButtonHandler = () => {
        addTask(taskTitle);
        setTaskTitle('');
    }
    return (
        <div>
            <h2>{title}</h2>
            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeInputHandler}
                    type="text"
                    checked={true}/>
                <Button
                    onClick={onClickButtonHandler}
                    title={'+'}/>
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
                                        <Button onClick={() => removeTask(t.id)}
                                                title={'X'}/>
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }
            </div>
            <div>
                <Button
                    onClick={() => changeFilter('all')}
                    title={'ALL'}/>
                <Button
                    onClick={() => changeFilter('active')}
                    title={'Active'}/>
                <Button
                    onClick={() => changeFilter('completed')}
                    title={'Completed'}/>
            </div>

        </div>
    )
        ;
};

