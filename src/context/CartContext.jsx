import React, { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const value = {
    cartCount,
    setCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
