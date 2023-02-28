import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import {Switch} from "@mui/material";
import Search from "../Search";
import AddTodoItem from "./AddTodoItem";
import UserSelector from "./UserSelector";
import AuthService from "../../Services/auth.service";
import {useNavigate} from "react-router-dom";

function Header(props) {
    const navigate = useNavigate()
    const currentUser = AuthService.getCurrentUser();

    const logout = () => {
        AuthService.logout()
        navigate("/login")
    }

    return (
        <div>
            <FormControlLabel sx={{m: 3}} onClick={props.SwitchEditMode} control={<Switch/>} label={props.editMode ?
                "Редактирование"
                : "Чтение"
            }/>
            <Search
                searchItem={props.searchItem}
                setSearchItem={props.setSearchItem}
            />

            {props.editMode &&
                <AddTodoItem
                    todoList={props.todoList}
                    setTodoList={props.setTodoList}
                    editMode={props.editMode}
                />
            }

            <UserSelector
                userList={props.userList}
                selectedUsers={props.selectedUsers}
                setSelectedUsers={props.setSelectedUsers}
                currentUser={props.currentUser}
            />

            <strong style={{ paddingRight: "10px" }}>Привет, {currentUser.result[0].first_name + " " + currentUser.result[0].last_name}!</strong>
            <button onClick={logout}>Logout</button>

        </div>
    );
}

export default Header;