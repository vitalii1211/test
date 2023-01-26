import React, {useState} from 'react';

function Test(props) {

    const [count, setCount] = useState(10)
    const OnClick = () => {
        setCount(count - 1)
    }

    const conslog = () => {
        console.log ("Ghbdn")
    }

    return (
        <div>
            <h1 onClick={OnClick}>{count}</h1>
            <button onClick={conslog}></button>
        </div>
    );
}

export default Test;