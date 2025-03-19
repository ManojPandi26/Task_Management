import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Settings = () => {
  const { categories, addCategory, deleteCategory, theme, toggleTheme } = useTaskContext();
  const [newCategory, setNewCategory] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() === '') return;
    
    addCategory(newCategory);
    setNewCategory('');
  };
  
  const confirmDeleteCategory = (category) => {
    setShowConfirmDelete(category);
  };
  
  const handleDeleteCategory = (category) => {
    deleteCategory(category);
    setShowConfirmDelete(null);
  };
  
  const handleExportData = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `task-manager-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedTasks = JSON.parse(event.target.result);
        localStorage.setItem('tasks', JSON.stringify(importedTasks));
        alert('Tasks imported successfully! Please refresh the page.');
      } catch (error) {
        alert('Error importing tasks. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="settings-page">
      <div className="settings-section">
        <h3>Appearance</h3>
        <div className="settings-option">
          <div className="settings-label">Theme</div>
          <div className="theme-toggle-container">
            <div className="toggle-label">Light</div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={theme === 'dark'} 
                onChange={toggleTheme} 
              />
              <span className="slider round"></span>
            </label>
            <div className="toggle-label">Dark</div>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Categories</h3>
        <form onSubmit={handleAddCategory} className="add-category-form">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category..."
            className="category-input"
          />
          <button type="submit" className="add-button">Add</button>
        </form>
        
        <div className="categories-list">
          {categories.map(category => (
            <div key={category} className="category-item">
              <div className="category-name">{category}</div>
              {showConfirmDelete === category ? (
                <div className="delete-confirmation">
                  <span>Are you sure?</span>
                  <button 
                    onClick={() => handleDeleteCategory(category)}
                    className="confirm-button"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setShowConfirmDelete(null)}
                    className="cancel-button"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => confirmDeleteCategory(category)}
                  className="delete-button"
                  disabled={category === 'Work' || category === 'Personal'}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Data Management</h3>
        <div className="data-actions">
          <div className="data-action">
            <button onClick={handleExportData} className="export-button">
              Export Tasks
            </button>
            <div className="action-description">
              Download all your tasks as a JSON file for backup
            </div>
          </div>
          
          <div className="data-action">
            <label htmlFor="import-input" className="import-button">
              Import Tasks
            </label>
            <input
              id="import-input"
              type="file"
              accept=".json"
              onChange={handleImportData}
              style={{ display: 'none' }}
            />
            <div className="action-description">
              Import tasks from a previously exported JSON file
            </div>
          </div>
          
          <div className="data-action">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="danger-button"
            >
              Reset All Data
            </button>
            <div className="action-description">
              Delete all tasks and settings (cannot be undone)
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>About</h3>
        <div className="about-info">
          <p><strong>Task Manager Pro</strong></p>
          <p>Version 2.0.0</p>
          <p>A professional task management application</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;