import React, {useRef, useState, ChangeEvent, KeyboardEvent} from 'react';
import {Button} from "./components/Button";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    task: Array<TaskType>
    date?: string
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}


export const Todolist = ({title, task, date, removeTask, changeFilter, addTask}: PropsType) => {
    // const inputRef = useRef<HTMLInputElement>(null);

    const [taskTitle, setTaskTitle] = useState('');
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(taskTitle)
            setTaskTitle('')
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                {/*<input*/}
                {/*    ref={inputRef}*/}
                {/*    placeholder={'useRef'}*/}
                {/*/>*/}
                {/*<Button title={'+'} onClick={() => {*/}
                {/*    if (inputRef.current) {*/}
                {/*        addTask(inputRef.current.value)*/}
                {/*        inputRef.current.value = '';*/}
                {/*    }*/}
                {/*}}/>*/}
            </div>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                    placeholder={'New Skills'}
                />
                <Button title={'+'}
                        onClick={addTaskHandler}
                />
            </div>
            {task.length === 0 ? (
                <p>Тасков нет</p>
            ) : (
                <ul>
                    {task.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id)
                        }
                        return (
                            <>
                                <li>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'X'} onClick={removeTaskHandler}/>
                                </li>
                            </>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => changeFilterTasksHandler('all')}/>
                <Button title={'Active'} onClick={() => changeFilterTasksHandler('active')}/>
                <Button title={'Completed'} onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
            <div>{date}</div>
        </div>
    )
}

