import React from "react";
import { useState } from "react";
import TasksList from "./TasksList";
import FilterButtons from "./FilterBtns";
import uuid from 'react-uuid';


type Tasks = {
    id: number
    title: string
    isDone: boolean
    dateTime: Date
    isDeleted:Boolean
}
type PropsType = {
    title: string
    tasks: Array<Tasks>
};

export function Todolist(props: PropsType) {
    const [newInputItem, setNewInputItem] = useState("")
    const [taskItems, setTaskItems] = useState(props.tasks);
    const [filterState, setFilterState] = useState("All")

    function handleAddNewTaskItem() {
        setFilterState ("All")
        const datetime = new Date()
        let newTaskItem = {
            id: taskItems.length + 1,
            title: newInputItem,
            isDone: false,
            dateTime: datetime,
            isDeleted: false
        }
        setTaskItems([...taskItems, newTaskItem])
        setNewInputItem("")
    }

    const filteredItems = taskItems.filter((el) => {
        if (filterState === "All") { return taskItems && !el.isDeleted}
        else if (filterState === "Active") { return !el.isDone && !el.isDeleted}
        else if (filterState === "Completed") { return el.isDone && !el.isDeleted}
        else if (filterState === "Deleted") { return el.isDeleted}
    })


    function onFilterValueClicked(filterValue: any) {
        setFilterState(filterValue)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newInputItem} onChange={(e) => setNewInputItem(e.target.value)} />
                <button onClick={handleAddNewTaskItem}>+</button>
            </div>
                {filteredItems.length > 0 
                ? <TasksList filteredItems={filteredItems} taskItems={taskItems} setTaskItems={setTaskItems} />
                : 'А тут пусто! :)'
                }
            <div>
                <FilterButtons onFilterValueClicked={onFilterValueClicked} />

            </div>
        </div>

    )
}