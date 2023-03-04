import React, {useContext, useState} from "react";
import TodoItemContent from "./TodoItemContent";
import TaskContainer from "../Task/TaskContainer";
import {CardContent, Paper} from "@mui/material";
import api from "../../Services/api";
import {AppDataContext} from "../Context/DataContext";
import {useSortable} from '@dnd-kit/sortable';
// import {Item} from './Item';
import {CSS} from '@dnd-kit/utilities';


export function TodoItem({ title, todoItem, editMode, searchItem }) {
    const data = useContext(AppDataContext)
    const [editState, setEditState] = useState(false)
    const [inputValue, setInputValue] = useState(todoItem.name)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable(
        {
            id: todoItem,
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

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

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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