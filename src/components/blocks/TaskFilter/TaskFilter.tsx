import React from 'react';
import FilterTypes from '../../types/filterTypes';

const TaskFilter = () => {
  const buttons = [
    { filterName: FilterTypes.ALL, label: 'ALL' },
    { filterName: FilterTypes.UNCOMPLETED, label: 'Active' },
    { filterName: FilterTypes.COMPLETED, label: 'Completed' },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ filterName, label }) => (
        <li key={filterName}>
          <button type="button">{label}</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskFilter;
