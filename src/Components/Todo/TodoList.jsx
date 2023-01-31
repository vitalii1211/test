import React, {useEffect, useState} from 'react';
import {TodoItem} from "./TodoItem";
import {Switch} from "@mui/material";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddTodoItem from "./AddTodoItem";
import {useAuth} from "../Auth/auth";
import {useNavigate} from "react-router-dom";


function TodoList(props) {
    const [todoList, setTodoList] = useState([])
    const [editMode, setEditMode] = useState(false)
    const API_URL=props.API_URL

    useEffect(() => {
        const fetchTodoData = async () => {
            try {
                const res = await axios.get(API_URL + "/todoData")
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
    const auth = useAuth()
    const navigate = useNavigate()
    //
    // console.log("auth.user", auth.user)
    // user сюда приходит, но после перезагрузки страницы пропадает
    // как здесь вызвать setUser?


    const HandleLogout = () => {
        auth.logout()
        navigate('/')
    }


    const userAuthenticated = () => {
        axios.get("http://localhost:8800/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response.data)

            })
    }

    const userLoggedIn = () => {
        axios.get("http://localhost:8800/login")
            .then(
                (response) => {
                    console.log("loggedIn", response.data.loggedIn)
                }
            )
    }




    return (
            <>
                <FormControlLabel sx={{m: 3}} onClick={SwitchEditMode} control={<Switch/>} label={
                    editMode ?
                        "Редактирование"
                        : "Чтение"
                }
                />
                Привет, {auth.user}!

                <button onClick={HandleLogout}>Logout</button>

                <>
                    <button onClick={userAuthenticated}>Check if Authenticated</button>
                    <button onClick={userLoggedIn}>Check if Logged in</button>
                </>

                {editMode &&
                    <AddTodoItem
                        todoList={todoList}
                        setTodoList={setTodoList}
                        editMode={editMode}
                    />
                }
                <div className="App">
                    {todoList.map((todoItem) =>
                        <TodoItem key={todoItem.id}
                                  title={todoItem.name}
                                  todoItem={todoItem}
                                  todoList={todoList}
                                  setTodoList={setTodoList}
                                  editMode={editMode}
                        />
                    )}
                </div>
            </>

    );
}

export default TodoList;