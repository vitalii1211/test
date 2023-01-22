import React from "react";

function DeleteItem(props) {
    const OnClickDeleteItem = () => {
        const index = props.taskItems.findIndex((obj) => obj.id === props.item.id)
        const deletedItem = props.taskItems.filter((_ek, i) => i !== index)
        props.setTaskItems(deletedItem)
    }

    // при клике на кнопку нужно:
    // 1. найти index элемента
    // удалить его из tasKItem


    return (
        // <div>
            <button onClick={() => OnClickDeleteItem()}>-</button>
        // </div>
    )
}

export default DeleteItem;