import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import NewTaskForm from './components//NewTaskForm/NewTaskForm';
import TaskList from './components//TaskList/TaskList';
import Footer from './components/Footer/Footer';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      { id: 1, label: 'Drink Coffee', important: false, done: false },
      { id: 2, label: 'Learn React', important: true, done: false },
      { id: 3, label: 'Make Awesome App', important: false, done: false },
    ],
    // term:'',
    filter: 'all',
  };

  onItemAdded = (text) => {
    const newItem = {
      id: ++this.maxId,
      label: text,
      important: false,
      done: false,
      date: new Date(),
    };
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      };
    });
  };

  filter(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => !item.done);
    } else if (filter === 'complited') {
      return items.filter((item) => item.done);
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted() {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((element) => !element.done),
    }));
  }

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.onItemAdded} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <Footer
          toDo={todoCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          clearCompleted={this.clearCompleted.bind(this)}
        />
      </section>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
