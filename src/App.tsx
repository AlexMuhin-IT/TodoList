import './App.css';
import React, {useState} from "react";
import {v1} from "uuid";
import {Todolist} from "./Todolist";

type FilteredTodolist = 'all' | 'completed' | 'active'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Payton', isDone: false},
        {id: v1(), title: 'Figma', isDone: true},
        {id: v1(), title: 'BootStrap', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const [filter, setFilter] = useState('all')

    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(task => task.isDone)
    }


    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist
                title={'New Todolist'}
                tasks={taskForTodolist}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
