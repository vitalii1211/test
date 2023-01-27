import React from "react";
import axios from "axios";

function DeleteTaskItem(props) {

    const OnClickUpdateItem = async (taskItemClicked) => {
        // берем объект, на который кликнули, и меняем свойство isDeleted на противоположное
        taskItemClicked.isDeleted = !props.taskItem.isDeleted

        // отправляем измененный объет в базу данных
        try {
            await axios.put("http://localhost:8800/updateTaskItem/" + taskItemClicked.id, taskItemClicked)
        } catch (err) {
            console.log(err)
        }

        //  возвращаем массив taskList c измененным объектом taskItem в массив taskList, для фронта
        props.setTaskList([...props.taskList])
    }

    const OnClickDeleteForeverItem = async (taskItemClicked) => {
        // Удаляем объет из базы данных
        try {
            await axios.delete("http://localhost:8800/deleteTaskItem/" + taskItemClicked.id)
        } catch (err) {
            console.log(err)
        }

        // Удаляем объет из taskList (перебираем тасклист так, чтобы в него не пропустить измененный объект)
        const deletedItem = props.taskList.filter((i) => i.id !== taskItemClicked.id)
        props.setTaskList(deletedItem)
    }

    return (
        <>
            {!props.taskItem.isDeleted
                ? !props.editState && <button onClick={() => OnClickUpdateItem(props.taskItem)}>X</button>
                : <>
                    <button onClick={() => OnClickUpdateItem(props.taskItem)}>---</button>
                    <button onClick={() => OnClickDeleteForeverItem(props.taskItem)}>XXX</button>
                </>
            }
        </>
    )
}

export default DeleteTaskItem;