import React, { Component } from 'react';

import './app.css';
import Footer from '../Footer/Footer.js';
import NewTaskForm from '../NewTaskForm/NewTaskForm.js';
import TaskList from '../TaskList/TaskList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        { id: 1, body: 'Drink Tea', date: new Date(), checked: false, minute: '0.1', second: '0' },
        { id: 2, body: 'Go School', date: new Date(), checked: false, minute: '0.2', second: '0' },
        { id: 3, body: 'Eat Lunch', date: new Date(), checked: false, minute: '0.3', second: '0' },
      ],
      filter: 'All',
    };
  }

  addItem(value, min, sec) {
    const data = {
      id: new Date().getTime() + value,
      body: value,
      checked: false,
      date: new Date(),
      minute: min,
      second: sec,
    };
    this.setState(({ todos }) => ({ todos: [...todos, data] }));
  }

  deleteItem(ident) {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== ident),
    }));
  }

  changeCheck(ident, data) {
    this.setState(({ todos }) => ({
      todos: todos.map((element) => {
        if (ident === element.id) element.checked = data;
        return element;
      }),
    }));
  }

  editItem(ident, text) {
    this.setState(({ todos }) => ({
      todos: todos.map((element) => {
        if (element.id === ident) element.body = text;
        return element;
      }),
    }));
  }

  filteredItems() {
    const { todos, filter } = this.state;
    return todos.filter(({ checked }) => {
      const all = filter === 'All';
      const completed = filter === 'Completed';
      return all ? true : completed ? checked === true : checked === false;
    });
  }

  clearCompleted() {
    this.setState(({ todos }) => ({
      todos: todos.filter((element) => !element.checked),
    }));
  }

  changeFilter(data) {
    this.setState({ filter: data });
  }

  render() {
    return (
      <div className="todoapp">
        <NewTaskForm
          title="Todos"
          placeholder="What needs to be done?"
          addItem={this.addItem.bind(this)}
          placeholderMin="Min"
          placeholderSec="Sec"
        />
        <TaskList
          changeCheck={this.changeCheck.bind(this)}
          editItem={this.editItem.bind(this)}
          deleteItem={this.deleteItem.bind(this)}
          todos={this.filteredItems()}
        />
        <Footer
          changeFilter={this.changeFilter.bind(this)}
          clearCompleted={this.clearCompleted.bind(this)}
          lefts={this.state.todos.filter(({ checked }) => !checked).length}
          filter={this.state.filter}
        />
      </div>
    );
  }
}

export default App;
