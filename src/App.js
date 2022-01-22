import { useState } from "react";
import Header from "./Components/Layout/Header/index";
import Meal from "./Components/Meals/Meal/index";
import Cart from "./Components/Cart/Cart/index";
import CartProvider from "./store/CartProvider";

function App() {
  // handling state of Cart shown as a Modal 
  const [isCartShown, setIsCartShown] = useState(false);

  const closeCart = () => {
    setIsCartShown(false);
  }

  const openCart = () => {
    setIsCartShown(true);
  }

  return (
    <CartProvider>
      {isCartShown && <Cart onClose={closeCart}/>}

      {/* passing openCart method as a prop to be accessed in HeaderCartButton component */}
      <Header onOpen={openCart}/>
      <main>
        <Meal/>
      </main>
    </CartProvider>
  );
}

export default App;
