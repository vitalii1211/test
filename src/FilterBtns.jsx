import React from "react";

function FilterBtns(props) {
    function onFilterValueChanged(event) {
        props.onFilterValueClicked(event.target.value)
    }

    return (
        <div>
            <button value="All" onClick={(event) => onFilterValueChanged(event)}>All</button>
            <button value="Active" onClick={(event) => onFilterValueChanged(event)}>Active</button>
            <button value="Completed" onClick={(event) => onFilterValueChanged(event)}>Completed</button>
            <button value="Deleted" onClick={(event) => onFilterValueChanged(event)}>[Корзина]</button>

        </div>
    )
};

export default FilterBtns;