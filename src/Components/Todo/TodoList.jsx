import React, {useEffect, useState} from 'react';
import {TodoItem} from "./TodoItem";
import axios from "axios";


function TodoList() {
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        const fetchTodoData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/todoData")
                setTodoList(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchTodoData()
    }, [])

    return (
        <div className="App">
            {todoList.map(todoItem =>
                <TodoItem key={todoItem.id}
                          title={todoItem.name}
                          todoItem={todoItem}
                />)}

        </div>
    );
}

export default TodoList;