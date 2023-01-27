import React from 'react';
import {Link} from "react-router-dom";

function Register(props) {
    return (
        <div>
            <h1>Registration</h1>
            <h2>Already has an account? <Link to = "/login">Login here</Link></h2>
            <form action=""></form>
        </div>
    );
}

export default Register;