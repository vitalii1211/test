import React, {useState} from "react";
import { Reorder } from "framer-motion"

function Test() {

    const arr = [
        {qty: 1, name: "Виталя", isDone: true},
        {qty: 2, name: "Настя", isDone: true},
        {qty: 3, name: "Катя", isDone: false}
    ]
    const result = arr.reduce((acc, value) => acc + value.qty, 0)


    const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const sum = objects.reduce(
        (accumulator, currentValue) => accumulator + currentValue.x,
        0,
    );

    console.log(sum); // 6
    return (
       <div>
           {result}
       </div>
    )
}

export default Test