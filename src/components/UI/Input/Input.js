import React from "react";
import classes from './Input.module.css'

const Input = (prop) => {
    
    const inputClasses = [classes.InputElement];
    if(prop.Invalid && prop.shouldValidate && prop.touched){
        inputClasses.push(classes.Invalid)
    }
    let inputElement = null;
    switch(prop.elementType){

        case('input'):
            inputElement = <input 
            className={inputClasses.join(' ')} 
            {...prop.elementConfig} 
            value={prop.value}
            onChange = {prop.changed}/>
           break;
        case('textarea'):
           inputElement = <textarea 
           className={inputClasses.join(' ')}
            {...prop.elementConfig} 
            value={prop.value}
            onChange = {prop.changed}/>
           break;
        case('select'):
            inputElement = (
            <select 
                className={inputClasses.join(' ')}
                value={prop.value}
                onChange = {prop.changed}>
                    {prop.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
            </select>)
        break;
        default:
            inputElement = <input 
            className={inputClasses.join(' ')} 
            {...prop.elementConfig} 
            value={prop.value}
            onChange = {prop.changed}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{prop.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;