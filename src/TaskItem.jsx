import React from "react";
import DeleteItem from "./Components/DeleteItem";

function TaskItem(props) {

    const OnClickDeleteItem = () => {
        const index = props.taskItems.findIndex((obj) => obj.id === props.item.id)
        // const deletedItem = props.taskItems.filter((_ek, i) => i !== index)
        // старая функция, удаляет объект
        const deletedItem = [...props.taskItems];
        deletedItem[index] = {
            id: props.item.id,
            title: props.item.title,
            isDone: props.item.isDone,
            dateTime: props.item.dateTime,
            isDeleted: !props.item.isDeleted
        };
        props.setTaskItems(deletedItem)
    }

    return (
        <div classNamr="wrapper">

            {props.item.isDeleted
                ? <input type="checkbox"
                    disabled="true"
                    checked={props.item.isDone}
                    onChange={(event) => props.OnClickChecked(event, props.item)}
                />
                : <input type="checkbox"
                    checked={props.item.isDone}
                    onChange={(event) => props.OnClickChecked(event, props.item)}
                />
            }
            {props.item.title}

            <DeleteItem OnClickDeleteItem={OnClickDeleteItem} item={props.item} />

        </div>
    )
}

export default TaskItem;