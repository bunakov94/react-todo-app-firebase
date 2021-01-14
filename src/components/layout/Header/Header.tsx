import React from 'react';
import NewTaskForm from '../../blocks/NewTaskForm';
import './Header.scss';

const Header = () => (
  <header className="header">
    <h1>todos</h1>
    <NewTaskForm />
  </header>
);

export default Header;
