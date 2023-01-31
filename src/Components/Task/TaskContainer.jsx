import React, {useEffect, useState} from "react";
import AddTaskItem from "./AddTaskItem";
import FilterButtons from "./FilterButtons";
import TaskList from "./TaskList";
import axios from "axios";
import File from "./File";

function TaskContainer(props) {
    const [filterState, setFilterState] = useState("All")
    const [taskList, setTaskList] = useState([]);
    useEffect(() => {
        const fetchTodoData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/taskData")
                setTaskList(res.data.reverse())
            } catch (err) {
                console.log(err)
            }
        }
        fetchTodoData()
    }, [])


    return (
        <div>
            <AddTaskItem
                taskList={taskList}
                setTaskList={setTaskList}
                setFilterState={setFilterState}
                todoItem={props.todoItem}
            />

            <TaskList
                taskList={taskList}
                setTaskList={setTaskList}
                filterState={filterState}
                todoItem={props.todoItem}
                editMode={props.editMode}

            />

            <FilterButtons
                taskList={taskList}
                filterState={filterState}
                setFilterState={setFilterState}

            />

            <File />

        </div>
    )
}

export default TaskContainer;