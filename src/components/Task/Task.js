import React, {Component} from "react";
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import RU from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';


export default class Task extends Component {
    render(){
        const { label,  onDeleted, 
            onToggleImportant, 
            onToggleDone,
            important,  done, date,item} = this.props;


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
                <span className="created">
                {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: RU,
                addSuffix: true,
              })}`}
              </span>
                <button className="icon icon-edit"onClick={onToggleImportant}> </button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </label>
            </div>
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



