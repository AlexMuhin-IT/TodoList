import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "../todolist-reducer";
import {TodolistType} from "../../ui/Todolists/Todolists";

let startState: TodolistType[] = []
let todolistId1: string
let todolistId2: string

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})


test('correct todolists should be added', () => {


    const newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
})
test('correct todolists should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    // expect(endState[1].id).toBe(todolistId2);
})
test('correct todolists should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistId: todolistId2, title: newTodolistTitle}));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
})
test('correct filter of todolists should be change', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const newFilter = 'completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed');
})