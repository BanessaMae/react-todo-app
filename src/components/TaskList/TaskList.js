import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task.js';

export default class TaskList extends Component {
  render() {
    const { todos, onToggleDone, editItem, onDeleted } = this.props;
    return (
      <React.Fragment>
        <ul className="todo-list">
          {todos.map((todo) => (
            <Task key={todo.id} onToggleDone={onToggleDone} editItem={editItem} onDeleted={onDeleted} todo={todo} />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

TaskList.propTypes = {
  todos: PropTypes.any,
  onToggleDone: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  todos: {},
};
