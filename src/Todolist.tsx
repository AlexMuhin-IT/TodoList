import React, {ChangeEvent, useState} from 'react';
import {Button} from "./components/Button";
import {TasksTodolistType} from "./App";


type TodolistProps = {
    title: string;
    tasks: TaskType[]
    addTask: (title: string) => void;
    removeTask: (value: string) => void;
    changeFilter: (filter: TasksTodolistType) => void;
}
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;

}


export const Todolist = ({title, tasks, addTask, removeTask, changeFilter}: TodolistProps) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value);

    const handleAddTask = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    };

    // const handlerRemoveTask = () => {
    //     alert(Todolist.id)
    // }

    // const removeTaskHandler = (e: ChangeEvent<HTMLButtonElement>)=> {
    //     removeTask(e.target.value)
    //     setNewTaskTitle('')
    // };

    return (
        <div style={{background: 'darkkhaki'}}>
            <h3>{title}</h3>
            <div>
                <input placeholder={'Введите название'} type="text" value={newTaskTitle}
                       onChange={onNewTaskTitleChange}/>
                <Button
                    title={'+'}
                    onClick={handleAddTask}/>
            </div>
            {tasks.length === 0 ? (<p>Taskoff HET</p>) : (
                <ul>
                    {tasks.map(t => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <Button
                                    onClick={()=>{removeTask(t.id)}}
                                    title={'X'}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                {/*<button>All</button>*/}
                {/*<button>Active</button>*/}
                {/*<button>Competed</button>*/}
                <Button title={'ALL'} onClick={()=>{changeFilter('all')}}/>
                <Button title={'Active'} onClick={()=>{changeFilter('active')}}/>
                <Button title={'Competed'} onClick={()=>{changeFilter('completed')}}/>
            </div>
        </div>
    );
};

