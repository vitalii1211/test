import React from 'react';
import TaskItem from "./TaskItem";

function TaskList(props) {

    const filteredItems = props.taskList.filter((el) => {
        if (props.filterState === "All") {
            return props.taskList && !el.isDeleted
        } else if (props.filterState === "Active") {
            return !el.isDone && !el.isDeleted
        } else if (props.filterState === "Completed") {
            return el.isDone && !el.isDeleted
        } else if (props.filterState === "Deleted") {
            return el.isDeleted
        }
    })
    debugger

    return (
        <div>
            {filteredItems
                .sort((a, b) => (b.id) - new Date(a.id))
                .filter(el => el.todo_id === props.todoItem.id)

                .map((taskItem, i) => <TaskItem
                    key={taskItem.id}
                    taskItem={taskItem}
                    taskList={props.taskList}
                    setTaskList={props.setTaskList}
                    todoItem={props.todoItem}
                    editMode={props.editMode}
                />)
            }
        </div>
    );
}

export default TaskList;