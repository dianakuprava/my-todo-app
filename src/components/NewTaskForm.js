import React, { useState } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ addTask }) {
  const [inputValue, setInputValue] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTask(inputValue.trim(), minutes, seconds);
      setInputValue('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <header className='header'>
      <h1>todos</h1>
      <form className='new-todo-form' onSubmit={handleSubmit}>
        <input
          className='new-todo'
          placeholder='What needs to be done?'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
        <div className='timer-inputs'>
          <input
            type='text'
            className='new-todo-form__timer'
            placeholder='Min'
            value={minutes}
            onChange={(e) => setMinutes(e.target.value.replace(/[^0-9]/g, ''))}
          />
          <input
            type='text'
            className='new-todo-form__timer'
            placeholder='Sec'
            value={seconds}
            onChange={(e) => setSeconds(e.target.value.replace(/[^0-9]/g, ''))}
          />
        </div>
        <input type='submit' hidden />
      </form>
    </header>
  );
}

export default NewTaskForm;
