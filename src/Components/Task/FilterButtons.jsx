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
            <button className="button-filter" value="All" onClick={(event) => onFilterValueChanged(event)}>All</button>
            <button className="button-filter" value="Active" onClick={(event) => onFilterValueChanged(event)}>Active</button>
            <button className="button-filter" value="Completed" onClick={(event) => onFilterValueChanged(event)}>Completed</button>
            <button className="button-filter" value="Deleted" onClick={(event) => onFilterValueChangedDeleted(event)}>[Корзина]</button>

        </div>
    )
}

export default FilterButtons;