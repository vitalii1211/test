import React from 'react';
import '../../App.css';
import AddTodoItem from "./AddTodoItem";
import TodoList from "./TodoList";

function TodoContainer() {

    return (
        <div>
            <AddTodoItem/>
            <TodoList/>
        </div>
    )
}

export default TodoContainer;
