import './App.css';
import React, {useState} from "react";
import {Todolist} from "./Todolist";
import {v1,} from "uuid";

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Payton', isDone: false},
        {id: v1(), title: 'Figma', isDone: true},
        {id: v1(), title: 'BootStrap', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])
    const tasks2 = [
        {id: v1(), title: 'Hello world', isDone: true},
        {id: v1(), title: 'I am Happy', isDone: false},
        {id: v1(), title: 'Yo', isDone: false},
        {id: v1(), title: 'Yes', isDone: true},
    ]

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
    const removeTask = (newTaskTitle: string) => {

    }

    return (
        <div className="App">
            <Todolist title={'Заголовок номер 1'}
                      tasks={tasks}
                      addTask={addTask}
                      removeTask={removeTask}
            />
            <Todolist title={'Заголовок номер 1'}
                      tasks={tasks2}
                      addTask={addTask}
                      removeTask={removeTask}
            />

        </div>
    );
}

export default App;
