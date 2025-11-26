import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  const getDashboardData = async () => {
    // Fetch products
    const productRes = await axios.get(`http://localhost:3001/products`);
    const products = productRes.data;

    // Total Products
    setProductCount(products.length);

    // Low Stock → stock < 5
    const lowStockItems = products.filter((p) => p.stock < 5).length;
    setLowStock(lowStockItems);

    // Users count
    const userRes = await axios.get(`http://localhost:3001/users`);
    setUserCount(userRes.data.length);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <Link to="/admin/dashboard" className="px-4 py-2 rounded-lg hover:bg-gray-700">
            Dashboard
          </Link>

          <Link to="/admin/manage-products" className="px-4 py-2 rounded-lg hover:bg-gray-700">
            Manage Products
          </Link>

          <Link to="/admin/add-product" className="px-4 py-2 rounded-lg hover:bg-gray-700">
            Add Product
          </Link>

          <Link to="/admin/users" className="px-4 py-2 rounded-lg hover:bg-gray-700">
            Users
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

          <Link
            to="/admin/add-product"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Product
          </Link>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Products */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-600 text-sm">Total Products</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">{productCount}</p>
          </div>

          {/* Total Users */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-600 text-sm">Users</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">{userCount}</p>
          </div>

          {/* Orders Today (Static for now) */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-600 text-sm">Orders Today</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">14</p>
          </div>

          {/* Low Stock Items */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-600 text-sm">Low Stock Items</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">{lowStock}</p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
