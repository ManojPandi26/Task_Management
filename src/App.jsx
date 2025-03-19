import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './page/Dashboard';
import TaskList from './page/TaskList';
import Analytics from './page/Analytics';
import Settings from './page/Settings';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="content-area">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;

