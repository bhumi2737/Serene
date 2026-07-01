import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setError("");

    let hasError = false;
    if (!name.trim()) {
      setNameError("This field is required.");
      hasError = true;
    }
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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("serene_token", data.token);
        const nameVal = data.name || (data.user && data.user.name);
        const emailVal = data.email || (data.user && data.user.email);
        if (nameVal) localStorage.setItem("userName", nameVal);
        if (emailVal) localStorage.setItem("userEmail", emailVal);
        navigate("/home");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-serene-bg dark:bg-[#1C1B1F] text-serene-text dark:text-[#EDE8E0] font-sans">
      <div className="max-w-md w-full bg-serene-surface dark:bg-[#25232A] border border-serene-border dark:border-[#3A3742] rounded-lg p-8 md:p-10 shadow-sm animate-fade-in-up">
        <div className="text-center mb-8">
          <span className="text-2xl">🌿</span>
          <h2 className="text-2xl font-bold text-serene-primary dark:text-[#EDE8E0] font-serif mt-2">Create Account</h2>
          <p className="text-xs text-serene-muted dark:text-[#A39C8F] mt-1">A quieter place to understand how you feel</p>
        </div>

        <div className="space-y-5" autoComplete="off">
          <div>
            <label className="block text-xs font-semibold text-serene-muted dark:text-[#A39C8F] uppercase tracking-wider mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setNameError("");
              }}
              autoComplete="name"
              className="w-full bg-serene-bg dark:bg-[#1C1B1F] border border-serene-border dark:border-[#3A3742] rounded-lg px-4 py-2.5 text-sm text-serene-text dark:text-[#EDE8E0] focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
            />
            {nameError && <p className="text-serene-amber text-xs mt-1 font-sans">{nameError}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-serene-muted dark:text-[#A39C8F] uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.trim()) setEmailError("");
              }}
              autoComplete="username"
              className="w-full bg-serene-bg dark:bg-[#1C1B1F] border border-serene-border dark:border-[#3A3742] rounded-lg px-4 py-2.5 text-sm text-serene-text dark:text-[#EDE8E0] focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
            />
            {emailError && <p className="text-serene-amber text-xs mt-1 font-sans">{emailError}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-serene-muted dark:text-[#A39C8F] uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim()) setPasswordError("");
              }}
              autoComplete="new-password"
              className="w-full bg-serene-bg dark:bg-[#1C1B1F] border border-serene-border dark:border-[#3A3742] rounded-lg px-4 py-2.5 text-sm text-serene-text dark:text-[#EDE8E0] focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
            />
            {passwordError && <p className="text-serene-amber text-xs mt-1 font-sans">{passwordError}</p>}
          </div>

          <Button
            type="button"
            onClick={handleSignup}
            variant="primary"
            disabled={loading}
            className="w-full py-2.5"
          >
            {loading ? "Signing up..." : "Create account"}
          </Button>
        </div>

        {error && (
          <div className="bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.2)] rounded-lg p-[10px_14px] text-[#B91C1C] text-[13px] mt-4 font-sans">
            {error}
          </div>
        )}

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
