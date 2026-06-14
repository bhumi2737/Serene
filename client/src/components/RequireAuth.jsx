import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setAuthed(false);
      return;
    }
    api
      .getMe(token)
      .then(() => setAuthed(true))
      .catch(() => {
        localStorage.removeItem("token");
        setAuthed(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Checking authentication...</div>;
  if (!authed) return <Navigate to="/login" replace />;
  return children;
}

export default RequireAuth;
