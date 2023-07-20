import React from "react";
import classes from './Input.module.css'

const Input = (prop) => {

    let inputElement = null;
    switch(prop.elementType){

        case('input'):
           inputElement = <input 
           className={classes.InputElement} 
           {...prop.elementConfig} 
           value={prop.value}/>
           break;
        case('textarea'):
           inputElement = <textarea 
           className={classes.InputElement}
            {...prop.elementConfig} 
            value={prop.value}/>
           break;
        case('select'):
            inputElement = (
            <select 
                className={classes.InputElement}
                value={prop.value}>
                    {prop.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
            </select>)
        break;
        default:
            inputElement = <input 
            className={classes.InputElement} 
            {...prop.elementConfig} 
            value={prop.value}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{prop.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;