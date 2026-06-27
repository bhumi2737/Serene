import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/Button";

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
      // store token & details
      localStorage.setItem("token", res.token);
      localStorage.setItem("userName", res.name || name);
      localStorage.setItem("userEmail", res.email || email);
      navigate("/home");
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-serene-bg text-serene-text font-sans">
      <div className="max-w-md w-full bg-serene-surface border border-serene-border rounded-lg p-8 md:p-10 shadow-sm animate-fade-in-up">
        <div className="text-center mb-8">
          <span className="text-2xl">🌿</span>
          <h2 className="text-2xl font-bold text-serene-primary font-serif mt-2">Create Account</h2>
          <p className="text-xs text-serene-muted mt-1">A quieter place to understand how you feel</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-serene-bg border border-serene-border rounded-lg px-4 py-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-serene-bg border border-serene-border rounded-lg px-4 py-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-serene-bg border border-serene-border rounded-lg px-4 py-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
              required
            />
          </div>

          {error && <p className="text-xs font-semibold text-red-700 bg-red-50 p-2.5 rounded border border-red-200">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full py-2.5"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-center text-xs text-serene-muted mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-serene-primary font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
