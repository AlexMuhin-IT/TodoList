import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: true},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])
    const removeTask = (taskId: number) => {
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
                      changeFilter={changeFilter}/>
            {/*<Todolist title={'Songs'} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
