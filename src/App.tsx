import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TasksTypeProps = {
    id: string
    title: string
    isDone: boolean
}

const tasks:TasksTypeProps[] = [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Figma", isDone: true},
    {id: v1(), title: "Redux", isDone: false},
]


function App() {
    return (
        <div className="App">
            <Todolist tasks={tasks} title={"New Todolist"}/>
        </div>
    );
}

export default App;
