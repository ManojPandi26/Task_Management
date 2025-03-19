import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Analytics = () => {
  const { getTaskStats, tasks } = useTaskContext();
  const [timeRange, setTimeRange] = useState('all');
  
  const stats = getTaskStats();
  
  // Get tasks in selected time range
  const getTasksInRange = () => {
    if (timeRange === 'all') return tasks;
    
    const now = new Date();
    let startDate;
    
    switch(timeRange) {
      case 'week':
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 3);
        break;
      default:
        return tasks;
    }
    
    return tasks.filter(task => new Date(task.createdAt) >= startDate);
  };
  
  const tasksInRange = getTasksInRange();
  const completedInRange = tasksInRange.filter(task => task.completed).length;
  const completionRateInRange = tasksInRange.length > 0 
    ? Math.round((completedInRange / tasksInRange.length) * 100) 
    : 0;
  
  // Get average completion time (for completed tasks)
  const getAverageCompletionTime = () => {
    const completedTasks = tasksInRange.filter(task => task.completed);
    if (completedTasks.length === 0) return null;
    
    let totalDays = 0;
    
    completedTasks.forEach(task => {
      const creationDate = new Date(task.createdAt);
      // Assuming we store completion date; if not, we'd need to add this feature
      // For now, using current date as a placeholder
      const completionDate = new Date(); 
      const days = Math.round((completionDate - creationDate) / (1000 * 60 * 60 * 24));
      totalDays += days;
    });
    
    return Math.round(totalDays / completedTasks.length);
  };
  
  const averageCompletionDays = getAverageCompletionTime();
  
  return (
    <div className="analytics-page">
      <div className="time-filter">
        <label>Time Range:</label>
        <div className="time-buttons">
          <button 
            className={timeRange === 'all' ? 'active' : ''} 
            onClick={() => setTimeRange('all')}
          >
            All Time
          </button>
          <button 
            className={timeRange === 'week' ? 'active' : ''} 
            onClick={() => setTimeRange('week')}
          >
            Last Week
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''} 
            onClick={() => setTimeRange('month')}
          >
            Last Month
          </button>
          <button 
            className={timeRange === 'quarter' ? 'active' : ''} 
            onClick={() => setTimeRange('quarter')}
          >
            Last Quarter
          </button>
        </div>
      </div>
      
      <div className="analytics-grid">
        <div className="analytics-card summary-card">
          <h3>Task Summary</h3>
          <div className="stat-grid">
            <div className="stat-item">
              <div className="stat-value">{tasksInRange.length}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{completedInRange}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{tasksInRange.length - completedInRange}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{completionRateInRange}%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>
        </div>
        
        <div className="analytics-card">
        <h3>Category Distribution</h3>
          <div className="chart-container">
            {Object.entries(stats.categoryDistribution).map(([category, count]) => (
              <div key={category} className="chart-bar-item">
                <div className="chart-label">{category}</div>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar"
                    style={{ 
                      width: `${count / tasks.length * 100}%`,
                      backgroundColor: getCategoryColor(category)
                    }}
                  ></div>
                </div>
                <div className="chart-value">{count}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="analytics-card">
          <h3>Priority Distribution</h3>
          <div className="chart-container">
            {Object.entries(stats.priorityDistribution).map(([priority, count]) => (
              <div key={priority} className="chart-bar-item">
                <div className="chart-label">{priority}</div>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar"
                    style={{ 
                      width: `${count / tasks.length * 100}%`,
                      backgroundColor: getPriorityColor(priority)
                    }}
                  ></div>
                </div>
                <div className="chart-value">{count}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="analytics-card">
          <h3>Task Completion Time</h3>
          <div className="completion-time">
            {averageCompletionDays !== null ? (
              <div className="stat-highlight">
                <span className="big-number">{averageCompletionDays}</span>
                <span className="label">Average days to complete a task</span>
              </div>
            ) : (
              <div className="empty-state">No completed tasks in this time range</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for Analytics page
const getCategoryColor = (category) => {
  const colors = {
    'Work': '#4285F4',
    'Personal': '#34A853',
    'Shopping': '#FBBC05',
    'Health': '#EA4335',
    'Learning': '#9C27B0'
  };
  
  return colors[category] || '#7F7F7F';
};

const getPriorityColor = (priority) => {
  const colors = {
    'Urgent': '#E53935',
    'High': '#FB8C00',
    'Medium': '#FDD835',
    'Low': '#43A047'
  };
  
  return colors[priority] || '#7F7F7F';
};

export default Analytics;