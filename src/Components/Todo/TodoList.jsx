import React from 'react';
import {TodoItem} from "./TodoItem";
import Grid from '@mui/material/Grid';
import {Paper} from "@mui/material";
import Container from "@mui/material/Container";


function TodoList(props) {
    return (
        <div className="App">
        {/*<Grid container spacing={5} sx={{ ml: 1 }}>*/}

            {props.todoList.map((todoItem) =>
                // <Grid item >
                    <TodoItem key={todoItem.id}
                              title={todoItem.name}
                              todoItem={todoItem}
                              todoList={props.todoList}
                              setTodoList={props.setTodoList}
                              editMode={props.editMode}
                    />
                // </Grid>
            )}
        {/*</Grid>*/}
        </div>
    );
}

export default TodoList;