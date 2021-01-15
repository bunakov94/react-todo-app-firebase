import React from 'react';
import TaskFilter from '../../blocks/TaskFilter';
import { FooterProps } from '../../types/interfaces';
import './Footer.scss';

const Footer = ({ deleteCompletedTasks, tasksLeft, filter, changeFilter }: FooterProps) => (
  <footer>
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter filter={filter} changeFilter={changeFilter} />
      <button type="button" className="clear-completed" onClick={deleteCompletedTasks}>
        Clear completed
      </button>
    </footer>
  </footer>
);

export default Footer;
