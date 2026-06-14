import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.login(email, password);
      // store token
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back 🌿</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl text-base font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-600 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
