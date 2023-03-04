import React, {useEffect, useState, useContext} from 'react';
import '../../App.css';
import Header from "../Header/Header";
import Grid from "@mui/material/Grid";
import UserService from "../../Services/user.service";
import {AppDataContext} from "../Context/DataContext";
import api from "../../Services/api";
import BoardItem from "./BoardItem";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    MouseSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

function BoardList({API_URL}) {
    const data = useContext(AppDataContext)
    const [editMode, setEditMode] = useState(false)
    const [searchItem, setSearchItem] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [sortType, setSortType] = useState("")

    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        }),
    );

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
    }

    function handleDragStart(event) {
        const {active} = event;
        setActiveId(active.id);
    }

    function handleDragEnd(event) {
        const {active, over} = event;
        if (active.id !== over.id) {
            const currentUser = data.userList.find(user => user.id === data.currentUser.id)
            const isArray = Array.isArray(currentUser.selectedUsers)
            if (!isArray) {
                currentUser.selectedUsers = JSON.parse(currentUser.selectedUsers)
            }
            const index1 = currentUser.selectedUsers.indexOf(active.id.id)
            const index2 = currentUser.selectedUsers.indexOf(over.id.id)
            currentUser.selectedUsers[index2] = active.id.id
            currentUser.selectedUsers[index1] = over.id.id
            setSelectedUsers(currentUser.selectedUsers)
        }
        setActiveId(null);
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
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={data.todoList}
                    strategy={horizontalListSortingStrategy}
                >
                    <Grid container spacing={2} columns={16} style={{paddingInline: '30px'}}>
                        {finalList &&
                            finalList
                                .filter(user => selectedUsers.includes(user.id))
                                .map(user =>
                                    <BoardItem
                                        key={user.id}
                                        user={user}
                                        todoListAfterSearch={todoListAfterSearch}
                                        editMode={editMode}
                                        searchItem={searchItem}
                                        sortType={sortType}
                                        activeId={activeId}
                                    />
                                )
                        }
                    </Grid>
                </SortableContext>
                <DragOverlay>
                    {activeId ? <BoardItem
                        user={activeId}
                        todoListAfterSearch={todoListAfterSearch}
                        editMode={editMode}
                        searchItem={searchItem}
                        sortType={sortType}
                        isDragging={true}
                    /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}

export default BoardList;
