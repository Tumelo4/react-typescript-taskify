import React from 'react'
import { Todo } from './TodoInterface';

/**
SingleTodoProps defines the properties that the SingleTodo component needs in order to function properly.
@property {number} index - The index of the todo item in the parent array.
@property {Todo} todo - The todo item object.
@property {Todo[]} todos - The array of todo items.
@property {React.Dispatch<React.SetStateAction<Todo[]>>} setTodos - A function that updates the parent array of todo items.
*/
export interface SingleTodoProps {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}