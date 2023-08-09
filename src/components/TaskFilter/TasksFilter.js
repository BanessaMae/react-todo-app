import React, { Component } from 'react';

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', body: 'All' },
    { name: 'active', body: 'Active' },
    { name: 'complited', body: 'Complited' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, body }) => {
      const isActive = name === filter;
      const clazz = isActive ? 'selected' : 'btnn';
      return (
        <button type="button" className={` ${clazz}`} key={name} onClick={() => onFilterChange(name)}>
          {body}
        </button>
      );
    });

    return <li>{buttons}</li>;
  }
}
