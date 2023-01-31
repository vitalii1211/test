import React, {useEffect, useState} from 'react';
import axios from "axios";

const Test = () => {
    const [filter, setFilter] = useState("users")
    const [items, setItems] = useState([])

    useEffect(() => {
        async function fetchData() {
            const URL = "https://jsonplaceholder.typicode.com/" + filter
            try {
                const data = await axios.get(URL)
                setItems(data.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [filter])

    const list = items.map(item => <tr key={item.id}>
            {Object.entries(item).map(([key, value]) => {
            return (
                <td key={key} >{JSON.stringify(value)}</td>
            )})
            }
        </tr>
    )
    console.log(items)


    return (
        <div>
            <div>
                <button onClick={() => setFilter("users")}>users</button>
                <button onClick={() => setFilter("posts")}>posts</button>
                <button onClick={() => setFilter("comments")}>comments</button>
            </div>
            <div>
                <table>
                    <tbody>
                    {list}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Test;