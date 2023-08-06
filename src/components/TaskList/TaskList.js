import React, { Component } from "react";
import Task from '../Task/Task.js';
import Footer from '../Footer/Footer.js';

export default class TaskList extends Component {

  render(){
  const {todos,onDeleted, onToggleImportant, onToggleDone} = this.props;

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;


    
    return (

        <Task  key={id}{...itemProps } 
        onDeleted={()=>onDeleted(id)}
        onToggleImportant = {()=> onToggleImportant(id)}
        onToggleDone = {()=> onToggleDone(id)}
        />

      );
    });

 
    return(
      <section className="main">
      <ul className="todo-list">
          {elements }
        </ul>
        </section>
    );
  }
}