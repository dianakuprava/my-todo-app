import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

function TaskList({ tasks, onEdit, onToggle, onDelete, onPlayTimer, onPauseTimer }) {
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

export default TaskList;

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
