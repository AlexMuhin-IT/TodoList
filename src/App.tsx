import './App.css';
import React, {useState} from "react";
import {Todolist} from "./Todolist";
import {v1,} from "uuid";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Payton', isDone: false},
        {id: v1(), title: 'Figma', isDone: true},
        {id: v1(), title: 'BootStrap', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const addTask = (newTaskTitle: string) => {
        const newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        setTasks((prevTasks) => {
            return [newTask, ...prevTasks]
        })
    }
    const removeTask = (value: string) => {
        tasks = tasks.filter((task)=> task.id !== value)
        setTasks(tasks)
    }

    return (
        <div className="App">
            <Todolist title={'Заголовок номер 1'}
                      tasks={tasks}
                      addTask={addTask}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
