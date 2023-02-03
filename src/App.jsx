import React, {useEffect, useState} from 'react';
import './App.css';
import TodoContainer from "./Components/Todo/TodoContainer";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import Test from "./Test";
import AuthService from "./Services/auth.service";

function App() {
    const API_URL = "http://localhost:8800"
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };


    return (
        <BrowserRouter>
                <Routes>
                    {currentUser &&
                        <Route path="/" element={
                            <TodoContainer API_URL={API_URL} />
                        }/>
                    }
                    <Route path="/test" element={<Test/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
        </BrowserRouter>
    )
}

export default App;
