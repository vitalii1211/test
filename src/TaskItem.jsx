import React from "react";
import DeleteItem from "./Components/DeleteItem";

function TaskItem(props) {
    return (
        <div>
            <input
                type="checkbox"
                checked={props.item.isDone}
                onChange={(event) => props.HandleChange(event,props.item)}
            />
            {props.item.title}
            <DeleteItem taskItems={props.taskItems} setTaskItems={props.setTaskItems} item={props.item}/>
        </div>
    )
}

export default TaskItem;