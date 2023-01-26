import React from "react";
import DeleteTodoItem from "./DeleteTodoItem";
import TaskContainer from "../Task/TaskContainer";

export function TodoItem(props) {
    return (
        <div>
            <h3>
                {props.title}
                <DeleteTodoItem
                    todoItem={props.todoItem}
                    todoList={props.todoList}
                    setTodoList={props.setTodoList}
                />
            </h3>
            <TaskContainer
                todoItem={props.todoItem}/>
        </div>
    )
}