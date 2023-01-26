import React from 'react';
import {TodoItem} from "./TodoItem";



function TodoList(props) {
        return (
        <div className="App">
            {props.todoList.map((todoItem, index) =>
                <TodoItem key={todoItem.id}
                          title={todoItem.name}
                          todoItem={todoItem}
                          todoList={props.todoList}
                          setTodoList={props.setTodoList}
                          editMode={props.editMode}

                />)}

        </div>
    );
}

export default TodoList;