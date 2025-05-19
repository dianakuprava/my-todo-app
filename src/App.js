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
    };
  }

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
    const filteredTasks = this.getFilteredTasks();

    return (
      <div className='todoapp'>
        <NewTaskForm addTask={this.addTask} />
        <section className='main'>
          <TaskList
            tasks={filteredTasks}
            onEdit={this.updateTask}
            onToggle={this.toggleCompleted}
            onDelete={this.deleteTask}
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
