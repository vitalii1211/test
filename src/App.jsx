import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {tasks1, tasks2, tasks3} from "./Data"

function App() {
    return (
    <div className="App">
      <Todolist title = "What to learn" tasks = {tasks1}/>
      <Todolist title = "Movies" tasks = {tasks2}/>
      <Todolist title = "Music" tasks = {tasks3}/>
    </div>
  );
}

export default App;
