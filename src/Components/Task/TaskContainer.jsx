import React, {useState} from "react";
import AddTaskItem from "./AddTaskItem";
import FilterButtons from "./FilterButtons";
import TaskList from "./TaskList";
import AuthService from "../../Services/auth.service";

function TaskContainer(props) {
    const [filterState, setFilterState] = useState(props.todoItem.filter)
    const taskList = props.taskList
    const setTaskList = props.setTaskList

    const currentUser = AuthService.getCurrentUser();
    const author_id = props.todoItem.author

    return (
        <div>
            {((currentUser.result[0].role === "admin" && props.editMode) || author_id === currentUser.result[0].id) &&
                <AddTaskItem
                    taskList={taskList}
                    setTaskList={setTaskList}
                    setFilterState={setFilterState}
                    todoItem={props.todoItem}
                />
            }

            <TaskList
                todoList={props.todoList}
                setTodoList={props.setTodoList}
                taskList={props.taskList}
                setTaskList={props.setTaskList}
                filterState={filterState}
                todoItem={props.todoItem}
                editMode={props.editMode}
                searchItem={props.searchItem}
                setSearchItem={props.setSearchItem}

            />

            <FilterButtons
                taskList={taskList}
                filterState={filterState}
                setFilterState={setFilterState}
                todoItem={props.todoItem}

            />
        </div>
    )
}

export default TaskContainer;