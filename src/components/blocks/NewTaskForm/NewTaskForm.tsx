import React from 'react';

const NewTaskForm = () => (
  <form className="new-todo-form">
    <input className="new-todo" placeholder="Task" />
    <input className="new-todo-form__timer" placeholder="Min" />
    <input className="new-todo-form__timer" placeholder="Sec" />
  </form>
);

export default NewTaskForm;
