import classes from './style.module.css';
import Input from '../../UI/Input';
import { useState, useRef } from 'react';

const MealItemForm = (props) => {

  // state to show an error message to handle if amount is less than 5 and more than 1 to enable the feature of adding 5 items at a time
  const [isAmountvalid, setIsAmountValid] = useState(true);
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountInt = +enteredAmount;
    if(enteredAmount.trim().length === 0 || enteredAmountInt < 1 || enteredAmountInt > 5){
      setIsAmountValid(false);
      return;
    }
    setIsAmountValid(true);
    props.onAddToCart(enteredAmountInt);
  }
return (
  <form className={classes.form} onSubmit={submitHandler}>
    <Input ref={inputRef} label="Amount" input ={{
     id: "amount"+props.id,
     type: "number",
     min: "1",
     max: "5",
     step: "1",
     defaultValue: "1"
    }} />
    <button>+ Add</button>
    {!isAmountvalid && <p>Please enter a valid number(1-5)</p>}
  </form>
);
}

export default MealItemForm;