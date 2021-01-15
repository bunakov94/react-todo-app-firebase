import React, { useState } from 'react';
import firebase from '../../../firebase';
import { TaskProps } from '../../types/interfaces';
import './Task.scss';

const Task = ({ text, id, isCompleted, editTask }: TaskProps) => {
  const toggleComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    firebase.firestore().collection('tasks').doc(id).update({
      isCompleted: !isCompleted,
    });
  };
  const onEditTask = () => editTask(id);
  const deleteTask = () => {
    firebase.firestore().collection('tasks').doc(id).delete();
  };

  const updateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    firebase.firestore().collection('tasks').doc(id).update({
      isEditing: false,
      text: event.currentTarget.editText.value,
    });
  };

  const [editText, setEditText] = useState(text);

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          name="toogle-checkbox"
          checked={isCompleted}
          onChange={toggleComplete}
        />
        <label htmlFor="toogle-checkbox">
          <span className="title">{text}</span>
          <span className="description">
            <button type="button" aria-label="play" className="icon icon-play" />
            <button type="button" aria-label="pause" className="icon icon-pause" />
            12:25
          </span>
          <span className="description">created 17 seconds ago</span>
        </label>
        <button type="button" aria-label="edit" className="icon icon-edit" onClick={onEditTask} />
        <button type="button" aria-label="delete" className="icon icon-destroy" onClick={deleteTask} />
      </div>
      <form onSubmit={updateTodo}>
        <input
          type="text"
          className="edit"
          name="editText"
          value={editText}
          onChange={(event) => setEditText(event.currentTarget.value)}
        />
      </form>
    </>
  );
};

export default Task;
