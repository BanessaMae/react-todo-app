import React, { Component } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import RU from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      value: '',
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    const {
      editItem,
      todo: { id },
    } = this.props;
    editItem(id, this.state.value);
    this.setState({ value: '' });
    this.setState({ editing: false });
  }
  render() {
    const { onDeleted, onToggleDone, todo } = this.props;
    const { body, id, done, date } = todo;
    return (
      <li className={done ? 'completed' : this.state.editing ? 'editing' : null}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={(event) => onToggleDone(id, event.target.done)}
            checked={done}
          />
          <label htmlFor={id}>
            <span className="description"> {body}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: RU,
                addSuffix: true,
              })}`}
            </span>
            <button
              className="icon icon-edit"
              type="button"
              onClick={() =>
                this.setState(({ editing }) => ({
                  editing: !editing,
                  value: this.props.todo.body,
                }))
              }
            ></button>
            <button type="button" onClick={() => onDeleted(id)} className="icon icon-destroy" />
          </label>
        </div>
        {this.state.editing && (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              onChange={(event) => this.setState({ value: event.target.value })}
              type="text"
              className="edit"
              value={this.state.value}
            />
          </form>
        )}
      </li>
    );
  }
}

Task.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    done: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  // onDeleted: PropTypes.func.isRequired,
  // onToggleDone: PropTypes.func.isRequired,
  // editItem: PropTypes.func.isRequired,
};

Task.defaultProps = {
  date: PropTypes.instanceOf(Date),
  todo: {},
};
