import React, { useEffect, useRef, useState } from 'react'
import { SingleTodoProps } from '../interfaces/SingleTodoProps';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { Draggable, DraggableProvided, DraggableRubric, DraggableStateSnapshot } from 'react-beautiful-dnd';

const SingleTodo: React.FC<SingleTodoProps> = ({ index, todo, todos, setTodos }) => {

    // useState hook for managing the component's state
    // edit state is used to toggle the edit mode of the component
    const [edit, setEdit] = useState<boolean>(() => false);
    // editTodo state is used to store the current value of the input element while in edit mode
    const [editTodo, setEditTodo] = useState<string>(() => todo.todo);
    // useRef hook to create a reference to the input element
    const inputRef = useRef<HTMLInputElement>(null);

    // Apply this side effect whenever edit state changes
    // useEffect hook to focus on the input element when the component is in edit mode
    useEffect(() => {
        inputRef.current?.focus()
    }, [edit]);

    // An arrow function to toggle the isDone state of the todo item
    // It maps over the todos list and update the todo item with the provided id
    const handleDone = (id: number) => {
        setTodos(todos.map((todoId) => todoId.id !== id ? todoId : { ...todoId, isDone: !todoId.isDone }));
    }

    // An arrow function to delete the todo item
    // It filters over the todos list and remove the todo item with the provided id
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todoId) => todoId.id !== id));
    }

    // An arrow function to edit the todo item
    // It maps over the todos list and update the todo item with the provided it
    // It also update the editTodo state and sets the edit state to false
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todoId) => todoId.id === id ? { ...todoId, todo: editTodo } : todoId));
        setEdit(false);
    }

    // Renders a form element that contains the todo text and group of icons for completing, editing, and deleting the todo item
    // The form element has a className 'todos__single' and it's wrapped by `Draggable` component, which makes the form element draggable
    // The form element has an `onSubmit' event that triggers the 'handleEdit' function when the form is submitted
    // It also receives the `draggableProps` and `dragHandleProps` from the `Draggable` component
    // Necessary for making the form element draggable
    // The form element also has a `ref` that's set to the `provided.innerRef` from the `Draggable` component
    // Necessary for linking the form element with `Draggable` component

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) =>
                    (
                    <form className="todos__single"
                        onSubmit={(e) => handleEdit(e, todo.id)}
                    
                        //making the form element draggable
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        
                        // Link the form element with Draggable component
                        ref = {provided.innerRef}
                    >
                        {/* Ternary operator that checks the value of the edit state */}
                        {
                            edit
                                ?
                                (
                                    // If the edit state is true, it renders an input element
                                    // with the value of the editTodo state and an onChange event that
                                    // triggers the setEditTodo function
                                    <input
                                        ref = {inputRef}
                                        value = {editTodo}
                                        onChange = {(e) => setEditTodo(e.target.value)}
                                        className = "todos__single--text"
                                    />
                                )
                                :
                                (
                                    // If edit state is false, it renders a span or s element based on the isDone state of the todo item
                                    todo.isDone
                                    ?
                                    (<s className="todos__single--text">{todo.todo}</s>)
                                    :
                                    (<span className="todos__single--text">{todo.todo}</span>)
                                )
                        }            

                        <div>
                            <span className="icons" onClick={() => {
                                if (!edit && !todo.isDone)
                                    setEdit(!edit);
                                }}
                            >
                            {/* Icon for editing the todo item */}
                            <AiFillEdit/>
                            </span>
                            {/* Icon for deleteing the todo item */}
                            <span className="icons" onClick={() => handleDelete(todo.id)}>
                                <AiFillDelete/>
                            </span>
                            {/* Icon for completing the todo item */}
                            <span className="icons" onClick={() => handleDone(todo.id)}>
                                <MdDone/>
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodo