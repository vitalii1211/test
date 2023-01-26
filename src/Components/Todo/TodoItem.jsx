import React, {useState} from "react";
import DeleteTodoItem from "./DeleteTodoItem";
import TaskContainer from "../Task/TaskContainer";
import axios from "axios";

export function TodoItem(props) {
    const [editState, setEditState] = useState(false)
    const [inputValue, setInputValue] = useState(props.todoItem.name)

    const OnClickChangeEditState = () => {
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
        <div><h3>
            {props.title}
            {props.editMode &&
                (!editState
                    ? <>

                        <button onClick={OnClickChangeEditState}>/</button>
                        <DeleteTodoItem
                            todoItem={props.todoItem}
                            todoList={props.todoList}
                            setTodoList={props.setTodoList}
                        />
                    </>
                    : <>
                        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                        <button onClick={() => OnClickSaveUpdatedTitle(props.todoItem)}>+</button>
                        <button onClick={OnClickCancelEdit}>-</button>
                    </>)
            }
        </h3>
            <TaskContainer
                todoItem={props.todoItem}
                editMode={props.editMode}

            />
        </div>
    )
}