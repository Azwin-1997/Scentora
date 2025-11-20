import React from "react";

function AddProduct() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Product
        </h1>

        <form className="space-y-6">

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Midnight Bloom"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Brand</label>
            <input
              type="text"
              placeholder="Aetheria"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Description</label>
            <textarea
              rows="4"
              placeholder="A deep, sensual floral with jasmine, sandalwood, and dark cherry..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            ></textarea>
          </div>

          {/* Price + Size + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Price (₹)
              </label>
              <input
                type="number"
                placeholder="125"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Size (ml)
              </label>
              <input
                type="number"
                placeholder="100"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Stock
              </label>
              <input
                type="number"
                placeholder="45"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>

          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Category
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none">
              <option value="">Select Category</option>
              <option>Eau de Parfum (EDP)</option>
              <option>Eau de Toilette (EDT)</option>
              <option>Extrait de Parfum</option>
              <option>Cologne</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://dummyimage.com/400x400/8064A2/ffffff&text=Midnight+Bloom"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Rating</label>
            <input
              type="number"
              placeholder="4.8"
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-rose-700 transition"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;
