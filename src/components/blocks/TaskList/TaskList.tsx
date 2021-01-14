import React from 'react';
import Task from '../Task';
import { ITask } from '../../types/interfaces';
import './TaskList.scss';

const TaskList = ({ tasks }: any) => (
  <>
    <ul className="todo-list">
      {tasks.map((task: ITask) => (
        <li key={task.id}>
          <Task {...task} />
        </li>
      ))}
    </ul>
  </>
);

export default TaskList;
