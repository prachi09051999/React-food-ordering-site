import React,{ useRef, useState } from 'react';
import classes from "./style.module.css";

// form validation
const isEmpty = val => val.trim() === '';
// postal code should have 6 digits long 
const isEnoughLong = val => val.trim().length === 6;

const Checkout = (props) => {

    // Form validity state ( true initially ) 
    const [formValidity, setFormValidity] = useState({
      name: true,
      street:true,
      postalCode: true,
      city:true
    });


    // getting values of input using reference
    const nameInputRef = useRef();
    const cityInputRef = useRef();
    const postalInputRef = useRef();
    const streetInputRef = useRef();

    // Checkout form submit handler
    const submitHandler = (event) => {
      event.preventDefault();

      // accessing values using reference hook (useRef)
      const enteredName = nameInputRef.current.value;
      const enteredCity = cityInputRef.current.value;
      const enteredPostal = postalInputRef.current.value;
      const enteredStreet = streetInputRef.current.value;

      // checking validity of each input
      const isNamevalid = !isEmpty(enteredName);
      const isCityvalid = !isEmpty(enteredCity);
      const isPostalCodevalid = isEnoughLong(enteredPostal);
      const isStreetvalid = !isEmpty(enteredStreet);
      
      // setting form validity according to each value of input 
      setFormValidity({
        name : isNamevalid,
        street : isStreetvalid,
        postalCode : isPostalCodevalid,
        city :  isCityvalid
      });

      const formValid = isNamevalid && isCityvalid && isPostalCodevalid && isStreetvalid;


      if(!formValid){
        return;
      }
      
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostal,
        city: enteredCity
      })
      return;
    };

    // Adding invalid classes in the input fields
    const nameControlClasses = `${classes.control} ${
      formValidity.name ? '' : classes.invalid
      }`;
    const cityControlClasses = `${classes.control} ${
        formValidity.city ? '' : classes.invalid
      }`;
    const streetControlClasses = `${classes.control} ${
        formValidity.street ? '' : classes.invalid
      }`;
    const postalCodeControlClasses = `${classes.control} ${
        formValidity.postalCode ? '' : classes.invalid
      }`;

    return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formValidity.name && <p>Please Enter Proper Name</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Your City</label>
        <input type="text" id="city" ref={cityInputRef}/>
        {!formValidity.city && <p>Please Enter Proper City Name</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="code">Postal Code</label>
        <input type="text" id="code" ref={postalInputRef}/>
        {!formValidity.postalCode && <p>Please Enter Proper Postal Code</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}/>
        {!formValidity.street && <p>Please Enter Proper Street Name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>Close</button>
        <button className={classes.submit}>Checkout</button>
      </div>
    </form>
    );
}

export default Checkout;