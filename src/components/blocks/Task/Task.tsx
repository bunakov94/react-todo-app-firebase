import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';
import { toggleComplete, deleteTask, updateTodo, onStart, onStop } from '../../helpers/MethodLibery';
import { TaskProps } from '../../types/interfaces';
import './Task.scss';

const Task = ({ text, id, isCompleted, editTask, timeOfCreation, timerValue, timerIsActive, startTime }: TaskProps) => {
  const [editText, setEditText] = useState(text);
  const [label, setLabel] = useState(timerValue);
  const minets = new Date(label).getMinutes() > 9 ? new Date(label).getMinutes() : `0${new Date(label).getMinutes()}`;
  const seconds = new Date(label).getSeconds() > 9 ? new Date(label).getSeconds() : `0${new Date(label).getSeconds()}`;

  const [distanceToNow, setDistanceToNow] = useState(
    formatDistanceToNow(timeOfCreation, { addSuffix: true, includeSeconds: true }),
  );

  const onTick = () => {
    setDistanceToNow(formatDistanceToNow(timeOfCreation, { addSuffix: true, includeSeconds: true }));
  };

  useEffect(() => {
    const timerID = setInterval(() => {
      onTick();
    }, 5000);

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
            <button
              type="button"
              aria-label="play"
              className={classNames('icon', 'icon-play', { hidden: timerIsActive })}
              onClick={() => onStart(id)}
            />
            <button
              type="button"
              aria-label="pause"
              className={classNames('icon', 'icon-pause', { hidden: !timerIsActive })}
              onClick={() => onStop(id, label)}
            />
            <p className="label">{`${minets}:${seconds}`}</p>
          </span>
          <span className="description">{distanceToNow}</span>
        </label>
        <button type="button" aria-label="edit" className="icon icon-edit" onClick={() => editTask(id)} />
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
