import React from 'react';

function TaskItemTitle(props) {
    return (
        <div
            onDoubleClick={props.OnClickChangeEditState}
            style={(props.taskItem.isDone) ? {textDecoration: 'line-through'} : null}
        >
            {!props.editState
                ? props.taskItem.title
                : <input type="text"
                         autoFocus={true}
                         value={props.inputValue}
                         onChange={(e) => props.setInputValue(e.target.value)}
                         onBlur={() => props.HandleUpdateItem(props.taskItem.id, "title")}
                         onKeyDown={(e) => {
                             if (e.keyCode === 13) {
                                 props.HandleUpdateItem(props.taskItem.id, "title");
                             } else if (e.keyCode === 27) {
                                 props.OnClickCancelEdit()
                             }
                         }}
                />
            }
        </div>
    );
}

export default TaskItemTitle;