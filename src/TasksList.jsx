import uuid from "react-uuid";
import TaskItem from "./TaskItem";

function TasksList(props) {
    function HandleChange(event, item) {
        const datetime = new Date()
        const index = props.taskItems.findIndex((obj) => obj.id === item.id)
        const updatedTaskItem = [...props.taskItems];
        updatedTaskItem[index] = {
            id: item.id,
            title: item.title,
            isDone: !item.isDone,
            dateTime: item.dateTime,
            isDeleted: item.isDeleted
        };
        props.setTaskItems(updatedTaskItem);
    }

    const filteredItems = props.filteredItems
    const Data = filteredItems
        .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
        .map((item) => <TaskItem key={uuid()} item={item} HandleChange={HandleChange} taskItems={props.taskItems} setTaskItems={props.setTaskItems}/> )

    return (
        <div>
            {Data}
        </div>
    )
}

export default TasksList;