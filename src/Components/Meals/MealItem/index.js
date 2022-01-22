import { useContext } from 'react';
import classes from './style.module.css';
import MealItemForm from '../MealItemForm/index';
import CartContext from '../../../store/cart-context';

// Individual Meal Item shown in the Page on load
const MealItem = props => {
  const cartCtx = useContext(CartContext);

  // defining function for Adding item to Cart which will be passed as prop to MealItemForm 
  const addToCartHandler = (amount)=>{
     cartCtx.addItem( {
       id:props.id,
       name: props.name,
       price:props.price,
       amount: amount,
     });
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>${props.price.toFixed(2)}</div>
      </div>
      <MealItemForm id={props.name} onAddToCart={addToCartHandler}/>
    </li>
  );
}

export default MealItem;