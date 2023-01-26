import React, {useEffect, useState} from 'react';
import '../../App.css';
import AddTodoItem from "./AddTodoItem";
import TodoList from "./TodoList";
import axios from "axios";

function TodoContainer() {
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
        <div>
            <AddTodoItem
                todoList={todoList}
                setTodoList={setTodoList}
            />
            <TodoList
                todoList={todoList}
                setTodoList={setTodoList}
            />
        </div>
    )
}

export default TodoContainer;
