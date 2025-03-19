import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
const Sidebar = () => {
  const { getOverdueTasks, getTasksDueToday } = useTaskContext();
  
  const overdueTasks = getOverdueTasks();
  const todayTasks = getTasksDueToday();
  
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Task Manager Pro</h2>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
          Task List
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
          Analytics
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
          Settings
        </NavLink>
      </nav>
      
      <div className="sidebar-stats">
        <div className="stat-item">
          <div className="stat-label">Overdue</div>
          <div className="stat-value overdue">{overdueTasks.length}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Due Today</div>
          <div className="stat-value today">{todayTasks.length}</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
