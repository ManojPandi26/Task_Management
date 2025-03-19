import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const { addTask, categories, priorityLevels } = useTaskContext();
  const [newTask, setNewTask] = useState({
    text: '',
    completed: false,
    category: categories[0],
    priority: 'Medium',
    dueDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.text.trim()) return;
    
    addTask(newTask);
    setNewTask({
      text: '',
      completed: false,
      category: categories[0],
      priority: 'Medium',
      dueDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsFormExpanded(false);
  };
  
  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-main-row">
          <input
            type="text"
            name="text"
            value={newTask.text}
            onChange={handleChange}
            placeholder="Add a new task..."
            className="task-input"
            onFocus={() => setIsFormExpanded(true)}
          />
          <button type="submit" className="add-button">Add Task</button>
        </div>
        
        {isFormExpanded && (
          <div className="form-expanded">
            <div className="form-row">
              <div className="form-group">
                <label>Category:</label>
                <select 
                  name="category" 
                  value={newTask.category} 
                  onChange={handleChange}
                  className="form-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Priority:</label>
                <select 
                  name="priority" 
                  value={newTask.priority} 
                  onChange={handleChange}
                  className="form-select"
                >
                  {priorityLevels.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Due Date:</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleChange}
                  className="form-date"
                />
              </div>
            </div>
            
            <div className="form-row">
              <textarea
                name="notes"
                value={newTask.notes}
                onChange={handleChange}
                placeholder="Add notes (optional)"
                className="form-textarea"
              ></textarea>
            </div>
            
            <div className="form-row">
              <button 
                type="button" 
                onClick={() => setIsFormExpanded(false)}
                className="collapse-form-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;