import React from 'react';
import axios from "axios";
import todoList from "./TodoList";
import taskList from "../Task/TaskList";

function DeleteTodoItem(props) {
    const OnDeleteTodoItem = async (todoItemClicked) => {

        try {
            await axios.delete("http://localhost:8800/deleteTodoItem/" + todoItemClicked.id)
        } catch (err) {
            console.log(err)
        }
        // обновляем на фронте
        // надо еще сделать проверку, есть ли такси вложенные, и если есть, то выводить алерт
        // вот только таски подсасываются из БД ниже, и todoList ничего не знает о taskList. получается, это неправильно?
        // нужно все данные всасывать на верхнмем уровне и прокидывать пропсами?


        // const hasNestedTask = taskList.length > 0

        const deletedItem = props.todoList.filter((i) => i.id !== todoItemClicked.id)
        props.setTodoList(deletedItem)
    }

    return (
        <button onClick={() => OnDeleteTodoItem(props.todoItem)}>X</button>
    );
}

export default DeleteTodoItem;