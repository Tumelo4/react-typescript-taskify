import React from 'react'

/**
InputFieldProps defines the properties that the InputField component needs in order to function properly.
@property {string} todo - The current value of the input field.
@property {React.Dispatch<React.SetStateAction<string>>} setTodo - A function that updates the value of the input field.
@property {(e: React.FormEvent) => void} handleAdd - A callback function that is triggered when the form is submitted. It is responsible for handling the addition of new todo items.
*/

export interface InputFieldProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void
}