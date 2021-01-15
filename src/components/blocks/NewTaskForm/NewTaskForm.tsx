import React, { useState } from 'react';
import { addTask } from '../../helpers/MethodLibery';

const NewTaskForm = () => {
  const [textInput, setTextInput] = useState('');
  const [minInput, setMinInput] = useState('');
  const [secInput, setSecInput] = useState('');

  return (
    <form className="new-todo-form" onSubmit={(event) => addTask(event, textInput, minInput, secInput)}>
      <input
        name="text"
        className="new-todo"
        placeholder="Task"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTextInput(event.currentTarget.value)}
      />
      <input
        name="min"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMinInput(event.currentTarget.value)}
      />
      <input
        name="sec"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSecInput(event.currentTarget.value)}
      />
      <button aria-label="submit" type="submit" />
    </form>
  );
};

export default NewTaskForm;
