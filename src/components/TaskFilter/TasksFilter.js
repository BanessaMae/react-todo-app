import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    filterChange: () => {},
    filter: 'all',
  };

  static typeProps = {
    filter: PropTypes.string,
    filterChange: PropTypes.func,
  };

  render() {
    const { filter, filterChange } = this.props;

    const buttons = this.buttons.map(({ name, body }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'selected' : '';

      return (
        <li className={clazz} key={name}>
          <button type="button" onClick={() => filterChange(name)}>
            {body}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }

  buttons = [
    { name: 'all', body: 'All' },
    { name: 'active', body: 'Active' },
    { name: 'done', body: 'Completed' },
  ];
}
