import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './Contexts/TaskContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import TaskList from './Pages/TaskList';
import Analytics from './Pages/Analytics';
import Settings from './Pages/Settings';
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

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);