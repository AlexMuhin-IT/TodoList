import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1, v4} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const addTask = (title: string) => {
        const newTask = {
            id: v4(),
            title,
            isDone: false,
        }

        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])
    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    let filteredTasks: Array<TaskType> = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    // const tasks2: Array<TaskType> = []

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      task={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
            {/*<Todolist title={'Songs'} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
