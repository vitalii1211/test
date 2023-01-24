import React from "react";
import DeleteTaskItem from "./DeleteTaskItem";

function TaskItem(props) {
    function OnClickChecked() {
        const index = props.taskList.findIndex(obj => obj.id === props.taskItem.id)
        const updatedTaskItem = [...props.taskList];
        updatedTaskItem[index] = {
            id: props.taskItem.id,
            categoryID: props.todoItem.id,
            title: props.taskItem.title,
            isDone: !props.taskItem.isDone,
            dateTime: props.taskItem.dateTime,
            isDeleted: props.taskItem.isDeleted
        };
        props.setTaskList(updatedTaskItem);
    }

    return (
        <div>

            {props.taskItem.isDeleted
                ? <input type="checkbox"
                         disabled="true"
                         checked={props.taskItem.isDone}
                         onChange={(event) => OnClickChecked(event, props.taskItem)}
                />
                : <input type="checkbox"
                         checked={props.taskItem.isDone}
                         onChange={() => OnClickChecked(props.taskItem)}
                />
            }
            {props.taskItem.title}

            <DeleteTaskItem
                taskItem={props.taskItem}
                taskList={props.taskList}
                setTaskList={props.setTaskList}
                todoItem={props.todoItem}

            />
        </div>
    )
}

export default TaskItem;