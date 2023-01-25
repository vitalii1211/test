import React from "react";
import axios from "axios";

function DeleteTaskItem(props) {
    const OnClickUpdateItem = async (id) => {
        const index = props.taskList.findIndex((obj) => obj.id === props.taskItem.id)
        // const deletedItem = props.taskItems.filter((_ek, i) => i !== index)
        // старая функция, удаляет объект
        const deletedItem = [...props.taskList];
        deletedItem[index] = {
            id: props.taskItem.id,
            categoryID: props.todoItem.id,
            title: props.taskItem.title,
            isDone: props.taskItem.isDone,
            dateTime: props.taskItem.dateTime,
            isDeleted: !props.taskItem.isDeleted
        };
        props.setTaskList(deletedItem)
        try {
            await axios.put("http://localhost:8800/updateTaskItem/" + id, deletedItem[index])
        } catch (err) {
            console.log(err)
        }
    }

    const OnClickDeleteForeverItem = async (id) => {


        const index = props.taskList.findIndex((obj) => obj.id === props.taskItem.id)
        const deletedItem = props.taskList.filter((_ek, i) => i !== index)
        props.setTaskList(deletedItem)

        try {
            await axios.delete("http://localhost:8800/updateTaskItem/" + id)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {!props.taskItem.isDeleted
                ? <button onClick={() => OnClickUpdateItem(props.taskItem.id)}>Удалить</button>
                : <>
                    <button onClick={() => OnClickUpdateItem(props.taskItem.id)}>Восстановить</button>
                    <button onClick={() => OnClickDeleteForeverItem(props.taskItem.id)}>Удалить навсегда</button>
                </>
            }
        </>
    )
}

export default DeleteTaskItem;