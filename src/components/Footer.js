import React from 'react';
import TasksFilter from './TasksFilter';
import './Footer.css';

function Footer({ activeTasksCount, filter, onFilterChange, onClearCompleted }) {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        {activeTasksCount} item{activeTasksCount !== 1 ? 's' : ''} left
      </span>
      <TasksFilter currentFilter={filter} onFilterChange={onFilterChange} />
      <button type='button' className='clear-completed' onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
