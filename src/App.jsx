import React from 'react';
import './App.css';
import AddTodoItem from "./Components/Todo/AddTodoItem";
import TodoList from "./Components/Todo/TodoList";

function App() {
    return (
        <div>
            <AddTodoItem/>
            <TodoList/>
        </div>
    )
}

export default App;
