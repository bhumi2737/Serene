const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "API error");
    return data;
  }
  if (!res.ok) throw new Error("API error");
  return null;
}

export default {
  // POST /api/auth/login
  login: async (email, password) => {
    return request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  },

  // POST /api/auth/register
  register: async (name, email, password) => {
    return request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
  },

  // GET /api/auth/me
  getMe: async (token) => {
    return request('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
