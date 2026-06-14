import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.register(name, email, password);
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Account 🌿</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

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
              {loading ? "Creating..." : "Create account"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default SignupPage;
