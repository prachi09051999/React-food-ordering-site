import React from 'react';

// variables and method states to be declared 
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item)=>{},
  removeItem: (id)=> {},
  clearCart: ()=>{}
});

export default CartContext;