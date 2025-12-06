import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { form } from "framer-motion/m";

function AdminUpdateProduct() {
  const { id } = useParams(); // get product ID from URL
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  const getProduct = async () => {
    const res = await axios.get(`https://scentora-server.onrender.com/products?id=${id}`);
    setFormData(res.data[0]);
    
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <h2 className="p-6 text-center text-xl font-semibold">
        Loading product...
      </h2>
    );
  }

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Empty validation
    for (let key in formData) {
      if (!formData[key]) {
        alert(`${key} cannot be empty`);
        return;
      }
    }

    // 2. Data-type validations
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
        validate: (v) => v.startsWith("http://") || v.startsWith("https://"),
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

    // 3. Convert to numbers
    const finalData = {
      ...formData,
      price: Number(formData.price),
      size_ml: Number(formData.size_ml),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
    };

    
    // 5. PUT (UPDATE)
    await axios.put(`https://scentora-server.onrender.com/products/${id}`, finalData);
    alert("Product updated successfully!");
    navigate("/admin/manage-products");
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Update Product
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* NAME */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* BRAND */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Description
            </label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
          </div>

          {/* PRICE / SIZE / STOCK */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Size (ml)
              </label>
              <input
                type="number"
                name="size_ml"
                value={formData.size_ml}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Category</option>
              <option>Eau de Parfum (EDP)</option>
              <option>Eau de Toilette (EDT)</option>
              <option>Extrait de Parfum</option>
              <option>Cologne</option>
            </select>
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Image URL
            </label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* RATING */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* UPDATE BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdateProduct;
