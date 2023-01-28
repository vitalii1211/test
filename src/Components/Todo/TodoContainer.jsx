import React, {useEffect, useState} from 'react';
import '../../App.css';
import AddTodoItem from "./AddTodoItem";
import TodoList from "./TodoList";
import axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import {Switch} from "@mui/material";
import TextField from '@mui/material/TextField';



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
            <FormControlLabel sx={{ m: 3 }} onClick={SwitchEditMode} control={<Switch/>} label={
                editMode ?
                    "Редактирование"
                    : "Чтение"
            }
            />

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
