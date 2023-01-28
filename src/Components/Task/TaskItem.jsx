import React, {useState} from "react";
import DeleteTaskItem from "./DeleteTaskItem";
import axios from "axios";

function TaskItem(props) {
    const [editState, setEditState] = useState(false)
    const [inputValue, setInputValue] = useState(props.taskItem.title)

    function OnClickChecked(id) {
        const index = props.taskList.findIndex(obj => obj.id === props.taskItem.id)
        const updatedTaskItem = [...props.taskList];
        updatedTaskItem[index] = {
            id: props.taskItem.id,
            todo_id: props.todoItem.id,
            title: props.taskItem.title,
            isDone: !props.taskItem.isDone,
            dateTime: props.taskItem.dateTime,
            isDeleted: props.taskItem.isDeleted
        };
        props.setTaskList(updatedTaskItem);

        const OnUpdateTaskItem = async (id) => {
            try {
                await axios.put("http://localhost:8800/updateTaskItem/" + id.id, updatedTaskItem[index])
            } catch (err) {
                console.log(err)
            }
        }
        OnUpdateTaskItem(id)
    }



    const OnClickChangeEditState = () => {
        if (props.editMode)
            setEditState(true)
    }

    const OnClickCancelEdit = () => {
        setEditState(!editState)
        setInputValue(props.taskItem.title)
    }

    const OnClickSaveUpdatedTitle = async (taskItemClicked) => {
        taskItemClicked.title = inputValue
        try {
            await axios.put("http://localhost:8800/editTaskItem/" + taskItemClicked.id, taskItemClicked)
        } catch (err) {
            console.log(err)
        }
        props.setTaskList([...props.taskList])
        setEditState(!editState)
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
                               onChange={() => OnClickChecked(props.taskItem)}
                               checked={props.taskItem.isDone}
                        />
                    </td>
                    <td onDoubleClick={OnClickChangeEditState}>
                        {!editState
                            ? props.taskItem.title
                            : <input type="text"
                                     autoFocus={true}
                                     value={inputValue}
                                     onChange={(e) => setInputValue(e.target.value)}
                                     onBlur={() => OnClickSaveUpdatedTitle(props.taskItem)}
                                     onKeyDown={(e) => {
                                         if (e.keyCode === 13) {
                                             OnClickSaveUpdatedTitle(props.taskItem);
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