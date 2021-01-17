import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { toggleComplete, deleteTask, updateTodo } from '../../helpers/MethodLibery';
import { TaskProps } from '../../types/interfaces';
import './Task.scss';

const Task = ({ text, id, isCompleted, editTask, timeOfCreation }: TaskProps) => {
  const onEditTask = () => editTask(id);
  const [editText, setEditText] = useState(text);

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

  // console.log(
  //   new Date(+new Date() - +timeOfCreation).getMinutes(),
  //   new Date(+new Date() - +timeOfCreation).getSeconds(),
  // );

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
            <button type="button" aria-label="play" className="icon icon-play" />
            <button type="button" aria-label="pause" className="icon icon-pause" />
            12:25
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
