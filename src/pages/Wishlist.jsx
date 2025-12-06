import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard"; // if needed

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [finalWishlist, setFinalWishlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // 1️⃣ Get wishlist for logged in user
  const getWishlist = async () => {
    const res = await axios.get(
      `https://scentora-server.onrender.com/wishlist?userId=${user.id}`
    );
    setWishlistItems(res.data);
  };

  // 2️⃣ Get all products
  const getProducts = async () => {
    const res = await axios.get(`https://scentora-server.onrender.com/products`);
    setProducts(res.data);
  };

  // 3️⃣ Map wishlist → actual product objects
  const mapWishlistToProducts = () => {
    const mapped = wishlistItems
      .map((item) => products.find((p) => p.id === item.productId))
      .filter(Boolean); // remove nulls
    setFinalWishlist(mapped);
  };

  // 4️⃣ Fetch wishlist + products on load
  useEffect(() => {
    getWishlist();
    getProducts();
  }, []);

  // 5️⃣ Re-map whenever wishlist or product list changes
  useEffect(() => {
    if (wishlistItems.length && products.length) {
      mapWishlistToProducts();
    }
  }, [wishlistItems, products]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {finalWishlist.length === 0 ? (
        <p className="text-gray-600">No items in wishlist ❌</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalWishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
