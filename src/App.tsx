import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function App() {

    const [tasks, setTask] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Figma", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValueType>('all');

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter);
    }

    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(task => !task.isDone);
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(task => task.isDone);
    }

    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId);
        setTask(filteredTasks);
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const newTasks = [newTask, ...tasks]
        setTask([newTask, ...tasks])
    }
    return (
        <div className="App">
            <Todolist
                tasks={taskForTodolist}
                title={"New Todolist"}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />

        </div>
    );
}

export default App;
