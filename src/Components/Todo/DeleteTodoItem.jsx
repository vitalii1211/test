import React from 'react';
import axios from "axios";
import api from "../../Services/api";

function DeleteTodoItem(props) {
    const OnDeleteTodoItem = async (id) => {
        const taskListOfTodo = props.taskList.filter(el => el.todo_id === props.todoItem.id)
        if (taskListOfTodo.length > 0) {
            console.log("Нельзя удалить, т.к. есть задачи")
        } else {
        const updatedTodoList = props.todoList.filter((todoItem) => todoItem.id !== id)
        props.setTodoList(updatedTodoList)
        try {
            await api.delete("http://localhost:8800/todo/" + id)
        } catch (err) {
            console.log(err)
        }
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