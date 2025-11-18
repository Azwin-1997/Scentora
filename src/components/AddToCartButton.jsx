import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function AddToCartButton({ product }) {
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);

  const handleAddToCart = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser) {
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `http://localhost:3001/cart?userId=${loggedInUser.id}`
      );
      const userCart = res.data;

      const existingItem = userCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        await axios.patch(`http://localhost:3001/cart/${existingItem.id}`, {
          quantity: existingItem.quantity + 1,
        });

        setCartCount((prev) => prev + 1);
        alert("Quantity updated in cart");
        return;
      }

      await axios.post(`http://localhost:3001/cart`, {
        userId: loggedInUser.id,
        product: product,
        quantity: 1,
      });

      setCartCount((prev) => prev + 1);
      alert("Item added to cart");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition"
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
