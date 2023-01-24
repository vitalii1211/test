import React, {useState} from 'react';
import axios from "axios";

function AddTaskItem(props) {
    const [newInputItem, setNewInputItem] = useState("")

    function HandleAddTaskItem() {
        props.setFilterState("All")
        let newTaskItem = {
            id: props.taskList.length + 1,
            categoryID: props.todoItem.id,
            title: newInputItem,
            isDone: false,
            dateTime: "2019-03-28 10:00:00",
            isDeleted: false
        }
        props.setTaskList([...props.taskList, newTaskItem])
        setNewInputItem("")

        const OnAddTaskItem = async () => {
            try {
                await axios.post("http://localhost:8800/addTaskItem", newTaskItem)
            } catch (err) {
                console.log(err)
            }
        }
        console.log()

        OnAddTaskItem()
    }

    return (
        <div>
            <input value={newInputItem} onChange={(e) => setNewInputItem(e.target.value)}/>
            <button onClick={HandleAddTaskItem}>+</button>
        </div>
    );
}

export default AddTaskItem;