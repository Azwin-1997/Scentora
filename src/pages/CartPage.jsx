import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";



function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);
  
  console.log(cartItems);

  // Fetch user cart on load
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    fetchCart(loggedInUser.id);
  }, []);

  // Fetch the cart from JSON server
  const fetchCart = async (userId) => {
    const res = await axios.get(
      `https://scentora-server.onrender.com/cart?userId=${userId}&_expand=product`
    );
    setCartItems(res.data);

    // update cart count globally
    const totalQty = res.data.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalQty);
  };

  // Increase quantity
  const increaseQty = async (item) => {
    await axios.patch(`https://scentora-server.onrender.com/cart/${item.id}`, {
      quantity: item.quantity + 1,
    });

    fetchCart(item.userId);
  };

  // Decrease quantity
  const decreaseQty = async (item) => {
    if (item.quantity === 1) {
      await axios.delete(`https://scentora-server.onrender.com/cart/${item.id}`);
    } else {
      await axios.patch(`https://scentora-server.onrender.com/cart/${item.id}`, {
        quantity: item.quantity - 1,
      });
    }

    fetchCart(item.userId);
  };

  // Remove item completely
  const removeItem = async (item) => {
    await axios.delete(`https://scentora-server.onrender.com/cart/${item.id}`);
    fetchCart(item.userId);
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mt-6">

      {/* Cart Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 bg-white shadow rounded-xl p-4"
              >
                {/* Image */}
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-lg object-cover border"
                />

                {/* Details */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-600 text-sm mt-1">
                    Price:{" "}
                    <span className="font-semibold text-gray-800">
                      ₹{item.product.price}
                    </span>
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="bg-gray-200 px-3 py-1 rounded-md text-lg font-semibold hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="font-semibold text-gray-800">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="bg-gray-200 px-3 py-1 rounded-md text-lg font-semibold hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item)}
                    className="mt-3 text-red-600 font-semibold hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* Total per item */}
                <div className="text-lg font-bold text-gray-800">
                  ₹{item.product.price * item.quantity}
                </div>
              </div>
            ))
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white shadow rounded-xl p-4 h-fit">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span className="font-semibold">₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Delivery</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>

          <div className="border-t my-3"></div>

          <div className="flex justify-between text-gray-900 text-lg font-bold mb-4">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
