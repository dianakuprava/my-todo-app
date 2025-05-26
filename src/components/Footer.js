import React, { Component } from 'react';
import TasksFilter from './TasksFilter';
import './Footer.css';

export default class Footer extends Component {
  handleClearCompleted = () => {
    this.props.onClearCompleted();
  };

  render() {
    const { activeTasksCount, filter, onFilterChange } = this.props;

    return (
      <footer className='footer'>
        <span className='todo-count'>
          {activeTasksCount} item{activeTasksCount !== 1 ? 's' : ''} left
        </span>
        <TasksFilter currentFilter={filter} onFilterChange={onFilterChange} />

        <button type='button' className='clear-completed' onClick={this.handleClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
