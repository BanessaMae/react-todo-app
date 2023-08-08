import React, { Component } from 'react';

import TaskFilter from '../TaskFilter/TasksFilter';

export default class Footer extends Component {
  render() {
    const { toDo, filter, onFilterChange, clearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count"> {toDo} items left</span>
        <ul className="filters">
          <TaskFilter filter={filter} onFilterChange={onFilterChange} />
        </ul>
        <button className="clear-completed" onClick={clearCompleted}>
          {' '}
          Clear completed{' '}
        </button>
      </footer>
    );
  }
}
