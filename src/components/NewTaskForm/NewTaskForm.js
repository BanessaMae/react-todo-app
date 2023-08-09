import React, { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    body: '',
  };

  onLabelChange = (e) => {
    this.setState({
      body: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.body);
    this.setState({
      body: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1> todos </h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.body}
          ></input>
        </form>
      </header>
    );
  }
}
