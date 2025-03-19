import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useTaskContext } from '../context/TaskContext';

const TaskList = () => {
  const { 
    filter, setFilter,
    categoryFilter, setCategoryFilter,
    priorityFilter, setPriorityFilter,
    sortBy, setSortBy,
    categories, priorityLevels,
    getFilteredTasks
  } = useTaskContext();
  
  const filteredTasks = getFilteredTasks();
  
  return (
    <div className="task-list-page">
      <div className="task-form-section">
        <TaskForm />
      </div>
      
      <div className="filter-controls">
        <div className="filter-section">
          <label>Status:</label>
          <div className="filter-buttons">
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
          </div>
        </div>
        
        <div className="filter-section">
          <label>Category:</label>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-section">
          <label>Priority:</label>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Priorities</option>
            {priorityLevels.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-section">
          <label>Sort By:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="date">Date Added</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      
      <div className="task-count">
        {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
      </div>
      
      <div className="tasks-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <div className="empty-state">
            <p>No tasks found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;