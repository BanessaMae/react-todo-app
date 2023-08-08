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
      item: { id },
    } = this.props;
    editItem(id, this.state.value);
    this.setState({ value: '' });
    this.setState({ editing: false });
  }
  render() {
    const { label, onDeleted, onToggleDone, done, date } = this.props;

    // let classNames;

    // if (done) {
    //   classNames = 'completed';
    // }

    return (
      <li className={done ? 'completed' : this.state.editing ? 'editing' : null}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone}></input>
          <label>
            <span className="description"> {label}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: RU,
                addSuffix: true,
              })}`}
            </span>
            <button
              className="icon icon-edit"
              onClick={() =>
                this.setState(({ editing }) => ({
                  editing: !editing,
                  value: this.props.item.label,
                }))
              }
            ></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
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
    label: PropTypes.string,
    done: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  // editItem: PropTypes.func.isRequired,
};

Task.defaultProps = {
  date: PropTypes.instanceOf(Date),
  item: {},
};
