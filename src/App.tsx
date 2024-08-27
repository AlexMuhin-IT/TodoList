import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {useState} from "react";

function App() {

    const [tasks, setTasks] = useState<TaskType[]> ([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: true},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])
    // const tasks2: TaskType[] = []
    const removeTask = (taskId: number) => {
       const filteredTasks = tasks.filter((t: TaskType) => {
            return t.id !== taskId
        })
        setTasks(filteredTasks)
    }
    return (
        <div className="App">
            <Todolist title={'New WHAT to learn'}
                      tasks={tasks}
                      removeTask={removeTask}
            />

            {/*<Todolist title={'Вторая хрень'} tasks={tasks2} />*/}
            {/*<Todolist title={'Третья хрень'}/>*/}
        </div>
    );
}

export default App;
