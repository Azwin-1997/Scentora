import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";



function AddToCartButton({ productId }) {
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);

  const handleAddToCart = async () => {
    try {
      // 1. Check login
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser) {
        navigate("/login");
        return;
      }

      // 2. Fetch user's cart
      const res = await axios.get(
        `http://localhost:3001/cart?userId=${loggedInUser.id}`
      );
      const userCart = res.data;

      // 3. Check if product exists
      const existingItem = userCart.find(
        (item) => item.productId === Number(productId)
      );

      // 4A. Update quantity if exists
      if (existingItem) {
        await axios.patch(`http://localhost:3001/cart/${existingItem.id}`, {
          quantity: existingItem.quantity + 1,
        });

        setCartCount((prev) => prev + 1);
        alert("Quantity updated in cart");
        return;
      }

      // 4B. Add new item if it does not exist
      await axios.post(`http://localhost:3001/cart`, {
        userId: loggedInUser.id,
        productId: Number(productId),
        quantity: 1,
      });

      setCartCount((prev) => prev + 1);
      alert("Item added to cart");
    } catch (err) {
      console.error(err);
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
