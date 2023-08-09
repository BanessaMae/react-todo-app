import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task.js';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, editItem } = this.props;

    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <Task key={todo.id} changeCheck={onToggleDone} editItem={editItem} deleteItem={onDeleted} todo={todo} />
        ))}
      </ul>
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
