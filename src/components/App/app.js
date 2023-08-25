import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './app.css';

import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, body: 'Drink Tee', done: false, edit: false, min: '1', sec: '0' },
    { id: 2, body: 'Go School', done: false, edit: false, min: '2', sec: '0' },
    { id: 3, body: 'Eat Lunch', done: false, edit: false, min: '3', sec: '0' },
  ]);
  const [filter, setFilter] = useState('all');

  App.defaultProps = {
    todos: [],
    deleteItem: () => {},
    editItem: () => {},
    filter: 'all',
    filterChange: () => {},
    todoCount: 0,
  };

  App.propTypes = {
    todos: PropTypes.array,
    editItem: PropTypes.func,
    deleteItem: PropTypes.func,
    filter: PropTypes.string,
    filterChange: PropTypes.func,
    todoCount: PropTypes.number,
  };

  const createTodoItem = (body, min, sec) => {
    return {
      id: new Date().getTime() + body,
      body,
      done: false,
      edit: false,
      min,
      sec,
    };
  };

  const addTodoItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);

    setTodos((prevTodos) => {
      const newArr = [...prevTodos, newItem];
      return newArr;
    });
  };

  const editItem = (id) => {
    setTodos((prevTodos) => {
      const idx = prevTodos.findIndex((el) => el.id === id);
      const oldItem = prevTodos[idx];
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
      };

      let newTodos = [...prevTodos.slice(0, idx), newItem, ...prevTodos.slice(idx + 1)];

      return newTodos;
    });
  };

  const onSubmitEdit = (event, id) => {
    event.preventDefault();
    setTodos((prevTodos) => {
      const idx = prevTodos.findIndex((item) => item.id === id);
      const oldItem = prevTodos[idx];

      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
        body: event.target[0].value,
      };

      let newTodos = [...prevTodos.slice(0, idx), newItem, ...prevTodos.slice(idx + 1)];

      return newTodos;
    });
  };

  const deleteItem = (id) => {
    setTodos((prevTodos) => {
      const idx = prevTodos.findIndex((el) => el.id === id);

      let newArray = [...prevTodos.slice(0, idx), ...prevTodos.slice(idx + 1)];

      return newArray;
    });
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodos((prevTodos) => {
      return toggleProperty(prevTodos, id, 'done');
    });
  };

  const filterItems = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((element) => !element.done));
  };

  const doneCount = todos.filter((el) => el.done).length;
  const todoCount = todos.length - doneCount;

  return (
    <section className="todoapp">
      <NewTaskForm addTodoItem={addTodoItem} />
      <TaskList
        todos={filterItems(todos, filter)}
        deleteItem={deleteItem}
        editItem={editItem}
        onSubmitEdit={onSubmitEdit}
        onToggleDone={onToggleDone}
      />
      <Footer
        todos={todos}
        todoCount={todoCount}
        filter={filter}
        filterChange={setFilter}
        deleteItem={deleteItem}
        clearCompleted={clearCompleted}
      />
    </section>
  );
}
