import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // fetch profile if token exists
    api
      .getMe(token)
      .then((data) => setUser(data))
      .catch(() => {
        // invalid token or network error — remove token
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-semibold mb-4">Serene <span>🌿</span></h1>
        <p className="text-gray-600 mb-8">
          Your calm space to track moods, journal your thoughts, and find peace.
        </p>

        {user ? (
          <div>
            <p className="text-gray-700 mb-4">Welcome back, <strong>{user.name}</strong>!</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-serene-primary text-white px-6 py-3 rounded-xl text-base font-medium"
              >
                Home
              </button>
              <button
                onClick={handleLogout}
                className="border border-serene-border text-serene-primary px-6 py-3 rounded-xl text-base font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-serene-primary text-white px-6 py-3 rounded-xl text-base font-medium"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-serene-border text-serene-primary px-6 py-3 rounded-xl text-base font-medium"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
