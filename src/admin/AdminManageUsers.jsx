import axios from "axios";
import { useEffect, useState } from "react";

function AdminManageUsers() {
  const [data, setData] = useState([]);

  const handleUsers = async () => {
    const response = await axios.get(`http://localhost:3001/users`);
    setData(response.data);
  };

  useEffect(() => {
    handleUsers();
  }, []);

  const toggleBlock = async (user) => {
    await axios.patch(`http://localhost:3001/users/${user.id}`, {
      isBlocked: !user.isBlocked,
    });

    handleUsers(); // refresh table
  };

  return (
    <div className="p-6">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full text-left border-collapse">
          {/* HEADER */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY – DYNAMIC MAPPING */}
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                {/* NAME */}
                <td className="p-4 font-semibold text-gray-800">{user.name}</td>

                {/* EMAIL */}
                <td className="p-4 text-gray-600">{user.email}</td>

                {/* ROLE */}
                <td className="p-4 text-gray-600">{user.role}</td>

                {/* STATUS */}
                <td className="p-4 text-center">
                  {user.isBlocked ? (
                    <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                      Blocked
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                      Active
                    </span>
                  )}
                </td>

                {/* ACTION BUTTON */}
                <td className="p-4 text-center">
                  <button
                    className={`px-4 py-2 rounded-md text-white 
                      ${
                        user.isBlocked
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                  >
                    {user.isBlocked ? "Unblock User" : "Block User"}
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

export default AdminManageUsers;
