import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";

function AddTodoItem(props) {

    // передачу строки из поля ввода реализовал по-разному здесь и в AddTaskItem.
    // здесь - передача по нажатию кнопки, в AddTaskItem - по каждому символу.
    // Здесь я не знаю как очистить поле, там - знаю

    const [newInputItem, setNewInputItem] = useState("")

    const OnAddTodoItem = async () => {
        let newTodoItem = {
            id: null,
            name: newInputItem
        }
        console.log("name", newTodoItem)

        try {
            await axios.post("http://localhost:8800/todo", newTodoItem)
                .then(function (response) {
                    newTodoItem.id = response.data
                    console.log("newInputItem", newTodoItem.id)
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
                sx={{ mt: 3, mr: 2}}
                size="small"
                label="Добавить новый лист"
                value={newInputItem}
                onChange={(e) => setNewInputItem(e.target.value)}
            />

            <Button variant="contained" size="small" onClick={OnAddTodoItem}>Добавить</Button>
        </>);
}

export default AddTodoItem;