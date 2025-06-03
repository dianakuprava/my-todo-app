import React, { useState, useEffect } from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeTimers, setActiveTimers] = useState({});

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setActiveTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((taskId) => {
          if (updated[taskId].isRunning) {
            updated[taskId].elapsedTime = Math.floor(
              (Date.now() - updated[taskId].startTime) / 1000,
            );
          }
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const addTask = (text, minutes, seconds) => {
    const newTask = {
      id: Date.now(),
      description: text,
      created: new Date(),
      minutes: parseInt(minutes) || 0,
      seconds: parseInt(seconds) || 0,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, description: newText } : task)));
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handlePlayTimer = (taskId) => {
    setActiveTimers((prev) => ({
      ...prev,
      [taskId]: {
        isRunning: true,
        startTime: Date.now() - (prev[taskId]?.elapsedTime || 0) * 1000,
        elapsedTime: prev[taskId]?.elapsedTime || 0,
      },
    }));
  };

  const handlePauseTimer = (taskId) => {
    setActiveTimers((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        isRunning: false,
      },
    }));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const getActiveTasksCount = () => tasks.filter((task) => !task.completed).length;

  const getFilteredTasks = () => {
    switch (filter) {
      case 'Active':
        return tasks.filter((task) => !task.completed);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };
  return (
    <div className='todoapp'>
      <NewTaskForm addTask={addTask} />
      <section className='main'>
        <TaskList
          tasks={getFilteredTasks().map((task) => ({
            ...task,
            elapsedTime: activeTimers[task.id]?.elapsedTime || 0,
            isRunning: activeTimers[task.id]?.isRunning || false,
          }))}
          onToggle={toggleCompleted}
          onDelete={deleteTask}
          onEdit={updateTask}
          onPlayTimer={handlePlayTimer}
          onPauseTimer={handlePauseTimer}
        />
      </section>
      <Footer
        activeTasksCount={getActiveTasksCount()}
        filter={filter}
        onFilterChange={setFilter}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}

export default App;
