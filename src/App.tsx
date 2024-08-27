import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType =  'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<TaskType[]> ([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: true},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])
    // const tasks2: TaskType[] = []
    const [filter, setFilter] = useState<FilterValuesType> ('all')

    const changeFilter = (filterValues: FilterValuesType) => {
        setFilter(filterValues)
    }
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone )
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    const removeTask = (taskId: string) => {
       const filteredTasks = tasks.filter((t: TaskType) => {
            return t.id !== taskId
        })
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false,
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }


    return (
        <div className="App">
            <Todolist title={'New WHAT to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
            />

            {/*<Todolist title={'Вторая хрень'} tasks={tasks2} />*/}
            {/*<Todolist title={'Третья хрень'}/>*/}
        </div>
    );
}

export default App;
