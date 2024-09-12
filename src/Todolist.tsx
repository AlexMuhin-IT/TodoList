import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/Button";
import {FilterValuesType, TaskPropsType} from "./App";

type TodolistPropsType = {
    title: string,
    tasks: TaskPropsType[]
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filterValues: FilterValuesType) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
}

export const Todolist = ({
                             title,
                             tasks,
                             addTask,
                             removeTask,
                             changeFilter,
                             changeTaskStatus,
                             filter
                         }: TodolistPropsType) => {

    const [taskTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }


    return (
        <div>
            <h3>{title}</h3>
            <input
                className={error ? 'error' : ''}
                type="text"
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}
            />
            <Button title={'+'}
                    onClick={addTaskHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
            <div>
                <ul>
                    {tasks.map((t: TaskPropsType) => {
                        const removeTaskHandler = () => {
                            removeTask(t.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(t.id, newStatusValue)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <div className={'style-tasks'}>
                                    <input
                                        type="checkbox"
                                        checked={t.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />
                                    <span>{t.title}</span>
                                    <Button onClick={removeTaskHandler} title={'X'}/>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={'style-button'}>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler('all')}
                    title={'All'}/>
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler('active')}
                    title={'Active'}/>
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler('completed')}
                    title={'Completed'}/>
            </div>

        </div>

    )


};

