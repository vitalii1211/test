import React from 'react';
import './App.css';
import BoardList from "./Components/BoardList/BoardList";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import PrivateRoute from "./Components/Auth/PrivateRoute";
import DataContext from "./Components/Context/DataContext";

function App() {
    return (
        <DataContext>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute>
                            <BoardList/>
                        </PrivateRoute>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </DataContext>
    )
}

export default App;
