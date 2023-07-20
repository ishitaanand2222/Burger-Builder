import React from "react";
import classses from './Button.module.css'

const Button = (props) =>(
    <button 
        disabled = {props.disabled}
        className={[classses.Button, classses[props.btnType]].join(' ')} 
        onClick={props.clicked}>
            {props.children}
    </button>
)

export default Button;