import React, { useState } from 'react';
import { addTask } from '../../helpers/MethodLibery';

const NewTaskForm = () => {
  const [textInput, setTextInput] = useState('');
  const [timerValue, setTimerValue] = useState({
    min: 0,
    sec: 0,
  });
  const timer = timerValue.min * 60000 + timerValue.sec * 1000;

  return (
    <form
      className="new-todo-form"
      onSubmit={(event) => {
        addTask(event, textInput, timer);
        setTextInput('');
        setTimerValue({ min: 0, sec: 0 });
      }}
    >
      <input
        name="text"
        className="new-todo"
        placeholder="Task"
        autoComplete="off"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTextInput(event.currentTarget.value)}
      />
      <input
        name="min"
        className="new-todo-form__timer"
        placeholder="Min"
        autoComplete="off"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTimerValue({ min: +event.currentTarget.value, sec: timerValue.sec })
        }
      />
      <input
        name="sec"
        className="new-todo-form__timer"
        placeholder="Sec"
        autoComplete="off"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTimerValue({ sec: +event.currentTarget.value, min: timerValue.min })
        }
      />
      <button aria-label="submit" type="submit" />
    </form>
  );
};

export default NewTaskForm;
