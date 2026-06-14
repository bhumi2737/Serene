import React, { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    api
      .getMe(token)
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        {user ? (
          <p className="text-gray-700">Hello, <strong>{user.name}</strong> — welcome to your Serene dashboard.</p>
        ) : (
          <p className="text-gray-600">No user data available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
