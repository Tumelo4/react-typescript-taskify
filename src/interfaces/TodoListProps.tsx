import React from 'react'
import { Todo } from './TodoInterface'

/**

TodoListProps defines the properties that the TodoList component needs in order to function properly.
@property {Todo[]} todos - The array of active todo items.
@property {React.Dispatch<React.SetStateAction<Todo[]>>} setTodos - A function that updates the active todo items array.
@property {Todo[]} completedTodos - The array of completed todo items.
@property {React.Dispatch<React.SetStateAction<Todo[]>>} setCompletedTodos - A function that updates the completed todo items array.
*/
export interface TodoListProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}