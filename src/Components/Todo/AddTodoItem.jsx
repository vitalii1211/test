import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import api from "../../Services/api";
import AuthService from "../../Services/auth.service";

function AddTodoItem(props) {

    // передачу строки из поля ввода реализовал по-разному здесь и в AddTaskItem.
    // здесь - передача по нажатию кнопки, в AddTaskItem - по каждому символу.
    // Здесь я не знаю как очистить поле, там - знаю

    const [newInputItem, setNewInputItem] = useState("")
    const currentUser = AuthService.getCurrentUser();


    const OnAddTodoItem = async () => {
        let newTodoItem = {
            id: null,
            name: newInputItem,
            author: currentUser.result[0].id,
        }
        try {
            await api.post("http://localhost:8800/todo", newTodoItem)
                .then(function (response) {
                    newTodoItem.id = response.data
                    props.setTodoList([...props.todoList, newTodoItem])
                })
        } catch (err) {
            console.log(err)
        }
        setNewInputItem("")
    }

    return (
        <>
            <TextField
                sx={{ mt: 3, mr: 2 }}
                size="small"
                label="Добавить новый лист"
                value={newInputItem}
                onChange={(e) => setNewInputItem(e.target.value)}
            />

            <Button sx={{ mr: 2 }} variant="contained" size="small" onClick={OnAddTodoItem}>Добавить</Button>
        </>);
}

export default AddTodoItem;