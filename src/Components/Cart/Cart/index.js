import { useContext } from 'react';
import classes from './style.module.css';
import Modal from '../../UI/Modal/index';
import CartContext from '../../../store/cart-context';
import CartItem from '../CartItem/index';

// Cart Modal to be shown when header button gets clicked

const Cart = props => {

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

// Rendering items stored in Cart globally (accessing using useContext hook ) in an unordered list 
 const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onAdd={addEventHandler.bind(null,item)} onRemove={removeEventHandler.bind(null,item.id)}/>)}</ul>

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount
        </span>
        <span>{cartAmountTotal}
        </span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {isItemsAdded && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;