import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AdminManageProducts() {
  const [data, setData] = useState([]);

  // FETCH PRODUCTS
  const getProducts = async () => {
    const response = await axios.get(`https://scentora-server.onrender.com/products`);
    setData(response.data);
  };

  // CALL API ON LOAD
  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this product?`
    );

    if (!confirmDelete) {
      return;
    } else {
      await axios.delete(`https://scentora-server.onrender.com/products/${id}`);
      getProducts();
    }
  };

  return (
    <div className="p-6">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Products</h1>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full text-left border-collapse">
          {/* TABLE HEADER */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Category</th>
              <th className="p-4">Rating</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY - REAL DATA */}
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-100">
                {/* IMAGE */}
                <td className="p-4">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>

                {/* NAME */}
                <td className="p-4 font-semibold text-gray-800">{p.name}</td>

                {/* BRAND */}
                <td className="p-4 text-gray-600">{p.brand}</td>

                {/* PRICE */}
                <td className="p-4 font-medium">₹{p.price}</td>

                {/* STOCK */}
                <td className="p-4">{p.stock}</td>

                {/* CATEGORY */}
                <td className="p-4 text-gray-600">{p.category}</td>

                {/* RATING */}
                <td className="p-4">{p.rating} ⭐</td>

                {/* ACTION BUTTONS */}
                <td className="p-4 flex gap-3 justify-center">
                  <Link to={`/admin/update-product/${p.id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManageProducts;
