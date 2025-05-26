import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      minutes: '',
      seconds: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleMinutesChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const minutes = Math.min(59, parseInt(value, 10) || 0);
    this.setState({ minutes: value === '' ? '' : String(minutes) });
  };

  handleSecondsChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const seconds = Math.min(59, parseInt(value, 10) || 0);
    this.setState({ seconds: value === '' ? '' : String(seconds) });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue, minutes, seconds } = this.state;
    const { addTask } = this.props;

    if (inputValue.trim()) {
      const minutesNum = parseInt(minutes, 10) || 0;
      const secondsNum = parseInt(seconds, 10) || 0;
      addTask(inputValue.trim(), minutesNum, secondsNum);
      this.setState({
        inputValue: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  render() {
    const { inputValue, minutes, seconds } = this.state;

    return (
      <header className='header'>
        <h1>todos</h1>
        <form className='new-todo-form' onSubmit={this.handleSubmit}>
          <input
            className='new-todo'
            placeholder='What needs to be done?'
            value={inputValue}
            onChange={this.handleInputChange}
            autoFocus
          />
          <div className='timer-inputs'>
            <input
              type='text'
              className='new-todo-form__timer'
              placeholder='Min'
              value={minutes}
              onChange={this.handleMinutesChange}
            />
            <input
              type='text'
              className='new-todo-form__timer'
              placeholder='Sec'
              value={seconds}
              onChange={this.handleSecondsChange}
            />
          </div>
          <input type='submit' hidden />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};
