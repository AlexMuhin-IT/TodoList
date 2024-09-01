import React, {ChangeEvent, useState} from 'react';
import {Button} from "./components/Button";
import {TasksTodolistType} from "./App";


type TodolistProps = {
    title: string,
    tasks: TaskType[],
    addTask: (title: string) => void,
    removeTask: (value: string) => void,
    changeFilter: (filter: TasksTodolistType) => void,
    changeTaskStatus: (id: string, newStatusValue: boolean) => void,
    filter: string
}
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;

}


export const Todolist = ({
                             title,
                             tasks,
                             addTask,
                             removeTask,
                             changeFilter,
                             changeTaskStatus,
                             filter,
                         }: TodolistProps) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onNewTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value);

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required!')
        }
    };
    // const addTaskOnKeyUpHandler = (e:  KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         addTaskHandler()
    //     }
    // }
    const addTaskOnKeyUpHandler = (e: React.KeyboardEvent) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: TasksTodolistType) => {
        changeFilter(filter)
    }
    return (
        <div style={{background: 'darkkhaki'}}>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    placeholder={'Введите название'}
                    type="text"
                    value={taskTitle}
                    onChange={onNewTaskTitleChange}
                    onKeyDown={addTaskOnKeyUpHandler}
                />
                <Button
                    onClick={addTaskHandler}
                >+</Button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (<p>Taskoff HET</p>) : (
                <ul>
                    {tasks.map(t => {
                        const removeTaskHandler = () => {
                            removeTask(t.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(t.id, newStatusValue)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            {/*<li key={t.id} className={!t.isDone ? 'is-done' : ''}>*/}
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={changeTaskStatusHandler}
                                />
                                <span>{t.title}</span>
                                <Button
                                    onClick={removeTaskHandler}
                                >X</Button>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                {/*<button>All</button>*/}
                {/*<button>Active</button>*/}
                {/*<button>Competed</button>*/}
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => changeFilterTasksHandler('all')}
                >ALL</Button>

                <Button
                    onClick={() => changeFilterTasksHandler('active')}
                    className={filter === 'active' ? 'active-filter' : ''}
                >Active</Button>

                <Button
                    onClick={() => changeFilterTasksHandler('completed')}
                    className={filter === 'completed' ? 'active-filter' : ''}
                >Competed</Button>
            </div>
        </div>
    );
};

