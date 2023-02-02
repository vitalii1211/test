import React from "react";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";

function FilterButtons(props) {
    function onFilterValueChanged(event) {
        props.setFilterState(event.target.value)
    }

    const buttons = [
        <Button
            variant={props.filterState === "All" ? "contained" : "outlined"}
            key="All" value="All" onClick={(event) => onFilterValueChanged(event)}>
            All
        </Button>,
        <Button
            variant={props.filterState === "Active" ? "contained" : "outlined"}
            key="Active" value="Active" onClick={(event) => onFilterValueChanged(event)}>
            Active
        </Button>,
        <Button
            variant={props.filterState === "Completed" ? "contained" : "outlined"}
            key="Completed" value="Completed" onClick={(event) => onFilterValueChanged(event)}>
            Completed
        </Button>,
        <Button
            variant={props.filterState === "Deleted" ? "contained" : "outlined"}
            key="Deleted" value="Deleted"
            onClick={(event) => onFilterValueChanged(event)}>
            [Корзина]
        </Button>
    ]
    return (
        <div>
            <ButtonGroup sx={{ mt: 2 }} size="small" aria-label="small button group">{buttons}</ButtonGroup>
        </div>
    )
}

export default FilterButtons;