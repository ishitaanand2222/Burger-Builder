import React from "react";
import classes from './Input.module.css'

const Input = (prop) => {

    let inputElement = null;
    switch(prop.inputtype){
        case('input'):
           inputElement = <input className={classes.InputElement} {...prop}/>
           break;
        case('textarea'):
           inputElement = <textarea className={classes.InputElement} {...prop}/>
           break;
        default:
            inputElement = <input className={classes.InputElement} {...prop}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{prop.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;