import React from 'react';
import { ITask } from '../../types/interfaces';
import './Task.scss';

const Task = ({ text }: ITask) => (
  <div className="view">
    <input className="toggle" type="checkbox" name="toogle-checkbox" />
    <label htmlFor="toogle-checkbox">
      <span className="title">{text}</span>
      <span className="description">
        <button type="button" aria-label="play" className="icon icon-play" />
        <button type="button" aria-label="pause" className="icon icon-pause" />
        12:25
      </span>
      <span className="description">created 17 seconds ago</span>
    </label>
    <button type="button" aria-label="edit" className="icon icon-edit" />
    <button type="button" aria-label="delete" className="icon icon-destroy" />
  </div>
);

export default Task;
