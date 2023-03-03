import React, {useContext, useEffect, useState} from 'react';
import {TodoItem} from "./TodoItem";
import {AppDataContext} from "../Context/DataContext";
import api from "../../Services/api";

function TodoList({todoListAfterSearch, user, editMode, searchItem, setSearchItem, todo1, setTodo1}) {
    const data = useContext(AppDataContext)

    const todoListOfUser = todoListAfterSearch
        .filter(todo => todo.author === user.id)
    const todolistFinal = [...todoListOfUser].sort((a, b) => {
        const numA = a.position, numB = b.position
        if (numA > numB) {
            return 1
        }
        if (numB > numA) {
            return -1
        }
    })

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = 'lightgrey'
    }

    function dropCardHandler(e, user) {
        e.preventDefault();
        e.target.style.background = "white";
        console.log("dropCardHandler")

        const updatedTodo = data.todoList.map((todo) => {
            if (todo.id === todo1.id) {
                if (!todolistFinal.length) {
                    // updateTodo(todo.id, todo2.position, todo2.author)
                    console.log("не было списка")
                    return {...todo, author: user.id, position: 1};
                }
                if (todolistFinal.length) {
                    console.log("был список")
                    // updateTodo(todo.id, todo2.position, todo2.author)
                    return {...todo, author: user.id, position: todolistFinal.length + 1};
                }
            }

            return todo;
        })
        data.setTodoList(updatedTodo)
        console.log("updatedTodo", updatedTodo)

    }

    return (
        <div
            style={{height: '100%'}}
            draggable
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={e => dropCardHandler(e, user)}
        >
            {todolistFinal
                .map((todoItem) => <TodoItem
                        key={todoItem.id}
                        todoItem={todoItem}
                        editMode={editMode}
                        searchItem={searchItem}
                        setSearchItem={setSearchItem}
                        todoListFinal={todoListOfUser}
                        todo1={todo1}
                        setTodo1={setTodo1}
                        user={user}
                        dragOverHandler={dragOverHandler}
                        todolistFinal={todolistFinal}
                    />
                )
            }
        </div>
    );
}

export default TodoList;