import { useReducer } from 'react';
import CartContext from './cart-context';

// default Cart state

const defaultCart = {
  items: [],
  totalAmount: 0
}

// Cartreducer function which handles addition, deletion and returning default value of Cart

const cartReducer = (state,action) => {

  // logic for adding an item in cart

  if(action.type === 'ADD'){

    // updating total amount shown (total sum)
    const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;

    // logic to check if item already exists in cart

    let updatedItems;
    const existingCartIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingCartItem = state.items[existingCartIndex];
    let updatedItem;

    //changes made for the item which is already present in the Cart

    if(existingCartItem){
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    }

    // simple concatenation for adding a new item

    else{
      updatedItems = state.items.concat(action.item);
    }

    // updating the Cart state value accordingly

    return {
    items: updatedItems,
    totalAmount: updatedTotalAmount
    }
  }

  // Logic to reduce item stored in the Cart

  if(action.type === 'REDUCE'){

    // finding the item and reducing total sum by price of 1 unit of item

    const existingCartIndex = state.items.findIndex(item => item.id === action.id);
    const existingCartItem = state.items[existingCartIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    // checking if added amount of item is greater than 1, then we'll just reduce amount by 1

    if(existingCartItem.amount>1){
       let updateItem = {
         ...existingCartItem,
         amount:  existingCartItem.amount - 1
       };
       updatedItems = [...state.items];
       updatedItems[existingCartIndex]=updateItem;
    }

    // if only 1 amount of item is present, we'll delete item entry from Cart 
    else{
        updatedItems = state.items.filter(item => item.id !== action.id);
    }

    // updating the Cart values accordingly

     return {
       items: updatedItems,
       totalAmount: updatedTotalAmount
     };
  }

  // default case when there is no addition or deletion in Cart
  return defaultCart;
}

const CartProvider = (props) => {

  // useReducer hook to get access of states stored via cartState and dispatching any action of addition or deletion via dispatchcartAction method call
  
  const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCart);
  const addItemHandler = (item) => {
    dispatchCartAction({type:'ADD',item:item})
  }

  const removeItemHandler = (id) => {
    dispatchCartAction({type: 'REDUCE',id:id});
  }

  const clearItemsHandler = () => {
    dispatchCartAction({type:'CLEAR'});
  } 
  const cartData = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearItemsHandler
  }

  // wrapping elements in Provider to get globally access of stored data into its children elements
return (
  <CartContext.Provider value={cartData}>
   {props.children}
  </CartContext.Provider>
);
}

export default CartProvider;