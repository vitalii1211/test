import React, {useState} from 'react';
import TaskItem from "./TaskItem";
import {Reorder} from "framer-motion";


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
    const search = filteredItems.filter(item =>
        item.title.toLowerCase().includes(props.searchItem.toLowerCase()))
    const reversedFilteredItems = search.reverse()

    return (
        <div>
              {/*<Reorder.Group values={search} onReorder={props.setTaskList}>*/}
                {reversedFilteredItems
                    .filter(el => el.todo_id === props.todoItem.id)
                    .map(taskItem =>
                        // <Reorder.Item key={taskItem.id} value={taskItem}>
                            <TaskItem
                                key={taskItem.id}
                                taskItem={taskItem}
                                taskList={props.taskList}
                                setTaskList={props.setTaskList}
                                todoItem={props.todoItem}
                                editMode={props.editMode}
                                filteredItems={filteredItems}
                            />
                        // </Reorder.Item>
                    )
                }
            {/*</Reorder.Group>*/}
        </div>
    );
}

export default TaskList;