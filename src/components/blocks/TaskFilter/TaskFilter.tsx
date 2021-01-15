import React from 'react';
import FilterTypes from '../../types/filterTypes';
import { TaskFilterProps } from '../../types/interfaces';

const TaskFilter = ({ filter, changeFilter }: TaskFilterProps) => {
  const buttons = [
    { filterName: FilterTypes.ALL, label: 'ALL' },
    { filterName: FilterTypes.UNCOMPLETED, label: 'Active' },
    { filterName: FilterTypes.COMPLETED, label: 'Completed' },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ filterName, label }) => (
        <li key={filterName}>
          <button
            type="button"
            onClick={() => changeFilter(filterName)}
            className={filter === filterName ? 'selected' : ''}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskFilter;
