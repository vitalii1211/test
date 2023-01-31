import React, {useEffect, useState} from 'react';
import '../../App.css';
import AddTodoItem from "./AddTodoItem";
import TodoList from "./TodoList";


function TodoContainer({ API_URL }) {

    return (
        <div>
            <TodoList
                API_URL={API_URL}
            />
        </div>
    )
}

export default TodoContainer;
