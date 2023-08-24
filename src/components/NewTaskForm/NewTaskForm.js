import React from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm';
class NewTaskForm extends React.Component {
  static defaultProps = {
    addItem: () => {},
  };
  state = {
    value: '',
    min: null,
    sec: null,
  };

  onLabelChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.value && this.state.value.trim() !== '') {
      const newItem = {
        value: this.state.value,
        min: parseInt(this.state.min),
        sec: parseInt(this.state.sec),
      };
      this.props.addItem(newItem.value, newItem.min, newItem.sec);
      this.setState({ value: '', min: null, sec: null });
    }
  };
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleSubmit(e);
    }
  };
  render() {
    const { placeholder, title, placeholderMin, placeholderSec } = this.props;
    const { value, min, sec } = this.state;
    return (
      <form className="header">
        <h1>{title}</h1>
        <label className="new-todo-form">
          <input
            className="new-todo"
            placeholder={placeholder}
            onChange={(event) => this.setState({ value: event.target.value })}
            value={value}
            onKeyDown={this.onKeyDown}
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder={placeholderMin}
            onChange={(event) => this.setState({ min: parseInt(event.target.value) })}
            value={min !== null ? min : ''}
            type="number"
          />
          <input
            className="new-todo-form__timer"
            placeholder={placeholderSec}
            onChange={(event) => this.setState({ sec: parseInt(event.target.value) })}
            value={sec !== null ? sec : ''}
            type="number"
          />
        </label>
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  addItem: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
  placeholderMin: 'Min',
  placeholderSec: 'Sec',
  title: 'Todos',
};

export default NewTaskForm;
