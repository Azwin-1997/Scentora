import axios from "axios";
import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }) {
  const addToWishlist = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      alert("Please login to add to wishlist");
      return;
    }

    // check if already exists
    const res = await axios.get(
      `http://localhost:3001/wishlist?userId=${loggedInUser.id}&productId=${product.id}`
    );

    if (res.data.length > 0) {
      alert("This product is already in your wishlist");
      return;
    }

    // add to wishlist
    await axios.post("http://localhost:3001/wishlist", {
      userId: loggedInUser.id,
      productId: product.id,
    });

    alert("Added to Wishlist ❤️");
  };

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition bg-white overflow-hidden">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>

        <div className="flex items-center justify-between mb-3">
          <p className="text-rose-600 font-bold text-lg">₹{product.price}</p>
          <span className="text-sm text-gray-500">{product.size_ml} ml</span>
        </div>

        <p className="text-xs text-gray-500 italic mb-2">{product.category}</p>

        <div className="flex items-center mb-3">
          <span className="text-yellow-500 text-sm mr-1">★</span>
          <span className="text-gray-700 text-sm font-medium">
            {product.rating}
          </span>
        </div>

        <div className="flex gap-3">
          <AddToCartButton product={product} />

          <button
            onClick={addToWishlist}
            className="flex-1 border border-rose-600 text-rose-600 py-2 rounded-lg hover:bg-rose-50 transition"
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
