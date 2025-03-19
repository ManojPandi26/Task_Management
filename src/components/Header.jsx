import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { useTaskContext } from '../Contexts/TaskContext';

const Header = () => {
  const { theme, toggleTheme, searchQuery, setSearchQuery } = useTaskContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/':
        return 'Dashboard';
      case '/tasks':
        return 'Task List';
      case '/analytics':
        return 'Analytics';
      case '/settings':
        return 'Settings';
      default:
        return 'Task Manager Pro';
    }
  };
  
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
          <h1>{getPageTitle()}</h1>
        </div>
        
        <div className="header-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
      
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
        <Link to="/tasks" onClick={() => setIsMobileMenuOpen(false)}>Task List</Link>
        <Link to="/analytics" onClick={() => setIsMobileMenuOpen(false)}>Analytics</Link>
        <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
      </nav>
    </header>
  );
};

export default Header;