/**
Todo defines the shape of a todo item object.
@property {number} id - A unique identifier for the todo item.
@property {string} todo - The text content of the todo item.
@property {boolean} isDone - A flag to indicate if the todo item has been completed.
*/
export interface Todo {
    id: number;
    todo: string;
    isDone: boolean
}