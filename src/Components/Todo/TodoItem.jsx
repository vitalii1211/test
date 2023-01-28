import React, {useState} from "react";
import DeleteTodoItem from "./DeleteTodoItem";
import TaskContainer from "../Task/TaskContainer";
import axios from "axios";
import {Card, CardContent, Paper} from "@mui/material";

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

    const OnClickSaveUpdatedTitle = async (taskItemClicked) => {

        taskItemClicked.name = inputValue
        try {
            await axios.put("http://localhost:8800/editTodoItem/" + taskItemClicked.id, taskItemClicked)
        } catch (err) {
            console.log(err)
        }
        props.setTodoList([...props.todoList])
        setEditState(!editState)
    }


    return (
        <Paper elevation={10}>
            <CardContent>
            <h3
                onDoubleClick={OnClickChangeEditState}
                onBlur={() => OnClickSaveUpdatedTitle(props.todoItem)}
            >
                {!editState
                    ?
                    <>
                        {props.title}
                        {props.editMode &&
                            <>
                                <DeleteTodoItem
                                    todoItem={props.todoItem}
                                    todoList={props.todoList}
                                    setTodoList={props.setTodoList}
                                />
                            </>}
                    </>
                    :
                    <>
                        <input type="text"
                               autoFocus={true}
                               value={inputValue}
                               onChange={(e) => setInputValue(e.target.value)}
                               onKeyDown={(e) => {
                                   if (e.keyCode === 13) {
                                       OnClickSaveUpdatedTitle(props.todoItem);
                                   } else if (e.keyCode === 27) {
                                       OnClickCancelEdit()
                                   }
                               }}
                        />
                    </>
                }
            </h3>
            <TaskContainer
                todoItem={props.todoItem}
                editMode={props.editMode}

            />
                </CardContent>
        </Paper>
    )
}