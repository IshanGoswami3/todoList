// src/components/TodoList.js
import React, { useState } from 'react';

function TodoList({ tasks, addTask, markComplete, markIncomplete }) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="my todos for the day ..." // Add placeholder attribute
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => task.completed ? markIncomplete(index) : markComplete(index)} 
            />
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
