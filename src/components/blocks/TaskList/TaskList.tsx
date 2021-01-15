import React from 'react';
import classNames from 'classnames';
import Task from '../Task';
import { ITask, TaskListProps } from '../../types/interfaces';
import './TaskList.scss';

const TaskList = ({ tasks, editTask }: TaskListProps) => (
  <ul className="todo-list">
    {tasks.map((task: ITask) => (
      <li key={task.id} className={classNames({ completed: task.isCompleted, editing: task.isEditing })}>
        <Task {...task} editTask={editTask} />
      </li>
    ))}
  </ul>
);

export default TaskList;
