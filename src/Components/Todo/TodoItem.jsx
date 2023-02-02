import React, {useState} from "react";
import DeleteTodoItem from "./DeleteTodoItem";
import TaskContainer from "../Task/TaskContainer";
import axios from "axios";
import {Card, CardContent, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

export function TodoItem(props) {
    const [editState, setEditState] = useState(false)
    const [inputValue, setInputValue] = useState(props.todoItem.name)

    const OnClickChangeEditState = () => {
        if (props.editMode)
            setEditState(!editState)
    }

    const OnClickCancelEdit = () => {
        setEditState(!editState)
        setInputValue(props.todoItem.name)
    }

    const OnClickSaveUpdatedTitle = async (id) => {
        const updatedTodoList = props.todoList.map(todoItem => todoItem.id === id
            ? {...todoItem, name: inputValue}
            : todoItem
        )
        props.setTodoList(updatedTodoList)
        setEditState(!editState)
        const updatedTodoItem = updatedTodoList.filter(todoItem => todoItem.id === id)
        try {
            await axios.put("http://localhost:8800/todo/" + id, {name: updatedTodoItem[0].name})
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Paper elevation={10}>
            <CardContent>
                <Typography
                    variant="h4"
                    onDoubleClick={OnClickChangeEditState}
                    onBlur={() => OnClickSaveUpdatedTitle(props.todoItem)}
                >
                    {!editState
                        ?
                        <>
                            {props.title}
                            {props.editMode &&
                                    <DeleteTodoItem
                                        todoItem={props.todoItem}
                                        todoList={props.todoList}
                                        setTodoList={props.setTodoList}
                                    />
                            }
                        </>
                        :
                        <>
                            <input type="text"
                                   autoFocus={true}
                                   value={inputValue}
                                   onChange={(e) => setInputValue(e.target.value)}
                                   onKeyDown={(e) => {
                                       if (e.keyCode === 13) {
                                           OnClickSaveUpdatedTitle(props.todoItem.id);
                                       } else if (e.keyCode === 27) {
                                           OnClickCancelEdit()
                                       }
                                   }}
                            />
                        </>
                    }
                </Typography>
                <TaskContainer
                    todoItem={props.todoItem}
                    editMode={props.editMode}
                    searchItem={props.searchItem}
                    setSearchItem={props.setSearchItem}

                />
            </CardContent>
        </Paper>
    )
}