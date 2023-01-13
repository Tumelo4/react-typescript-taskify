import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './interfaces/TodoInterface';

// The main component of the application
// It uses the `useState` hook to manage the state of thentodo items, the input field, and completed todo items


const App: React.FC = () => {

  // State to hold the value of the input field
  const [todo, setTodo] = useState<string>(() => "");

  // State to hold the list of active todo items
  const [todos, setTodos] = useState<Todo[]>(() => []);

  // State to hold the list of completed todo items
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // An arrow function to handle the form submisssion and adding new todo items
  const handleAdd = (e: React.FormEvent) => {

    // It prevent the default form submission behavior
    e.preventDefault();
    if (todo) {

      // Add new todo item to the state
      // omitted todo and colon by taking advantage of Property value shorthand syntax
      setTodos((prevValue) => [...prevValue, { id: Date.now(), todo, isDone: false }]);
      
      // Clear the input field
      setTodo(() => "");
    }
  }

  // An arrow function to handle the end of a drag event 
  const onDragEnd = (result: DropResult) => {
    
    // Destructuring the source and destination of the dragged item
    const { source, destination } = result;

    // If there is no destination,return
    if (!destination)
      return;
    
    // If source and destination are the same, return
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    
    // Local variables to hold the state of active and completed todo items
    let add, active = todos, complete = completedTodos;

    // MOve item from the source to the destination
    // Check if the item was dragged from the active todo list
    if (source.droppableId === 'TodoList') {
      add = active[source.index];
      active.splice(source.index, 1);
    }

    // Check if the item was dragged from completd todo list
    else {
      
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Check if destination droppableId is `TodoList`
    if (destination.droppableId === 'TodoList') {
      active.splice(destination.index, 0, add);
    }

    // Check if destination droppableId is `TodoRemove`
    else {
      complete.splice(destination.index, 0, add);
    }
    
    // update the state of todo items
    setCompletedTodos(complete);
    setTodos(active);
  }

  // Renders an `InputField` component that allows the user to add new todo items
  // ,and a `TodoList` component that renders the active and completed todo items

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField
          todo = {todo}
          setTodo = {setTodo}
          handleAdd = {handleAdd}
        />
        <TodoList
          todos = {todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos = {setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
