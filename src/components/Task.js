import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  state = {
    editing: false,
    editText: this.props.description,
    isRunning: false,
    remainingMinutes: Number(this.props.minutes) || 0,
    remainingSeconds: Number(this.props.seconds) || 0,
    timerId: null,
  };

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  handlePlay = () => {
    if (!this.state.isRunning) {
      const timerId = setInterval(() => {
        this.setState((prevState) => {
          let { remainingMinutes, remainingSeconds } = prevState;

          if (remainingMinutes === 0 && remainingSeconds === 0) {
            clearInterval(timerId);
            return { isRunning: false };
          }

          if (remainingSeconds === 0) {
            remainingMinutes -= 1;
            remainingSeconds = 59;
          } else {
            remainingSeconds -= 1;
          }

          return {
            remainingMinutes: Math.max(0, remainingMinutes),
            remainingSeconds: Math.max(0, remainingSeconds),
          };
        });
      }, 1000);

      this.setState({ isRunning: true, timerId });
    }
  };

  handlePause = () => {
    clearInterval(this.state.timerId);
    this.setState({ isRunning: false });
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
    this.setState({ editing: true, editText: this.props.description });
  };

  handleToggle = () => {
    this.props.onToggle(this.props.id);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    const { description, completed, created } = this.props;
    const { editing, editText, remainingMinutes, remainingSeconds, isRunning } = this.state;

    const timeAgo = formatDistanceToNow(created, { addSuffix: true });
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    const timerText = `${remainingMinutes}:${formattedSeconds}`;

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
                onClick={this.handlePlay}
                disabled={isRunning || (remainingMinutes === 0 && remainingSeconds === 0)}
              />
              <button
                type='button'
                className='timer-icon icon-pause'
                onClick={this.handlePause}
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
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Task.defaultProps = {
  created: new Date(),
  minutes: 0,
  seconds: 0,
};
