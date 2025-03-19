// File: App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (id, text) => {
    setIsEditing(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: editValue } : task
    ));
    setIsEditing(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const pendingTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="task-app">
      <h1>Task Manager</h1>
      
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      
      <div className="filter-controls">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button onClick={clearCompleted} className="clear-completed">
          Clear completed
        </button>
      </div>

      <div className="tasks-count">
        {pendingTasksCount} {pendingTasksCount === 1 ? 'task' : 'tasks'} remaining
      </div>
      
      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {isEditing === task.id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => saveEdit(task.id)} className="save-button">
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="task-checkbox"
                  />
                  <span className="task-text">{task.text}</span>
                </div>
                <div className="task-actions">
                  <button
                    onClick={() => startEditing(task.id, task.text)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;