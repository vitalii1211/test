import React, {useState} from "react";
import DeleteTaskItem from "./DeleteTaskItem";
import axios from "axios";
import TaskItemTitle from "./TaskItemTitle";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

function TaskItem(props) {
    const [editState, setEditState] = useState(false)
    const [inputValue, setInputValue] = useState(props.taskItem.title)

    const HandleUpdateItem = async (id, value) => {
        const updatedTaskList = props.taskList.map(taskItem =>
            taskItem.id === id
                ? value === "isDone"
                    ? {...taskItem, isDone: !taskItem.isDone}
                    : value === "title"
                        ? {...taskItem, title: inputValue}
                        : value === "isDeleted"
                            ? {...taskItem, isDeleted: !taskItem.isDeleted}
                            : taskItem : taskItem)
        props.setTaskList(updatedTaskList);
        if (value === "title") {
            setEditState(!editState)
        }
        try {
            const updatedTaskItem = updatedTaskList.find(taskItem => taskItem.id === id)
            await axios.put("http://localhost:8800/task/" + id, updatedTaskItem)
        } catch (err) {
            console.log(err)
        }
    }

    const HandleDeleteForever = async (id) => {
        const updatedTaskList = props.taskList.filter((i) => i.id !== id)
        props.setTaskList(updatedTaskList)
        try {
            await axios.delete("http://localhost:8800/task/" + id)
        } catch (err) {
            console.log(err)
        }
    }

    const OnClickChangeEditState = () => {
        if (props.editMode)
            setEditState(true)
    }

    const OnClickCancelEdit = () => {
        setEditState(!editState)
        setInputValue(props.taskItem.title)
    }


    return (
        <div>

            <table>
                <tbody>
                <tr>
                    <td>
                        <Checkbox
                            // input type="checkbox"
                            width="fullWidth"
                            disabled={props.taskItem.isDeleted && true}
                            onChange={() => HandleUpdateItem(props.taskItem.id, "isDone")}
                            checked={props.taskItem.isDone}
                        />
                    </td>
                    <td><Typography variant="body1">
                        <TaskItemTitle
                        OnClickChangeEditState={OnClickChangeEditState}
                        editState={editState}
                        HandleUpdateItem={HandleUpdateItem}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        taskItem={props.taskItem}
                    /> </Typography>
                    </td>
                    <td><>
                        {!props.taskItem.isDeleted
                            ? !props.editState && props.editMode &&
                            <button onClick={() => HandleUpdateItem(props.taskItem.id, "isDeleted")}>X</button>
                            : <button onClick={() => HandleUpdateItem(props.taskItem.id, "isDeleted")}>---</button>
                        }

                        <DeleteTaskItem
                            taskItem={props.taskItem}
                            taskList={props.taskList}
                            setTaskList={props.setTaskList}
                            HandleDeleteForever={HandleDeleteForever}
                        />
                    </>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default TaskItem;