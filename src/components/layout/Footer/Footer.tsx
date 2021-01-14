import React from 'react';
import TaskFilter from '../../blocks/TaskFilter';
import './Footer.scss';

const Footer = () => (
  <footer>
    <footer className="footer">
      <span className="todo-count">0 items left</span>
      <TaskFilter />
      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  </footer>
);

export default Footer;
