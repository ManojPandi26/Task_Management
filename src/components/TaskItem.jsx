import React, { useState } from 'react';
import { useTaskContext } from '../Contexts/TaskContext';

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, updateTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };
  
  const saveEdit = () => {
    updateTask(editedTask);
    setIsEditing(false);
  };
  
  const getPriorityClass = () => {
    switch(task.priority) {
      case 'Urgent': return 'priority-urgent';
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };
  
  const isOverdue = () => {
    if (task.completed) return false;
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate < today;
  };
  
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      {isEditing ? (
        <div className="task-edit-form">
          <div className="form-row">
            <input
              type="text"
              name="text"
              value={editedTask.text}
              onChange={handleChange}
              className="edit-input-full"
            />
          </div>
          
          <div className="form-row">
            <select 
              name="category" 
              value={editedTask.category} 
              onChange={handleChange}
              className="edit-select"
            >
              {useTaskContext().categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select 
              name="priority" 
              value={editedTask.priority} 
              onChange={handleChange}
              className="edit-select"
            >
              {useTaskContext().priorityLevels.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleChange}
              className="edit-date"
            />
          </div>
          
          <div className="form-row">
            <textarea
              name="notes"
              value={editedTask.notes || ''}
              onChange={handleChange}
              placeholder="Add notes..."
              className="edit-textarea"
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button onClick={saveEdit} className="save-button">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header" onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
            <div className="task-checkbox-container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="task-checkbox"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div className="task-content">
              <div className="task-title-row">
                <span className="task-text">{task.text}</span>
                <span className={`task-priority ${getPriorityClass()}`}>
                  {task.priority}
                </span>
              </div>
              
              <div className="task-meta">
                <span className="task-category">{task.category}</span>
                <span className="task-due-date">
                  {isOverdue() ? '⚠️ Overdue: ' : 'Due: '}
                  {task.dueDate}
                </span>
              </div>
            </div>
            
            <div className="task-actions" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsEditing(true)}
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
          </div>
          
          {isDetailsOpen && task.notes && (
            <div className="task-details">
              <div className="task-notes">
                <h4>Notes:</h4>
                <p>{task.notes}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;