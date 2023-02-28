import React, {useEffect, useState} from 'react';
import './App.css';
import TodoContainer from "./Components/Todo/TodoContainer";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Test from "./Test";
import PrivateRoute from "./Components/Auth/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute>
                        <TodoContainer/>
                    </PrivateRoute>
                }/>

                <Route path="/test" element={<Test/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
