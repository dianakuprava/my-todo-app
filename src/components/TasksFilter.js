import React from 'react';
import './TasksFilter.css';

function TasksFilter({ currentFilter, onFilterChange }) {
  const filters = ['All', 'Active', 'Completed'];

  return (
    <ul className='filters'>
      {filters.map((filter) => (
        <li key={filter}>
          <button
            type='button'
            className={currentFilter === filter ? 'selected' : ''}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TasksFilter;
