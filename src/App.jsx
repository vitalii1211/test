import React, {useState} from 'react';
import './App.css';
import TodoContainer from "./Components/Todo/TodoContainer";
import Test from "./Test";

function App() {
    const [editMode, setEditMode] = useState(false)
    function SwitchEditMode() {
        setEditMode(!editMode)
    }

    return (
        <div>
            <button onClick={SwitchEditMode}>
                {editMode ?
                    "Режим редактирования"
                    : "Режим чтения"
                }
            </button>
            <TodoContainer
                editMode={editMode}
                setEditMode={setEditMode}
            />
        </div>
    )
}

export default App;
