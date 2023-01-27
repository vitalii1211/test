import React from 'react';
import {Link} from "react-router-dom";
import { useRef, useState, useEffect } from "react";

function Login(props) {
    const userRef = useRef();
    const errRef = userRef;

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    // useEffect(() => {
    //     userRef.current.focus();
    // },[])

    return (
        <div>
            <h1>Login</h1>
            <h2>Do not have an account? <Link to = "/register">Register here</Link></h2>

        </div>
    );
}

export default Login;