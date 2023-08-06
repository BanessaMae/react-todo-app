import React, { Component } from "react";


export default class TaskFilter extends Component{

    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'complited', label: 'Complited'}
    ];


    render() {

        const {filter, onFilterChange} = this.props;

        const buttons = this.buttons.map(({name, label}) => {
        const isActive = name === filter;
        const clazz = isActive ? 'selected' : 'btnn';
            return (
                <button type="button" 
                className={` ${clazz}`}
                key={name}
                onClick={()=> onFilterChange(name)}>
                     {label} 
                </button>
            );
        });

    return (
         <li>
            {buttons}
        </li>
    );
  };
};

