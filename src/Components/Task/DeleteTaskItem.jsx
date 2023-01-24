import React from "react";


function DeleteTaskItem(props) {
    const OnClickDeleteItem = () => {
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
    }
    return (
        <button onClick={() => OnClickDeleteItem()}>
            {
                !props.taskItem.isDeleted
                    ? "Удалить"
                    : "Восстановить"
            }
        </button>
    )
}

export default DeleteTaskItem;