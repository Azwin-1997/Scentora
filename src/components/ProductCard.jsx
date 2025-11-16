import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }) {
  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition bg-white overflow-hidden">
      {/* Product Image */}
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-64 object-cover"
      />

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>

        {/* Price and Size */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-rose-600 font-bold text-lg">
            ₹{product.price.toFixed(2)}
          </p>
          <span className="text-sm text-gray-500">{product.size_ml} ml</span>
        </div>

        {/* Category */}
        <p className="text-xs text-gray-500 italic mb-2">
          {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <span className="text-yellow-500 text-sm mr-1">★</span>
          <span className="text-gray-700 text-sm font-medium">
            {product.rating}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <AddToCartButton productId={product.id}/>
          <button className="flex-1 border border-rose-600 text-rose-600 py-2 rounded-lg hover:bg-rose-50 transition">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
