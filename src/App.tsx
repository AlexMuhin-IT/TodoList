import './App.css';
import React from "react";
import {Todolist} from "./Todolist";

function App() {

    const tasks = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'Payton', isDone: false},
        {id: 5, title: 'Figma', isDone: true},
        {id: 6, title: 'BootStrap', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title={'Заголовок номер 1'}
                      tasks={tasks}
            />
        </div>
    );
}

export default App;
