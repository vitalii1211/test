import React, {useState} from 'react';
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

function AddTaskItem(props) {
    const [newInputItem, setNewInputItem] = useState("")

    const HandleAddTaskItem = async () => {
        let newTaskItem = {
            id: null,
            todo_id: props.todoItem.id,
            title: newInputItem,
            isDone: false,
            dateTime: "2019-03-28 10:00:00",
            isDeleted: false
        }
        try {
            await axios.post("http://localhost:8800/task", newTaskItem)
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
            <TextField
                sx={{ mt: 1, mb: 1}}
                size="small"
                label="Добавить заметку"
                value={newInputItem} onChange={(e) => setNewInputItem(e.target.value)}
                onKeyDown={(e) => {if (e.keyCode === 13) {HandleAddTaskItem()}}}
            />
            <Button sx={{ mt: 1, mb: 1}} variant="contained" onClick={HandleAddTaskItem}> + </Button>
        </div>
    );
}

export default AddTaskItem;