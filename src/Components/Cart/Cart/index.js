import React,{ useContext, useState } from 'react';
import classes from './style.module.css';
import Modal from '../../UI/Modal/index';
import CartContext from '../../../store/cart-context';
import CartItem from '../CartItem/index';
import Checkout from '../Checkout/index';

// Cart Modal to be shown when header button gets clicked

const Cart = props => {
  // Managing checkout state
  const [isCheckout,setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError,setIsError] = useState(false);
  const [didSubmit,setDidSubmit] = useState(false);

  // Accessing Cart Context Values stored globally
  const cartCtx = useContext(CartContext);

  // showing amount only upto 2 digit precision
  const cartAmountTotal = `$${cartCtx.totalAmount.toFixed(2)}`;

  // A variable to check if there is anything present in Cart or not ( for optional rendering of Order button)
  const isItemsAdded = cartCtx.items.length > 0;

  // Adding item to the Cart ( Calling addItem method stored globally )
  const addEventHandler = (item) => {
   cartCtx.addItem({...item,amount:1});
  }

  // Removing item from Cart ( Calling removeItem method stored globally )
  const removeEventHandler = (id) => {
    cartCtx.removeItem(id);
  }

  // checkout handler 
  const checkoutHandler = () => {
    setIsCheckout(true);
  }

  // Cart submit handler function ( sending data to firebase server using POST http request)
  const submitHandler = async(userData) => {
    setIsSubmitting(true);
    const res = await fetch('https://react-http-request-proje-bdcd3-default-rtdb.firebaseio.com/orders.json',{
      method: 'POST',
      body: JSON.stringify({
        users: userData,
        orders:cartCtx.items
      })
    });
    if(!res.ok){
      setIsError(true);
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

// Rendering items stored in Cart globally (accessing using useContext hook ) in an unordered list 
 const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onAdd={addEventHandler.bind(null,item)} onRemove={removeEventHandler.bind(null,item.id)}/>)}</ul>

 // Conditional rendering of Order button 
 const buttonState = (<div className={classes.actions}>
 <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
 {isItemsAdded && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
</div>);

  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && !isError && <React.Fragment>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount
          </span>
          <span>{cartAmountTotal}
          </span>
        </div>
        {isCheckout ? <Checkout onConfirm = {submitHandler} onClose={props.onClose}/> : buttonState}
      </React.Fragment>}
      {isSubmitting && !isError && <p>Your order is in progress! Please wait...</p>}
      {!isSubmitting && !didSubmit && isError && <p>Something went wrong...</p>}
      {!isSubmitting && !isError && didSubmit && 
        <React.Fragment>
          <p>Hurrah!..Your Order has been placed.</p>
          <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        </React.Fragment>
      }
    </Modal>
  );
}

export default Cart;