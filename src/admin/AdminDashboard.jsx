function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <a className="px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
            Dashboard
          </a>
          <a className="px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
            Manage Products
          </a>
          <a className="px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
            Add Product
          </a>
          <a className="px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
            Users
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-600 text-sm">Total Products</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">120</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-600 text-sm">Users</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">350</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-600 text-sm">Orders Today</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">14</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-gray-600 text-sm">Low Stock Items</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">6</p>
          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="mt-10 bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3">
            <li className="border-b pb-2 text-gray-700">
              ✔ New user registered — <span className="font-semibold">Aswin</span>
            </li>
            <li className="border-b pb-2 text-gray-700">
              ✔ Stock updated — <span className="font-semibold">Ocean Mist</span>
            </li>
            <li className="text-gray-700">
              ✔ New product added — <span className="font-semibold">Vanilla Woods</span>
            </li>
          </ul>
        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;
