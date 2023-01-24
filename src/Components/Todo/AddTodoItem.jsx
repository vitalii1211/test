import React, {useState} from 'react';
import axios from "axios";

function AddTodoItem() {
    const OnAddTodoItem = async () => {
        try {
            await axios.post("http://localhost:8800/addTodoItem", inputFieldValue)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const [inputFieldValue, setInputFieldValue] = useState({
        name: ""
    })

    const OnChange = (e) => {
        setInputFieldValue((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    return (<div className="Header">
            Добавить новый список:
            <input type="text" placeholder="Наименование" onChange={(e) => OnChange(e)} name="name"/>
            <button onClick={(e) => OnAddTodoItem(e)}>Добавить</button>
        </div>);
}

export default AddTodoItem;