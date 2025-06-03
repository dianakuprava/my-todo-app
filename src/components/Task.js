import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';

function Task({
  id,
  description,
  completed,
  created,
  minutes = 0,
  seconds = 0,
  elapsedTime = 0,
  isRunning = false,
  onToggle,
  onDelete,
  onEdit,
  onPlay,
  onPause,
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(description);

  const handleEditChange = (e) => setEditText(e.target.value);
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setEditing(false);
    }
  };

  const totalInitialSeconds = minutes * 60 + seconds;
  const remainingSeconds = Math.max(0, totalInitialSeconds - elapsedTime);
  const displayMinutes = Math.floor(remainingSeconds / 60);
  const displaySeconds = remainingSeconds % 60;
  const timerText = `${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
  const timeAgo = formatDistanceToNow(created, { addSuffix: true });

  return (
    <li className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <label>
          <span className='description'>{description}</span>
          <span className='timer-wrapper'>
            <button
              type='button'
              className='timer-icon icon-play'
              onClick={() => onPlay(id)}
              disabled={isRunning || remainingSeconds <= 0}
              aria-label='Play timer'
            />
            <button
              type='button'
              className='timer-icon icon-pause'
              onClick={() => onPause(id)}
              disabled={!isRunning}
              aria-label='Pause timer'
            />
            <span className='timer-value'>{timerText}</span>
          </span>
          <span className='created'>{timeAgo}</span>
        </label>
        <button
          type='button'
          className='icon icon-edit'
          onClick={() => {
            setEditing(true);
            setEditText(description);
          }}
          aria-label='Edit task'
        />
        <button
          type='button'
          className='icon icon-destroy'
          onClick={() => onDelete(id)}
          aria-label='Delete task'
        />
      </div>
      {editing && (
        <form onSubmit={handleEditSubmit}>
          <input
            type='text'
            className='edit'
            value={editText}
            onChange={handleEditChange}
            autoFocus
            onBlur={() => setEditing(false)}
          />
        </form>
      )}
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  created: PropTypes.instanceOf(Date),
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  elapsedTime: PropTypes.number,
  isRunning: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

Task.defaultProps = {
  created: new Date(),
  minutes: 0,
  seconds: 0,
  elapsedTime: 0,
  isRunning: false,
};

export default Task;
