import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


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
    const removeTask=(id: string) => {

    }
    const addTask = (t: TaskPropsType) => {
        const newTask = {
            id: t.id,
            title: t.title,
            isDone: t.isDone
        }
        // setTask(newTask)
        alert('new task')
    }

    return (
        <div className="App">
            <Todolist
                title={'New Todolist'}
                tasks={tasks}
                addTask={addTask}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
