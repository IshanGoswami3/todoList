// src/App.js
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import History from './components/History';
import './App.css'; // Import the external CSS file

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
  const [activeTab, setActiveTab] = useState('todolist');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const addTask = (task) => {
    setTasks([...tasks, { task, completed: false }]);
  };

  const markComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
    setTimeout(() => {
      moveToHistory(index);
    }, 10000);
  };

  const markIncomplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = false;
    setTasks(newTasks);
  };

  const moveToHistory = (index) => {
    const completedTask = tasks[index];
    if (completedTask.completed) {
      setHistory([...history, completedTask]);
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const moveToTasks = (index) => {
    const incompleteTask = history[index];
    setTasks([...tasks, { task: incompleteTask.task, completed: false }]);
    setHistory(history.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'todolist' ? 'active' : ''}`} 
          onClick={() => setActiveTab('todolist')}
        >
          To-Do List
        </div>
        <div 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`} 
          onClick={() => setActiveTab('history')}
        >
          History
        </div>
      </div>
      <div className="content-container">
        {activeTab === 'todolist' && (
          <TodoList tasks={tasks} addTask={addTask} markComplete={markComplete} markIncomplete={markIncomplete} />
        )}
        {activeTab === 'history' && (
          <History history={history} moveToTasks={moveToTasks} />
        )}
      </div>
    </div>
  );
}

export default App;
