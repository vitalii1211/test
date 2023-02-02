import React from 'react';
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';

function DeleteTodoItem(props) {
    const OnDeleteTodoItem = async (id) => {
        const updatedTodoList = props.todoList.filter((todoItem) => todoItem.id !== id)
        props.setTodoList(updatedTodoList)
        try {
            await axios.delete("http://localhost:8800/todo/" + id)
        } catch (err) {
            console.log(err)
        }

        // обновляем на фронте
        // надо еще сделать проверку, есть ли такси вложенные, и если есть, то выводить алерт
        // вот только таски подсасываются из БД ниже, и todoList ничего не знает о taskList. получается, это неправильно?
        // нужно все данные всасывать на верхнмем уровне и прокидывать пропсами?
        //     использовать useContext для task?

    }

    return (
        <button
            onClick={(e) => OnDeleteTodoItem(props.todoItem.id)}>X</button>
    );
}

export default DeleteTodoItem;