import React, { useEffect, useState } from "react";
import api from "../services/api";
import AppShell from "../components/AppShell";
import Card from "../components/Card";

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

  if (loading) {
    return (
      <AppShell>
        <div className="p-6 text-sm text-serene-muted">Loading session...</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto mt-10">
        <Card className="border-serene-border p-10 text-center">
          <h2 className="text-2xl font-bold font-serif text-serene-primary mb-4">Dashboard</h2>
          {user ? (
            <p className="text-serene-text leading-relaxed">
              Hello, <strong>{user.name}</strong> — welcome to your Serene dashboard.
            </p>
          ) : (
            <p className="text-serene-muted">No user data available.</p>
          )}
        </Card>
      </div>
    </AppShell>
  );
}

export default Dashboard;
