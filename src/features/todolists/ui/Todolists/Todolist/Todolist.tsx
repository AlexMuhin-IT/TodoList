import {FilterValuesType, TaskType, TodolistType} from "../Todolists";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import s from "./TodolistTitle/TodolistTitle.module.css"
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";

type TodolistPropsType = {
    todolist: TodolistType
    addTask: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             todolist,
                             addTask,
                         }: TodolistPropsType) => {

    const addTaskCallback = (title: string) => {
        addTask(todolist.id, title)
    }

    return (
        <div className={s.wrapper}>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
};

