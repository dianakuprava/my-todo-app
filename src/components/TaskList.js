import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onEdit, onToggle, onDelete, onPlayTimer, onPauseTimer } = this.props;

    return (
      <ul className='todo-list'>
        {tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            onEdit={onEdit}
            onToggle={onToggle}
            onDelete={onDelete}
            onPlay={onPlayTimer}
            onPause={onPauseTimer}
          />
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date),
      minutes: PropTypes.number,
      seconds: PropTypes.number,
      elapsedTime: PropTypes.number,
      isRunning: PropTypes.bool,
    }),
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPlayTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
};
