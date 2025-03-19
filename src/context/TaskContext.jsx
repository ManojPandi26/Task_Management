import React, { createContext, useState, useEffect, useContext } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping', 'Health', 'Learning']);
  const [priorityLevels] = useState(['Low', 'Medium', 'High', 'Urgent']);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Sample tasks for first-time users
      const sampleTasks = [
        {
          id: 1,
          text: 'Review project requirements',
          completed: false,
          category: 'Work',
          priority: 'High',
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          notes: 'Focus on the technical specifications',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          text: 'Go grocery shopping',
          completed: false,
          category: 'Shopping',
          priority: 'Medium',
          dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          notes: 'Don\'t forget to buy fruits',
          createdAt: new Date().toISOString()
        }
      ];
      setTasks(sampleTasks);
    }
    
    // Load categories
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Save to localStorage whenever tasks or categories change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // Theme management
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), createdAt: new Date().toISOString() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? { ...updatedTask } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const deleteCategory = (category) => {
    setCategories(categories.filter(c => c !== category));
    // Update tasks with that category
    setTasks(tasks.map(task => 
      task.category === category ? { ...task, category: 'Other' } : task
    ));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Filtered and sorted tasks
  const getFilteredTasks = () => {
    return tasks
      .filter(task => {
        // Status filter
        if (filter === 'active' && task.completed) return false;
        if (filter === 'completed' && !task.completed) return false;
        
        // Category filter
        if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
        
        // Priority filter
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
        
        // Search query
        if (searchQuery && !task.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        
        return true;
      })
      .sort((a, b) => {
        switch(sortBy) {
          case 'priority':
            const priorityOrder = { 'Urgent': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          case 'dueDate':
            return new Date(a.dueDate) - new Date(b.dueDate);
          case 'alphabetical':
            return a.text.localeCompare(b.text);
          case 'date':
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
  };

  // Get tasks due today
  const getTasksDueToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === today);
  };

  // Get overdue tasks
  const getOverdueTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => !task.completed && task.dueDate < today);
  };

  // Get task stats for analytics
  const getTaskStats = () => {
    const completed = tasks.filter(task => task.completed).length;
    const active = tasks.length - completed;
    const completionRate = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;
    
    // Category distribution
    const categoryDistribution = {};
    categories.forEach(category => {
      categoryDistribution[category] = tasks.filter(task => task.category === category).length;
    });
    
    // Priority distribution
    const priorityDistribution = {};
    priorityLevels.forEach(priority => {
      priorityDistribution[priority] = tasks.filter(task => task.priority === priority).length;
    });
    
    return {
      total: tasks.length,
      completed,
      active,
      completionRate,
      overdue: getOverdueTasks().length,
      dueToday: getTasksDueToday().length,
      categoryDistribution,
      priorityDistribution
    };
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      categories,
      priorityLevels,
      filter,
      setFilter,
      categoryFilter,
      setCategoryFilter,
      priorityFilter,
      setPriorityFilter,
      sortBy,
      setSortBy,
      searchQuery,
      setSearchQuery,
      theme,
      toggleTheme,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      addCategory,
      deleteCategory,
      getFilteredTasks,
      getTasksDueToday,
      getOverdueTasks,
      getTaskStats
    }}>
      {children}
    </TaskContext.Provider>
  );
};