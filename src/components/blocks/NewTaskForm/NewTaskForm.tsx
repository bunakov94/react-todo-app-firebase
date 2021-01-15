import React, { useState } from 'react';
import firebase from '../../../firebase';

const NewTaskForm = () => {
  const [textInput, setTextInput] = useState('');
  const [minInput, setMinInput] = useState('');
  const [secInput, setSecInput] = useState('');
  // TODO: Event type?
  const addTask = (event: any) => {
    event.preventDefault();
    if (textInput !== '') {
      firebase
        .firestore()
        .collection('tasks')
        .add({
          text: textInput,
          min: minInput || 0,
          sec: secInput || 0,
          isCompleted: false,
          isEditing: false,
          timeOfCreation: new Date(),
        });
      event.target.reset();
    }
  };

  return (
    <form className="new-todo-form" onSubmit={addTask}>
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
