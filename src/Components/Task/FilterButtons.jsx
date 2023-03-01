import React from "react";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import api from "../../Services/api";

function FilterButtons(props) {
    async function onFilterValueChanged(event, id) {
        try {
            await api.put("http://localhost:8800/todo/" + id, {name: props.todoItem.name, filter: event.target.value})
        } catch (err) {
            console.log(err)
        }
        props.setFilterState(event.target.value)
    }

    const buttons = [
        <Button
            variant={props.filterState === "All" ? "contained" : "outlined"}
            key="All" value="All" onClick={(event) => onFilterValueChanged(event, props.todoItem.id)}>
            All
        </Button>,
        <Button
            variant={props.filterState === "Active" ? "contained" : "outlined"}
            key="Active" value="Active" onClick={(event) => onFilterValueChanged(event, props.todoItem.id)}>
            Active
        </Button>,
        <Button
            variant={props.filterState === "Completed" ? "contained" : "outlined"}
            key="Completed" value="Completed" onClick={(event) => onFilterValueChanged(event, props.todoItem.id)}>
            Completed
        </Button>,
        <Button
            variant={props.filterState === "Deleted" ? "contained" : "outlined"}
            key="Deleted" value="Deleted"
            onClick={(event) => onFilterValueChanged(event, props.todoItem.id)}>
            [Корзина]
        </Button>
    ]
    return (
        <div>
            <ButtonGroup sx={{mt: 2}} size="small" aria-label="small button group">{buttons}</ButtonGroup>
        </div>
    )
}

export default FilterButtons;