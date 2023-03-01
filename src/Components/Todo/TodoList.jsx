import React from 'react';
import {TodoItem} from "./TodoItem";

function TodoList(props) {
    return (
        <div>
            {props.todoListAfterSearh
                .filter(todo => todo.author === props.user.id)
                .map((todoItem) => {
                        return (
                            <TodoItem key={todoItem.id}
                                      title={todoItem.name}
                                      todoItem={todoItem}
                                      todoList={props.todoList}
                                      setTodoList={props.setTodoList}
                                      editMode={props.editMode}
                                      searchItem={props.searchItem}
                                      setSearchItem={props.setSearchItem}
                                      taskList={props.taskList}
                                      setTaskList={props.setTaskList}
                                      userList={props.userList}
                                      currentUser={props.currentUser}
                            />)
                    }
                )
            }
        </div>
    );
}

export default TodoList;