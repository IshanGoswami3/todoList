// src/components/History.js
import React from 'react';

function History({ history, moveToTasks }) {
  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map((task, index) => (
          <li key={index}>
            <input 
              type="checkbox" 
              checked={true} 
              onChange={() => moveToTasks(index)} 
            />
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
