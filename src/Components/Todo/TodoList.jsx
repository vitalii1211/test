import React, {useEffect, useState} from 'react';
import {TodoItem} from "./TodoItem";
import {Switch} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddTodoItem from "./AddTodoItem";
import Search from "../Search";
import { useNavigate } from "react-router-dom";

import UserService from "../../Services/user.service";
import AuthService from "../../Services/auth.service";

function TodoList(props) {
    const [todoList, setTodoList] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [searchItem, setSearchItem] = useState("")
    const currentUser = AuthService.getCurrentUser();
    const navigate = useNavigate()

    useEffect(() => {
        UserService.getTodoList().then(
            (response) => {
                setTodoList(response.data);
            },
        (error) => {
            console.log(error)
        }
        );
    }, []);

    function SwitchEditMode() {
        setEditMode(!editMode)
    }

    const logout = () => {
        AuthService.logout()
        navigate("/login")
    }

    return (
            <>
                <FormControlLabel sx={{m: 3}} onClick={SwitchEditMode} control={<Switch/>} label={ editMode ?
                        "Редактирование"
                        : "Чтение"
                }/>
                <Search
                    searchItem={searchItem}
                    setSearchItem={setSearchItem}
                />

                {editMode &&
                    <AddTodoItem
                        todoList={todoList}
                        setTodoList={setTodoList}
                        editMode={editMode}
                    />
                }

                <strong>Привет, {currentUser.result[0].first_name + " " + currentUser.result[0].last_name}!</strong>
                <button onClick={logout} >Logout</button>

                <div className="App">
                    {todoList.map((todoItem) =>
                        <TodoItem key={todoItem.id}
                                  title={todoItem.name}
                                  todoItem={todoItem}
                                  todoList={todoList}
                                  setTodoList={setTodoList}
                                  editMode={editMode}
                                  searchItem={searchItem}
                                  setSearchItem={setSearchItem}
                        />
                    )}
                </div>
            </>

    );
}

export default TodoList;