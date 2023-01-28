import React from "react";

function FilterButtons(props) {
    function onFilterValueChanged(event) {
        props.setFilterState(event.target.value)
    }

    return (
        <div>
            <button
                className={props.filterState === "All" ? "button-filter" : ""}
                value="All" onClick={(event) => onFilterValueChanged(event)}>
                All
            </button>
            <button
                className={props.filterState === "Active" ? "button-filter" : ""}
                value="Active" onClick={(event) => onFilterValueChanged(event)}>
                Active
            </button>
            <button
                className={props.filterState === "Completed" ? "button-filter" : ""}
                value="Completed" onClick={(event) => onFilterValueChanged(event)}>
                Completed
            </button>
            <button
                className={props.filterState === "Deleted" ? "button-filter" : ""}
                value="Deleted"
                onClick={(event) => onFilterValueChanged(event)}>
                [Корзина]
            </button>
        </div>
    )
}

export default FilterButtons;