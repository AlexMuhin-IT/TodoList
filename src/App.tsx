import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    const [tasks, setTask] = useState<TaskPropsType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Figma", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    const changeFilter = (filterValues: FilterValuesType) => {
        setFilter(filterValues);
    }
    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone)
    }
    const removeTask = (taskId: string) => {
        const taskRemove = tasks.filter((t) => t.id !== taskId);
        setTask(taskRemove)
    }
    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false,
        }
        const newTasks = [newTask, ...tasks]
        setTask(newTasks)
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const newState = tasks.map(t => (t.id === taskId ? {...t, isDone: taskStatus} : t))
        setTask(newState)
    }


    return (
        <div className="App">
            <Todolist
                title={'New Todolist'}
                tasks={taskForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
