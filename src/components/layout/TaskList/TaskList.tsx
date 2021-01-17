import React from 'react';
import classNames from 'classnames';
import Task from '../../blocks/Task';
import { ITask, TaskListProps } from '../../types/interfaces';
import './TaskList.scss';

const TaskList = ({ tasks, editTask, isLoading }: TaskListProps) =>
  tasks.length ? (
    <ul className="todo-list">
      {tasks.map((task: ITask) => (
        <li key={task.id} className={classNames({ completed: task.isCompleted, editing: task.isEditing })}>
          <Task {...task} editTask={editTask} />
        </li>
      ))}
    </ul>
  ) : (
    <h2 className="nothing">{isLoading ? 'Loading...' : 'There is nothing here yet'}</h2>
  );

export default TaskList;
