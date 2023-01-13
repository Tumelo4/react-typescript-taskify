import React from 'react'
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { TodoListProps } from '../interfaces/TodoListProps';
import SingleTodo from './SingleTodo';

// The component `TodoList` renders twi `Droppable` components
// one for active todo items and one for the completed todo items
// Each `Drappable` component wraps a `div` element that will act as a container for the to-do items
const TodoList: React.FC<TodoListProps> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    <div className="container">
      {/* The `Drappable` component receives a `droppavledId` prop,
          which is used to identify the droppable area, and a callback function that 
          receives `provided` and `snapshot` objects
      */}
      <Droppable droppableId='TodoList'>
        {
          (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}

              // Used to link the container `div` with the `Droppable` component
              ref={provided.innerRef}
            
              // Used to apply the necessary props for the container `div` to be droppable
              {...provided.droppableProps}
            >
              {/* span element that renders the heading 'Active Tasks' */}
              <span className="todos__heading">
                Active Tasks
              </span>
              {
                // Map function that iterates over the `todos` array
                // Pass prop and for each todo item, it renders a `SingleTodo` component
                // The `SingleTodo` component receives several props suck as the `index`,`todo`,
                // `todos`, and `setTodos` props, which are used to update the state of the todo items
                todos?.map((todo, index) =>
                {
                  return <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                  />
                })    
              }
              {/* Used to render a placeholder element when an item is being dragged */}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>

      <Droppable droppableId='TodoRemove'>
        {
          (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {/* span element that renders the heading 'Completed Tasks' */}
              <span className="todos__heading">
                Completed Tasks
              </span>
              {
                // Map function that iterates over the `completedTodos` array
                completedTodos?.map((todo, index) =>
                {
                  return <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}
                  />
                })    
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
}

export default TodoList