import React from 'react';
import axios from "axios";

function DeleteTodoItem(props) {
    const OnDeleteTodoItem = async (id) => {
        try {
            await axios.delete("http://localhost:8800/data/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <button onClick={() => OnDeleteTodoItem(props.todoItem.id)}>X</button>
    );
}

export default DeleteTodoItem;