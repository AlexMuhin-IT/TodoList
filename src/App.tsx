import './App.css';
import React, {useState} from "react";
import {TaskType, Todolist} from "./Todolist";
import {v1,} from "uuid";

export type TasksTodolistType = 'all' | 'active' | 'completed';

function App() {

    const [filter, setFilter] = useState<TasksTodolistType>('all');

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
    // ФИЛЬТРАЦИЯ ЭЛЕМЕНТОВ
    const changeFilter = (filter: TasksTodolistType) => {
        setFilter(filter)
    }
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    //----------------------
    //Добавления новых тасок
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
    //----------------------
    //Удаление тасок
    const removeTask = (value: string) => {
        const filteredTasks = tasks.filter((task) => {
            return task.id !== value
        })
        setTasks(filteredTasks)
    }
    //----------------------
    return (
        <div className="App">
            <Todolist title={'Заголовок номер 1'}
                      tasks={tasksForTodolist}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
