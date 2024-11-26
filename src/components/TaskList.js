import React, { useState } from 'react';
import './TaskList.css'

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState('');

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, status: 'Pending' }]); // Initial status is 'Pending'
      setTaskInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const updateStatus = (index, status) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, status } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setEditInput(tasks[index].text);
  };

  const saveEdit = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editInput } : task
    );
    setTasks(newTasks);
    setIsEditing(null);
  };

  return (
    <div className="task-list">
      <div className="task-header">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for Enter key
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
      
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.status === 'Completed' ? 'completed' : ''}>
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(index, e.target.value)} // Update status on selection
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button onClick={() => startEditing(index)} className='edit-btm'>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div >
  );
}

export default TaskList;
