import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useTaskContext } from '../Contexts/TaskContext';

const Dashboard = () => {
  const { getTasksDueToday, getOverdueTasks, getFilteredTasks } = useTaskContext();
  
  const overdueTasks = getOverdueTasks();
  const todayTasks = getTasksDueToday();
  const recentTasks = getFilteredTasks().slice(0, 5);
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-add-task">
        <TaskForm />
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2 className="section-title">Overdue Tasks</h2>
          <div className="task-list">
            {overdueTasks.length > 0 ? (
              overdueTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <div className="empty-state">No overdue tasks! 🎉</div>
            )}
          </div>
        </div>
        
        <div className="dashboard-section">
          <h2 className="section-title">Due Today</h2>
          <div className="task-list">
            {todayTasks.length > 0 ? (
              todayTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <div className="empty-state">Nothing due today</div>
            )}
          </div>
        </div>
        
        <div className="dashboard-section">
          <h2 className="section-title">Recent Tasks</h2>
          <div className="task-list">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <div className="empty-state">No tasks added yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;