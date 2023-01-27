import React, {useEffect, useState} from 'react';
import '../../App.css';
import AddTodoItem from "./AddTodoItem";
import TodoList from "./TodoList";
import axios from "axios";

function TodoContainer(props) {
    const [todoList, setTodoList] = useState([])
    const [editMode, setEditMode] = useState(false)

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

    function SwitchEditMode() {
        setEditMode(!editMode)
    }

    return (
        <div>
            <button onClick={SwitchEditMode}>
                {editMode ?
                    "Чтение"
                    : "Управление"
                }
            </button>

            {editMode &&
                <AddTodoItem
                    todoList={todoList}
                    setTodoList={setTodoList}
                    editMode={editMode}
                />
            }

            <TodoList
                todoList={todoList}
                setTodoList={setTodoList}
                editMode={editMode}

            />
        </div>
    )
}

export default TodoContainer;
