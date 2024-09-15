import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/addItemForm/AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Figma", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Break", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Chocolate", isDone: true},
            {id: v1(), title: "Apply", isDone: false},
        ]
    });

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        // const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl);
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl));
    }
    const removeTask = (todolistId: string, taskId: string) => {
        // самый большой и подробный код в котором присваиваем тудулистТаскс таски выбраного тудулиста
        // в новой переменной размещаем отфильтрованные таски у которых ID несовпал
        // перезаписываем таски тудулиста с отфильтроваными
        // сетаем новый результат
        // const todolistTasks = tasks[todolistId];
        // const newTodolistTasks = todolistTasks.filter(t => t.id !== taskId)
        // tasks[todolistId] = newTodolistTasks;
        // setTasks({...tasks, newTodolistTasks});
        // в переменную помещаем отлифтрованые элементы у которых ID не совпал
        // const newTodolistTasks = {
        //     ...tasks, [todolistId]: tasks[todolistId].filter(t=>t.id!==taskId)
        // }
        // setTasks(newTodolistTasks)
        //
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        // самый подробный рассписаный метод где сначала мы присваиваем todolistTasks значения конкретного тодолист по которому кликнули
        // потом к этому списку тасок присваиваем поверхностную копию с новой таской
        // const todolistTasks = tasks[todolistId]
        // tasks[todolistId] = [newTask, ...todolistTasks]
        // setTasks({...tasks})
        //метод чуть короче за счет того что в новую переменную newTodolistTasks помещаем найденный тодолист
        // в котором значением является новая таска и копия этого найденого тудулиста и второе значение копия таско
        // сетаем переменную
        // const newTodolistTasks = {[todolistId]: [newTask, ...tasks[todolistId]], ...tasks}
        // setTasks(newTodolistTasks)
        //самый короткий способ: создаем копию всех тасок, в которой находим нужный тудулист
        //где ключ это ID а значение это добавленая таска и копия тасок с этим ID
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        //
        // const todolistTasks = tasks[todolistId]
        // const newTodolistTasks = todolistTasks.map(t =>
        //     t.id == taskId ? {...t, isDone: taskStatus} : t);
        // tasks[todolistId] = newTodolistTasks;
        // setTasks({...tasks})
        //
        // const newTodolistTasks = {
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        // };
        // setTasks(newTodolistTasks);
        //
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        })
    }
    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)
        delete tasks[todolistId];
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {
            id: todolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t=>t.id === taskId ? {...t, title}: t),
        }
        setTasks(newTodolistTasks)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>

            {todolists.map(tl => {
                const allTodolistTasks = tasks[tl.id]
                let taskForTodolist = allTodolistTasks
                if (tl.filter === 'active') {
                    taskForTodolist = allTodolistTasks.filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    taskForTodolist = allTodolistTasks.filter(t => t.isDone)
                }
                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={taskForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                    />
                )
            })}

        </div>
    );
}

export default App;
