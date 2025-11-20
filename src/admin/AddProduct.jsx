import axios from "axios";
import React, { useState } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    size_ml: "",
    category: "",
    image_url: "",
    stock: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Empty-field validation
    for (let key in formData) {
      if (!formData[key]) {
        alert(`${key} cannot be empty`);
        return;
      }
    }

    // 2. Data-type validation
    const validations = {
      price: {
        validate: (v) => !isNaN(v) && Number(v) > 0,
        message: "Price must be a valid positive number",
      },
      size_ml: {
        validate: (v) => !isNaN(v) && Number(v) > 0,
        message: "Size must be a valid number",
      },
      stock: {
        validate: (v) => !isNaN(v) && Number(v) >= 0,
        message: "Stock must be non-negative",
      },
      rating: {
        validate: (v) => !isNaN(v) && Number(v) >= 0 && Number(v) <= 5,
        message: "Rating must be between 0 and 5",
      },
      image_url: {
        validate: (v) =>
          v.startsWith("http://") || v.startsWith("https://"),
        message: "Image URL must be valid",
      },
    };

    for (let field in validations) {
      const { validate, message } = validations[field];
      if (!validate(formData[field])) {
        alert(message);
        return;
      }
    }

    // 3. Duplicate check
    try {
      const res = await axios.get("http://localhost:3001/products");
      const products = res.data;
      const duplicate = products.find(
        (p) => p.name.toLowerCase() === formData.name.toLowerCase()
      );

      if (duplicate) {
        alert("Product with this name already exists");
        return;
      }
    } catch (error) {
      console.error("Error fetching products for duplicate check:", error);
      alert("Unable to validate product duplication");
      return;
    }

    // 4. Prepare final data
    const finalData = {
      ...formData,
      price: Number(formData.price),
      size_ml: Number(formData.size_ml),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
    };

    // 5. POST to database
    try {
      await axios.post("http://localhost:3001/products", finalData);
      alert("Product added successfully!");

      // 6. Reset form
      setFormData({
        name: "",
        brand: "",
        description: "",
        price: "",
        size_ml: "",
        category: "",
        image_url: "",
        stock: "",
        rating: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Midnight Bloom"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Aetheria"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="A deep, sensual floral with jasmine, sandalwood, and dark cherry..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            ></textarea>
          </div>

          {/* Price + Size + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="125"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Size (ml)</label>
              <input
                type="number"
                name="size_ml"
                value={formData.size_ml}
                onChange={handleChange}
                placeholder="100"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="45"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Eau de Parfum (EDP)">Eau de Parfum (EDP)</option>
              <option value="Eau de Toilette (EDT)">Eau de Toilette (EDT)</option>
              <option value="Extrait de Parfum">Extrait de Parfum</option>
              <option value="Cologne">Cologne</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://dummyimage.com/400x400/8064A2/ffffff&text=Midnight+Bloom"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Rating</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.8"
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
