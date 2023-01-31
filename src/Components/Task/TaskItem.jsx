import React, {useState} from "react";
import DeleteTaskItem from "./DeleteTaskItem";
import axios from "axios";

function TaskItem(props) {
    const [editState, setEditState] = useState(false)
    const [inputValue, setInputValue] = useState(props.taskItem.title)

    const OnClickChecked = async (id) => {
        const updatedTaskList = props.taskList.map(taskItem => taskItem.id === id
            ? {...taskItem, isDone: !taskItem.isDone}
            : taskItem)
        props.setTaskList(updatedTaskList);
        try {
            const updatedTaskItem = updatedTaskList.find(taskItem => taskItem.id === id)
            console.log(updatedTaskItem)
            // const updatedTaskItem = updatedTaskList.filter(taskItem => taskItem.id === id)
            await axios.put("http://localhost:8800/updateTaskItem/" + id,
                {isDone: updatedTaskItem.isDone, isDeleted: updatedTaskItem.isDeleted})
        } catch (err) {
            console.log(err)
        }
    }

    const OnClickSaveUpdatedTitle = async (id) => {
        const updatedTaskList = props.taskList.map(taskItem => taskItem.id === id
            ? {...taskItem, title: inputValue}
            : taskItem)
        props.setTaskList(updatedTaskList);
        setEditState(!editState)
        const updatedTaskItem = updatedTaskList.filter(taskItem => taskItem.id === id)
        try {
            await axios.put("http://localhost:8800/editTaskItem/" + id, {title: updatedTaskItem[0].title})
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
                        <input type="checkbox"
                               width="fullWidth"
                               disabled={props.taskItem.isDeleted && true}
                               onChange={() => OnClickChecked(props.taskItem.id)}
                               checked={props.taskItem.isDone}
                        />
                    </td>
                    <td onDoubleClick={OnClickChangeEditState}
                        style={(props.taskItem.isDone) ? {textDecoration: 'line-through'} : null}>
                        {!editState
                            ? props.taskItem.title
                            : <input type="text"
                                     autoFocus={true}
                                     value={inputValue}
                                     onChange={(e) => setInputValue(e.target.value)}
                                     onBlur={() => OnClickSaveUpdatedTitle(props.taskItem.id)}
                                     onKeyDown={(e) => {
                                         if (e.keyCode === 13) {
                                             OnClickSaveUpdatedTitle(props.taskItem.id);
                                         } else if (e.keyCode === 27) {
                                             OnClickCancelEdit()
                                         }
                                     }}
                            />
                        }
                    </td>
                    <td>
                        <DeleteTaskItem
                            taskItem={props.taskItem}
                            taskList={props.taskList}
                            setTaskList={props.setTaskList}
                            todoItem={props.todoItem}
                            editState={editState}
                            editMode={props.editMode}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TaskItem;