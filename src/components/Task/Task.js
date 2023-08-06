import React, {Component} from "react";
import './Task.css';
import { findAllByTestId } from "@testing-library/react";

export default class Task extends Component {
    render(){
        const { label,  onDeleted, 
            onToggleImportant, 
            onToggleDone,
            important, done} = this.props;

        let classNames ;
        if ( done ){
            classNames = 'completed';
        }
        return (
            <li className={classNames}>
            <div className="view">
            <input className="toggle" type="checkbox" onClick={onToggleDone}></input>
            <label >
                <span className="description"> {label}</span>
                <button className="icon icon-edit"onClick={onToggleImportant}> </button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </label>
            </div>
            </li>
            );
    }
}


