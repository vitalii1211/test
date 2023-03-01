import React, {useEffect} from 'react';
import TaskItem from "./TaskItem";
import todoList from "../Todo/TodoList";


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

   const taskListOfTodo = [...filteredItems]
        .filter(item => item.title.toLowerCase().includes(props.searchItem.toLowerCase()))
        .filter(el => el.todo_id === props.todoItem.id)
        .reverse()


    return (
        <div>
            {taskListOfTodo.length
                ?
                taskListOfTodo
                    .map(taskItem =>
                        <TaskItem
                            key={taskItem.id}
                            taskItem={taskItem}
                            taskList={props.taskList}
                            setTaskList={props.setTaskList}
                            todoItem={props.todoItem}
                            editMode={props.editMode}
                            filteredItems={filteredItems}
                        />
                    )
                : "Здесь пусто"
            }

        </div>
    );
}

export default TaskList;