import CartIcon from '../../Cart/CartIcon';
import classes from './style.module.css';
import { useContext, useState, useEffect } from 'react';
import CartContext from '../../../store/cart-context';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const [isItemAdded, setIsItemAdded] = useState(false);

  //destructering the items of Cart state

  const { items } = cartCtx;

  // used useEffect to play animation in the header Cart button each time an item get added

  useEffect(()=>{
    if(items.length === 0 ){
      return;
    }
    setIsItemAdded(true);
    
    //reverting class state after 3ms

    const timer = setTimeout(()=>{setIsItemAdded(false);},300);
    return () => {

      // removing timer

      clearTimeout(timer);
    };
  },[items]);

  // conditional addition of bump class for animation addition

  const btnClasses = `${classes.button} ${isItemAdded ? classes.bump: ''}`

  // Addition amount for each item in Cart, taking 0 as starting value
  const cartItemAmount = items.reduce((currValue,item) => { return currValue + item.amount },0);
  return (
    <button className={btnClasses} onClick={props.onOpen}>
      <span className={classes.icon}>
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemAmount}</span>
    </button>
  );
}

export default HeaderCartButton;