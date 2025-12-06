import axios from "axios";
import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }) {
  const addToWishlist = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      alert("Please login to add to wishlist");
      return;
    }

    // Check if already in wishlist
    const res = await axios.get(
      `http://localhost:3001/wishlist?userId=${loggedInUser.id}&productId=${product.id}`
    );

    if (res.data.length > 0) {
      alert("This product is already in your wishlist");
      return;
    }

    // Add to wishlist
    await axios.post("http://localhost:3001/wishlist", {
      userId: loggedInUser.id,
      productId: product.id,
    });

    alert("Added to Wishlist ❤️");
  };

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all bg-white overflow-hidden">
      
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-56 object-cover"
        />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
          ★ {product.rating}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold leading-tight">
          {product.name}
        </h2>

        <p className="text-xs text-gray-500 tracking-wide">
          {product.brand}
        </p>

        {/* Price + Size */}
        <div className="flex items-center justify-between">
          <p className="text-rose-600 font-bold text-lg">
            ₹{product.price}
          </p>
          <span className="text-xs text-gray-500">
            {product.size_ml} ml
          </span>
        </div>

        {/* Category */}
        <p className="text-[11px] text-gray-500 italic">
          {product.category}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <AddToCartButton product={product} />

          <button
            onClick={addToWishlist}
            className="flex-1 border border-rose-500 text-rose-600 text-sm py-2 rounded-lg hover:bg-rose-50 transition"
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
