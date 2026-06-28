import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setError("");

    let hasError = false;
    if (!email.trim()) {
      setEmailError("This field is required.");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("This field is required.");
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("serene_token", data.token);
        if (data.name) localStorage.setItem("userName", data.name);
        if (data.email) localStorage.setItem("userEmail", data.email);
        navigate("/home");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-serene-bg text-serene-text font-sans">
      <div className="max-w-md w-full bg-serene-surface border border-serene-border rounded-lg p-8 md:p-10 shadow-sm animate-fade-in-up">
        <div className="text-center mb-8">
          <span className="text-2xl">🌿</span>
          <h2 className="text-2xl font-bold text-serene-primary font-serif mt-2">Welcome back</h2>
          <p className="text-xs text-serene-muted mt-1">A quieter place to understand how you feel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          <div>
            <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.trim()) setEmailError("");
              }}
              className="w-full bg-serene-bg border border-serene-border rounded-lg px-4 py-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
            />
            {emailError && <p className="text-serene-amber text-xs mt-1 font-sans">{emailError}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim()) setPasswordError("");
              }}
              className="w-full bg-serene-bg border border-serene-border rounded-lg px-4 py-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
            />
            {passwordError && <p className="text-serene-amber text-xs mt-1 font-sans">{passwordError}</p>}
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full py-2.5"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {error && (
          <div className="bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.2)] rounded-lg p-[10px_14px] text-[#B91C1C] text-[13px] mt-4 font-sans">
            {error}
          </div>
        )}

        <p className="text-center text-xs text-serene-muted mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-serene-primary font-semibold hover:underline"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
