import React, {useContext, useEffect, useState} from 'react';
import {TodoItem} from "./TodoItem";
import {AppDataContext} from "../Context/DataContext";
import api from "../../Services/api";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {Item} from './Item';

function TodoList({todoListAfterSearch, user, editMode, searchItem, setSearchItem, todo1, setTodo1}) {
    const data = useContext(AppDataContext)
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const todoListOfUser = todoListAfterSearch
        .filter(todo => todo.author === user.id)
    const todolistFinal = [...todoListOfUser].sort((a, b) => {
        const numA = a.position, numB = b.position
        if (numA > numB) {
            return 1
        }
        if (numB > numA) {
            return -1
        }
    })

    //     const updatedTodo = data.todoList.map((todo) => {
    //         if (todo.id === todo1.id) {
    //                 // updateTodo(todo.id, todo2.position, todo2.author)
    //                 console.log("не было списка")
    //                 return {...todo, author: user.id, position: 1};
    //
    //             if (todolistFinal.length) {
    //                 console.log("был список")
    //                 // updateTodo(todo.id, todo2.position, todo2.author)
    //                 return {...todo, author: user.id, position: todolistFinal.length + 1};
    //             }
    //         }
    //
    //         return todo;
    //     })
    //     data.setTodoList(updatedTodo)
    //     console.log("updatedTodo", updatedTodo)
    // }

    function handleDragStart(event) {
        const {active} = event;
        setActiveId(active.id);
    }

    function handleDragEnd(event) {
        const {active, over} = event;
        // console.log("active", active.id)
        // console.log("over", over.id)

        if (active.id !== over.id) {
            data.setTodoList((items) => {
                const oldIndex = items.indexOf(active.id);
                console.log(oldIndex)
                const newIndex = items.indexOf(over.id);
                console.log(newIndex)
                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }

    return (
        // <div
        //     // style={{height: '100%'}}
        //     // draggable
        //     // onDragOver={(e) => dragOverHandler(e)}
        //     // onDrop={e => dropCardHandler(e, user)}
        // >
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={data.todoList}
                strategy={verticalListSortingStrategy}
            >
                {todoListOfUser
                    .map((todoItem) => <TodoItem
                            key={todoItem.id}
                            todoItem={todoItem}
                            editMode={editMode}
                            searchItem={searchItem}
                            setSearchItem={setSearchItem}
                            todoListFinal={todoListOfUser}
                            todo1={todo1}
                            setTodo1={setTodo1}
                            user={user}
                            // dragOverHandler={dragOverHandler}
                            todolistFinal={todolistFinal}
                        />
                    )
                }
                {/*</div>*/}
            </SortableContext>
            <DragOverlay>
                {activeId ? <TodoItem
                    todoItem={activeId}
                    title={activeId.name}
                    editMode={false}
                    searchItem={""}
                /> : null}
            </DragOverlay>
        </DndContext>
    );
}




export default TodoList;