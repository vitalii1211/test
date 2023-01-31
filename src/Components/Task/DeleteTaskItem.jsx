import React from "react";
import axios from "axios";import ClearIcon from '@mui/icons-material/Clear';



function DeleteTaskItem(props) {

    const OnClickUpdateItem = async (id) => {
        const updatedTaskList = props.taskList.map(taskItem => taskItem.id === id
            ? {...taskItem, isDeleted: !taskItem.isDeleted}
            : taskItem
        )
        props.setTaskList(updatedTaskList)
        const updatedTaskItem = updatedTaskList.filter(taskItem => taskItem.id === id)
        try {
            await axios.put("http://localhost:8800/updateTaskItem/" + id, updatedTaskItem[0])
        } catch (err) {
            console.log(err)
        }
    }

    const OnClickDeleteForeverItem = async (id) => {
        const updatedTaskList = props.taskList.filter((i) => i.id !== id)
        props.setTaskList(updatedTaskList)
        try {
            await axios.delete("http://localhost:8800/deleteTaskItem/" + id)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            {!props.taskItem.isDeleted
                ?
                !props.editState && props.editMode &&
                <button onClick={() => OnClickUpdateItem(props.taskItem.id)}>X</button>
                :
                <>
                    <button onClick={() => OnClickUpdateItem(props.taskItem.id)}>---</button>
                    <button onClick={() => OnClickDeleteForeverItem(props.taskItem.id)}>XXX</button>
                </>
            }
        </>)
}

            export default DeleteTaskItem;



            {/*<button onClick={() => OnClickUpdateItem(props.taskItem.id)}>*/}
            {/*    {props.taskItem.isDeleted ? "---" : "X"}</button>*/}

            {/*{Boolean(props.taskItem.isDeleted) &&*/}
            {/*    <button onClick={() => OnClickDeleteForeverItem(props.taskItem.id)}>XXX</button>*/}
            {/*}*/}





