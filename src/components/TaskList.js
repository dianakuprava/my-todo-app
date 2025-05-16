import React, { Component } from 'react';
import Task from './Task';
import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onToggle, onDelete, onEdit } = this.props;

    return (
      <ul className='todo-list'>
        {tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            onEdit={onEdit}
            onToggle={() => onToggle(task.id)}
            onDelete={() => onDelete(task.id)}
          />
        ))}
      </ul>
    );
  }
}
