import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  state = {
    editing: false,
    editText: this.props.description,
  };

  handleEditChange = (e) => {
    this.setState({ editText: e.target.value });
  };

  handleEditSubmit = (e) => {
    e.preventDefault();
    const { editText } = this.state;
    const { id, onEdit } = this.props;

    if (editText.trim()) {
      onEdit(id, editText.trim());
      this.setState({ editing: false });
    }
  };

  handleEditClick = () => {
    this.setState({
      editing: true,
      editText: this.props.description,
    });
  };

  handleToggle = () => {
    this.props.onToggle(this.props.id);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    const {
      description,
      completed,
      created,
      minutes = 0,
      seconds = 0,
      elapsedTime = 0,
      isRunning = false,
      onPlay,
      onPause,
    } = this.props;

    const { editing, editText } = this.state;

    const timeAgo = formatDistanceToNow(created, { addSuffix: true });

    const totalInitialSeconds = minutes * 60 + seconds;
    const remainingSeconds = Math.max(0, totalInitialSeconds - elapsedTime);
    const displayMinutes = Math.floor(remainingSeconds / 60);
    const displaySeconds = remainingSeconds % 60;

    const timerText = `${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;

    return (
      <li className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={completed}
            onChange={this.handleToggle}
          />

          <label>
            <span className='description'>{description}</span>
            <span className='timer-wrapper'>
              <button
                type='button'
                className='timer-icon icon-play'
                onClick={() => onPlay(this.props.id)}
                disabled={isRunning || remainingSeconds <= 0}
              />
              <button
                type='button'
                className='timer-icon icon-pause'
                onClick={() => onPause(this.props.id)}
                disabled={!isRunning}
              />
              <span className='timer-value'>{timerText}</span>
            </span>
            <span className='created'>{timeAgo}</span>
          </label>
          <button type='button' className='icon icon-edit' onClick={this.handleEditClick} />
          <button type='button' className='icon icon-destroy' onClick={this.handleDelete} />
        </div>
        {editing && (
          <form onSubmit={this.handleEditSubmit}>
            <input
              type='text'
              className='edit'
              value={editText}
              onChange={this.handleEditChange}
              autoFocus
            />
          </form>
        )}
      </li>
    );
  }
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
