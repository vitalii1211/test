import React from "react";

function DeleteTaskItem(props) {
    return (
        <>
            {Boolean(props.taskItem.isDeleted) &&
                <button onClick={() => props.HandleDeleteForever(props.taskItem.id)}>XXX</button>}
        </>)
}

export default DeleteTaskItem;