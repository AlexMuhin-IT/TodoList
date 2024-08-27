import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";


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
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
            />

            {/*<Todolist title={'Вторая хрень'} tasks={tasks2} />*/}
            {/*<Todolist title={'Третья хрень'}/>*/}
        </div>
    );
}

export default App;
