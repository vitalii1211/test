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

    function handleDragStart(event) {
        const {active} = event;
        setActiveId(active.id);
    }

    function handleDragEnd(event) {
        const {active, over} = event;
        if (active.id !== over.id) {
            if (active.id.author === over.id.author) {
                const updatedTodo = data.todoList.map((todo) => {
                    if (todo.id === active.id.id) {
                        // updateTodo(todo.id, todo2.position, todo2.author)
                        return {...todo, position: over.id.position};
                    }
                    if (todo.id === over.id.id) {
                        // updateTodo(todo.id, todo2.position, todo2.author)
                        return {...todo, position: active.id.position};
                    }
                    return todo;
                })
                data.setTodoList(updatedTodo)
            }
        }
        setActiveId(null);
    }

    return (
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
                {todolistFinal
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