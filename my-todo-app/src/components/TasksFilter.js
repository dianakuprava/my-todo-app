import React, { Component } from 'react';
import './TasksFilter.css';

export default class TasksFilter extends Component {
  filters = ['All', 'Active', 'Completed']; //

  handleFilterChange = (filter) => {
    this.props.onFilterChange(filter);
  };

  render() {
    const { currentFilter } = this.props;

    return (
      <ul className='filters'>
        {this.filters.map((filter) => (
          <li key={filter}>
            <button
              type='button'
              className={currentFilter === filter ? 'selected' : ''}
              onClick={() => this.handleFilterChange(filter)}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
