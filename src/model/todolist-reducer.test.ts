import {TodolistType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistAC,
    ChangeTodolistFilterAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolist-reducer";


test('correct todolist should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let todoId = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, AddTodolistAC(todoId, newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})
test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    // expect(endState[1].id).toBe(todolistId2);
})
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, ChangeTodolistAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
})
test('correct filter of todolist should be change', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, 'completed'));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed');
})