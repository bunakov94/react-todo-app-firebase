import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import firebase from '../../../firebase';

import { toggleComplete, deleteTask, updateTodo } from '../../helpers/MethodLibery';
import { TaskProps } from '../../types/interfaces';
import './Task.scss';

const Task = ({ text, id, isCompleted, editTask, timeOfCreation, timerValue, timerIsActive, startTime }: TaskProps) => {
  const onEditTask = () => editTask(id);
  const [editText, setEditText] = useState(text);
  const [label, setLabel] = useState(timerValue);

  const [distanceToNow, setDistanceToNow] = useState(
    formatDistanceToNow(timeOfCreation, { addSuffix: true, includeSeconds: true }),
  );

  const onTick = () => {
    setDistanceToNow(formatDistanceToNow(timeOfCreation, { addSuffix: true, includeSeconds: true }));
  };

  useEffect(() => {
    const timerID = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(timerID);
  });

  const onTickTimer = () => {
    if (!timerIsActive) {
      return;
    }
    setLabel(Date.now() - +startTime + timerValue);
  };

  useEffect(() => {
    let interval: any;
    if (timerIsActive) {
      interval = setInterval(() => {
        onTickTimer();
      }, 1000);
    }

    return () => clearTimeout(interval);
  });

  const onStart = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      timerIsActive: true,
      startTime: Date.now(),
    });
  };

  const onStop = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      timerValue: label,
      timerIsActive: false,
    });
  };

  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          name="toogle-checkbox"
          checked={isCompleted}
          onChange={(event) => toggleComplete(event, isCompleted, id)}
        />
        <label htmlFor="toogle-checkbox">
          <span className="title">{text}</span>
          <span className="description">
            <button type="button" aria-label="play" className="icon icon-play" onClick={() => onStart()} />
            <button type="button" aria-label="pause" className="icon icon-pause" onClick={() => onStop()} />
            <p>{`${new Date(label).getMinutes()}:${new Date(label).getSeconds()}`}</p>
          </span>
          <span className="description">{distanceToNow}</span>
        </label>
        <button type="button" aria-label="edit" className="icon icon-edit" onClick={onEditTask} />
        <button type="button" aria-label="delete" className="icon icon-destroy" onClick={() => deleteTask(id)} />
      </div>
      <form onSubmit={(event) => updateTodo(event, id, event.currentTarget.editText.value)}>
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
