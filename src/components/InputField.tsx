import React, { useRef } from 'react';
import { InputFieldProps } from '../interfaces/InputFieldProps';
import './styles.css';

const InputField: React.FC<InputFieldProps> = ({ todo, setTodo, handleAdd }) => {

    // Create a ref for input element using the useRef hook
    // This will be used to blur the input field after form submission
    // useRef will be used to create a reference to the input element so that it can be accessed in other parts of the component
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Define an arrow function to handle form submission
    // This function calls the handleAdd method passed from the parent component
    // And blurs the input field
    // This function is used as an event handler for onSubmit event of the form element
    const remove_shadow_state = (e: React.FormEvent) => {
        handleAdd(e);
        inputRef.current?.blur();
    }

    // Render the input field and submit button wrapped in a form element
    // On form submission, call the handleFormSubmit function
    // form element has a className 'input' and onSubmit event is attached to handleFormSubmit function
    // which will prevent the default behaviour of the form and call the handleAdd function passed from the parent component

    return (
        <form className='input' onSubmit={(e) => remove_shadow_state(e)}>
            <input
                // assign the ref to the input element
                ref = {inputRef}
                type="input"
                // update the todo text when the input value changes
                // onChange event is attached to the input element which will call the seTodo function passed from parent component
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder='Enter a task'
                className="input__box"
            />
            <button
                className="input__submit"
                type='submit'
            >
                Go
            </button>
        </form>
  )
}

export default InputField
