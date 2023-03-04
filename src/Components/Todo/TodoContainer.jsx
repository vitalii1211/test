import React, {useEffect, useState, useContext} from 'react';
import '../../App.css';
import Header from "../Header/Header";
import Grid from "@mui/material/Grid";
import UserService from "../../Services/user.service";
import {AppDataContext} from "../Context/DataContext";
import api from "../../Services/api";
import TodoList from "./TodoList";

function TodoContainer({API_URL}) {
    const data = useContext(AppDataContext)
    const [editMode, setEditMode] = useState(false)
    const [searchItem, setSearchItem] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [sortType, setSortType] = useState("")

    useEffect(() => {
        UserService.getUserList()
            .then(response => {
                    data.setUserList(response.data)
                    const findCurrentUser = response.data.find(a => a.id === data.currentUser.id)
                    setSortType(findCurrentUser.sort_type)
                    if (findCurrentUser.selectedUsers) {
                        const selectedUsersOfCurrentUser = JSON.parse(findCurrentUser.selectedUsers)
                        setSelectedUsers(selectedUsersOfCurrentUser)
                    } else { // если массива нет - например, null у нового пользователя
                        setSelectedUsers([])
                    }
                },
                (error) => {
                    console.log(error)
                });
    }, []);

    function SwitchEditMode() {
        setEditMode(!editMode)
    }

    // блок скрытия карточке по поиску
    const foundInTodo = data.todoList
        .filter(item => item.name.toLowerCase().includes(searchItem.toLowerCase()))
        .map(item => item.id)
    const foundInTask = data.taskList
        .filter(item => item.title.toLowerCase().includes(searchItem.toLowerCase()))
        .map(item => item.todo_id)
    const foundEverywhere = foundInTodo.concat(foundInTask)
    const foundEverywhereUnique = foundEverywhere.reduce((acc, value) => {
        if (!acc.includes(value)) {
            acc.push(value)
        }
        return acc
    }, [])
    const todoListAfterSearch = data.todoList.filter(item => foundEverywhereUnique.includes(item.id))

    const orderedUserList = selectedUsers.map((id) =>
        data.userList.find((user) => user.id === id)
    );

    const sorted10 = [...orderedUserList].sort(
        ((a, b) => {
            const nameA = a.last_name.toLowerCase(), nameB = b.last_name.toLowerCase();
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        })
    )
    const withoutCurrentUser = [...sorted10].filter(item => item.id !== data.currentUser.id)
    const sorted20 = [data.currentUser].concat(withoutCurrentUser)
    const sorted30 = orderedUserList
    const sorted40 = data.userList.sort((a, b) => {
        const todoA = a.position, todoB = b.position
        if (todoA < todoB) //сортируем строки по возрастанию
            return -1
        if (todoA > todoB)
            return 1
        return 0 // Никакой сортировки
    })

    // const updateUser = (id, customOrder) => {
    //     api.put('/updateUser/' + id, {position: customOrder})
    //         .then(response => {
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };
    //
    // function dropHandler(e, user2) {
    //     e.preventDefault()
    //     e.target.style.background = 'white'
    //     data.setUserList(data.userList.map(user => {
    //         if (user.id === user1.id) {
    //             updateUser(user1.id, user2.position);
    //             return {...user, position: user2.position}
    //         }
    //         if (user.id === user2.id) {
    //             updateUser(user2.id, user1.position);
    //             return {...user, position: user1.position}
    //         }
    //         return user
    //     }))
    // }



    let finalList;
    if (sortType === "10") {
        finalList = sorted10;
    } else if (sortType === "20") {
        finalList = sorted20;
    } else if (sortType === "30") {
        finalList = sorted30;
    } else if (sortType === "40") {
        finalList = sorted40;
    }



    return (
        <div>
            <Header
                editMode={editMode}
                SwitchEditMode={SwitchEditMode}
                searchItem={searchItem}
                setSearchItem={setSearchItem}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                sortType={sortType}
                setSortType={setSortType}
            />

            <Grid container spacing={2} columns={16} style={{paddingInline: '30px'}}>
                {finalList &&
                    finalList
                    .filter(user => selectedUsers.includes(user.id))
                    .map(user =>
                        <Grid item xs={4} key={user.id}>
                            <h1 align="center">
                                {user.first_name + " " + user.last_name}
                            </h1>
                            {
                                <TodoList
                                    todoListAfterSearch={todoListAfterSearch}
                                    user={user}
                                    editMode={editMode}
                                    searchItem={searchItem}
                                    sortType={sortType}
                                />}
                        </Grid>)
                }
            </Grid>
        </div>
    )
}

export default TodoContainer;
