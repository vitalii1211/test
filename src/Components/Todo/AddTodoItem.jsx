import React, {useState} from 'react';
import axios from "axios";

function AddTodoItem(props) {

    const [inputFieldValue, setInputFieldValue] = useState({
        id: null,
        name: ""
    })

    const OnAddTodoItem = async () => {
        try {
            await axios.post("http://localhost:8800/addTodoItem", inputFieldValue)
                .then(function (response) {
                    inputFieldValue.id = response.data
                    props.setTodoList([...props.todoList, inputFieldValue])
                })
        } catch (err) {
            console.log(err)
        }
    }

    const OnChange = (e) => {
        setInputFieldValue((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    return (
        <div className="App">
            Добавить новый список:
            <input type="text" placeholder="Наименование" onChange={(e) => OnChange(e)} name="name"/>
            <button onClick={(e) => OnAddTodoItem(e)}>Добавить</button>
        </div>);
}

export default AddTodoItem;