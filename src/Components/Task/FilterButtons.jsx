import React from "react";

function FilterButtons(props) {
    function onFilterValueChanged(event) {
        props.setFilterState(event.target.value)
    }
    function onFilterValueChangedDeleted(event) {
        props.setFilterState(event.target.value)
    }

    return (
        <div>
            <button value="All" onClick={(event) => onFilterValueChanged(event)}>All</button>
            <button value="Active" onClick={(event) => onFilterValueChanged(event)}>Active</button>
            <button value="Completed" onClick={(event) => onFilterValueChanged(event)}>Completed</button>
            <button value="Deleted" onClick={(event) => onFilterValueChangedDeleted(event)}>[Корзина]</button>

        </div>
    )
}

export default FilterButtons;