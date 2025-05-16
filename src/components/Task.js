import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  state = {
    editing: false,
    editText: this.props.description,
    isRunning: false,
    elapsedTime: this.props.duration || 0,
    startTime: null,
  };

  handlePlay = () => {
    if (!this.state.isRunning) {
      this.setState({
        isRunning: true,
        startTime: Date.now() - this.state.elapsedTime * 1000,
      });
    }
  };

  handlePause = () => {
    this.setState({ isRunning: false });
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.isRunning) {
        const currentTime =
          Math.floor((Date.now() - this.state.startTime) / 1000) + this.props.duration;
        this.setState({ elapsedTime: currentTime });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

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
    const { editing, editText, elapsedTime, isRunning } = this.state;

    const timeAgo = formatDistanceToNow(created, { addSuffix: true });
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const timerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

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
                className={`timer-icon ${isRunning ? 'icon-pause' : 'icon-play'}`}
                onClick={isRunning ? this.handlePause : this.handlePlay}
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
  created: PropTypes.instanceOf(Date).isRequired,
  duration: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Task.defaultProps = {
  created: new Date(),
};
