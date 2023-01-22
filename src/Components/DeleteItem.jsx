import React from "react";


function DeleteItem(props) {
    return (

        <button onClick={() => props.OnClickDeleteItem()}>
            {
                !props.item.isDeleted
                    ? "Удалить"
                    : "Восстановить"
            }
        </button>
    )
}

export default DeleteItem;