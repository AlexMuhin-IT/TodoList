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
    const removeTask = (taskId: string) => {
       const taskRemove = tasks.filter((t)=>t.id !== taskId);
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
