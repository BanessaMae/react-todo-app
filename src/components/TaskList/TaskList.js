import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task.js';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleImportant, onToggleDone, editItem } = this.props;

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;

      return (
        <Task
          key={item.id}
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          date={new Date()}
          editItem={() => editItem(id)}
        />
      );
    });

    return (
      <section className="main">
        <ul className="todo-list">{elements}</ul>
      </section>
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
