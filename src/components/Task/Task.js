import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import RU from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
// import Timer from '../Timer/timer';
import './Task';
export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: '',
      totalTime: props.todo.minute * 60 + props.todo.second,
      remainingTime: props.todo.minute * 60 + props.todo.second,
      isPlaying: false,
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
  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.isPlaying) {
        this.setState((prevState) => ({
          remainingTime: prevState.remainingTime > 0 ? prevState.remainingTime - 1 : 0,
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleStart = () => {
    this.setState({ isPlaying: true });
  };

  handlePause = () => {
    this.setState({ isPlaying: false });
  };
  // formatTime = (remainingTime) => {
  //   const minuteString = String(Math.floor(remainingTime / 60)).padStart(2, '0');
  //   const secondString = String(remainingTime % 60).padStart(2, '0');
  //   return `${minuteString}:${secondString < 10 ? '0' : ''}${remainingTime}`;
  // };

  render() {
    const { changeCheck, todo, deleteItem } = this.props;
    const { body, id, checked, date } = todo;
    const { remainingTime } = this.state;
    const minuteString = String(Math.floor(remainingTime / 60)).padStart(2, '0');
    const secondString = String(remainingTime % 60).padStart(2, '0');
    const isDanger = minuteString < 1;
    return (
      <li className={checked ? 'completed' : this.state.editing ? 'editing' : null}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={(event) => changeCheck(id, event.target.checked)}
            checked={checked}
          />
          <label htmlFor={id}>
            <span className="description">{body}</span>
            <span className="description-info">
              <button className="icon icon-play" onClick={this.handleStart} />
              <button className="icon icon-pause" onClick={this.handlePause} />
              <span className="created">
                <span className={clsx(isDanger ? 'text-orange-600' : 'timer')}>
                  {minuteString}:{secondString}
                </span>
              </span>
            </span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: RU,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button
            type="button"
            onClick={() =>
              this.setState(({ editing }) => ({
                editing: !editing,
                value: this.props.todo.body,
              }))
            }
            className="icon icon-edit"
          />
          <button type="button" onClick={() => deleteItem(id)} className="icon icon-destroy" />
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
  todo: PropTypes.shape({
    // id: PropTypes.number,
    body: PropTypes.string,
    checked: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  deleteItem: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

Task.defaultProps = {
  todo: {},
};
