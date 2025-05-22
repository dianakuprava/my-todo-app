import React, { Component } from 'react';
import './App.css';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: 'All',
      activeTimers: {},
    };
    this.timerInterval = null;
  }

  componentDidMount() {
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => {
        const updatedTimers = { ...prevState.activeTimers };
        Object.keys(updatedTimers).forEach((taskId) => {
          if (updatedTimers[taskId].isRunning) {
            updatedTimers[taskId].elapsedTime = Math.floor(
              (Date.now() - updatedTimers[taskId].startTime) / 1000,
            );
          }
        });
        return { activeTimers: updatedTimers };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  handlePlayTimer = (taskId) => {
    this.setState((prevState) => ({
      activeTimers: {
        ...prevState.activeTimers,
        [taskId]: {
          isRunning: true,
          startTime: Date.now() - (prevState.activeTimers[taskId]?.elapsedTime || 0) * 1000,
          elapsedTime: prevState.activeTimers[taskId]?.elapsedTime || 0,
        },
      },
    }));
  };

  handlePauseTimer = (taskId) => {
    this.setState((prevState) => ({
      activeTimers: {
        ...prevState.activeTimers,
        [taskId]: {
          ...prevState.activeTimers[taskId],
          isRunning: false,
        },
      },
    }));
  };

  addTask = (description, minutes, seconds) => {
    const newTask = {
      id: Date.now(),
      description: description.trim(),
      created: new Date(),
      minutes: parseInt(minutes, 10) || 0,
      seconds: parseInt(seconds, 10) || 0,
      completed: false,
    };

    this.setState({ tasks: [...this.state.tasks, newTask] });
  };

  updateTask = (id, newDescription) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task,
      ),
    }));
  };

  toggleCompleted = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  handleClearCompleted = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => !task.completed),
    }));
  };

  handleFilterChange = (newFilter) => {
    this.setState({ filter: newFilter });
  };

  getActiveTasksCount = () => this.state.tasks.filter((task) => !task.completed).length;

  getFilteredTasks = () => {
    const { tasks, filter } = this.state;

    switch (filter) {
      case 'Active':
        return tasks.filter((task) => !task.completed);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  render() {
    const filteredTasks = this.getFilteredTasks().map((task) => ({
      ...task,
      elapsedTime: this.state.activeTimers[task.id]?.elapsedTime || 0,
      isRunning: this.state.activeTimers[task.id]?.isRunning || false,
    }));

    return (
      <div className='todoapp'>
        <NewTaskForm addTask={this.addTask} />
        <section className='main'>
          <TaskList
            tasks={filteredTasks}
            onEdit={this.updateTask}
            onToggle={this.toggleCompleted}
            onDelete={this.deleteTask}
            onPlayTimer={this.handlePlayTimer}
            onPauseTimer={this.handlePauseTimer}
          />
        </section>
        <Footer
          activeTasksCount={this.getActiveTasksCount()}
          filter={this.state.filter}
          onFilterChange={this.handleFilterChange}
          onClearCompleted={this.handleClearCompleted}
        />
      </div>
    );
  }
}
