import React, {useContext, useEffect, useState} from 'react';
import {TodoItem} from "./TodoItem";
import {AppDataContext} from "../Context/DataContext";
import api from "../../Services/api";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    rectSortingStrategy,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function TodoList({todoListAfterSearch, user, editMode, searchItem, setSearchItem, todo1, setTodo1}) {
    const data = useContext(AppDataContext)
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        }),
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
        console.log("Взял, автор:", active.id)
    }

    function handleDragEnd(event) {
        const {active, over} = event;
        console.log("active.id.author", active.id.author)

        if (active.id !== over.id) {
            if (active.id.author === over.id.author) {
                console.log("ДА")
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
            if (active.id.author !== over.id.author) {
                console.log("НЕТ!!!");
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
                strategy={verticalListSortingStrategy }
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