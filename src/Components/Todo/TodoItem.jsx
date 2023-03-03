import React, {useContext, useState} from "react";
import TodoItemContent from "./TodoItemContent";
import TaskContainer from "../Task/TaskContainer";
import {CardContent, Paper} from "@mui/material";
import api from "../../Services/api";
import {AppDataContext} from "../Context/DataContext";

export function TodoItem({ title, todoItem, editMode, searchItem, todo1, setTodo1, user, dragOverHandler, todolistFinal }) {
    const data = useContext(AppDataContext)
    const [editState, setEditState] = useState(false)
    const [inputValue, setInputValue] = useState(todoItem.name)

    const OnClickChangeEditState = () => {
        if (editMode)
            setEditState(!editState)
    }

    const OnClickCancelEdit = () => {
        setEditState(!editState)
        setInputValue(todoItem.name)
    }

    const OnClickSaveUpdatedTitle = async (id) => {
        const updatedTodoList = data.todoList.map(todoItem => todoItem.id === id
            ? {...todoItem, name: inputValue}
            : todoItem
        )
        data.setTodoList(updatedTodoList)
        setEditState(!editState)
        const updatedTodoItem = updatedTodoList.filter(todoItem => todoItem.id === id)
        if (updatedTodoItem.length) { // когда сохранили без изменений, объекта нет, нечего отправлять в БД
            try {
                await api.put("http://localhost:8800/todo/" + id, {name: updatedTodoItem[0].name})
            } catch (err) {
                console.log(err)
            }
        }
    }

    function dragStartHandler(todo) {
        setTodo1(todo)
        console.log("todo1_source", todo1)
    }

    const updateTodo = (id, position, author = null) => {
        let data = { position };
        if (author !== null) {
            data.author = author;
        }
        api.put('/todo/' + id, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    console.log(data.todoList)
    function dropHandler(e, todo2) {
        e.preventDefault();
        e.target.style.background = "white";

        if (todo1.author === todo2.author) {
            console.log("ДА")
            const updatedTodo = [...data.todoList].map((todo) => {
                if (todo.id === todo1.id) {
                    updateTodo(todo.id, todo2.position)
                    return {...todo, position: todo2.position};
                }
                if (todo.id === todo2.id) {
                    updateTodo(todo.id, todo1.position)
                    return {...todo, position: todo1.position};
                }
                return todo;
            })
            data.setTodoList(updatedTodo)
        }
        if (todo1.author !== todo2.author) {
            console.log("НЕТ")
            const updatedTodo = data.todoList.map((todo) => {
                if (todo.id === todo1.id) {
                    updateTodo(todo.id, todo2.position, todo2.author)
                    return {...todo, author: todo2.author, position: todo2.position};
                }
                if (todo.position >= todo2.position) {
                    updateTodo(todo.id, todo.position + 1)
                    return {...todo, position: todo.position + 1};
                }
                return todo;
            })
            data.setTodoList(updatedTodo)
        }
    }

    return (
        <div
            draggable
            onDragStart={e => dragStartHandler(todoItem, user)}
            onDragLeave={e => e.target.style.background = 'white'}
            onDragEnd={e => e.target.style.background = 'white'}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e, todoItem)}
        >
            <Paper elevation={10} style={{marginBottom: '20px'}}>
                <CardContent>
                    <TodoItemContent
                        OnClickChangeEditState={OnClickChangeEditState}
                        OnClickSaveUpdatedTitle={OnClickSaveUpdatedTitle}
                        todoItem={todoItem}
                        editState={editState}
                        title={title}
                        editMode={editMode}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        OnClickCancelEdit={OnClickCancelEdit}
                    />
                    <TaskContainer
                        todoItem={todoItem}
                        editMode={editMode}
                        searchItem={searchItem}
                    />
                </CardContent>
            </Paper>
        </div>
    )
}