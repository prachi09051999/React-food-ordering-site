import React from 'react';
import classes from "./style.module.css";

// Input element to input value in the form added in the page
const Input = React.forwardRef((props,ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input}/>
    </div>
  );
});

export default Input;