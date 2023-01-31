import React, {useState} from 'react';
import axios from "axios";

function AddTaskItem(props) {
    const [newInputItem, setNewInputItem] = useState("")
    // передачу строки из поля ввода реализовал по-разному здесь и в AddTodoItem.
    // здесь - передача по каждому символу, в AddTodoItem - по нажатию кнопки.
    // Здесь я знаю как очистить поле, там - нет

    const OnAddTaskItem = async () => {
        let newTaskItem = {
            id: null,
            todo_id: props.todoItem.id,
            title: newInputItem,
            isDone: false,
            dateTime: "2019-03-28 10:00:00",
            isDeleted: false
        }

        console.log(newTaskItem)


        try {
            await axios.post("http://localhost:8800/addTaskItem", newTaskItem)
                .then(function (response) {
                    newTaskItem.id = response.data
                    props.setFilterState("All")
                    props.setTaskList([...props.taskList, newTaskItem])
                    setNewInputItem("")
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <input width="100px" value={newInputItem} onChange={(e) => setNewInputItem(e.target.value)}/>
            <button onClick={OnAddTaskItem}>+</button>
        </div>
    );
}

export default AddTaskItem;