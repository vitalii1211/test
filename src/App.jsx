import React, {useState} from 'react';
import './App.css';
import TodoContainer from "./Components/Todo/TodoContainer";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {AuthProvider} from "./Components/Auth/auth";
import RequireAuth from "./Components/Auth/RequireAuth";
import Test from "./Components/Test";

function App() {

    const API_URL = "http://localhost:8800"

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={
                        // <RequireAuth>
                            <TodoContainer API_URL={API_URL} />
                        // </RequireAuth>
                        }/>
                    <Route path="/test" element={<Test/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;
