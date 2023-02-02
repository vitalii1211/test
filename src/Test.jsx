import React, {useState} from "react";
import { Reorder } from "framer-motion"

function Test() {
    const [items, setItems] = useState([0, 1, 2, 3])

    return (
        <Reorder.Group values={items} onReorder={setItems}>
            {items.map(item => (
                <Reorder.Item key={item} value={item}>
                    {item}
                </Reorder.Item>
            ))}
        </Reorder.Group>
    )
}

export default Test