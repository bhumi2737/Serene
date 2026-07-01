const BASE_URL = "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("serene_token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export async function getMoods() {
  const response = await fetch(`${BASE_URL}/moods`, {
    method: "GET",
    headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch moods.");
  }
  return data;
}

export async function saveMood(date, mood) {
  const response = await fetch(`${BASE_URL}/moods`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ date, mood }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to save mood.");
  }
  return data;
}

export async function getJournals() {
  const response = await fetch(`${BASE_URL}/journals`, {
    method: "GET",
    headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch journals.");
  }
  return data;
}

export async function createJournal(date, title, body) {
  const response = await fetch(`${BASE_URL}/journals`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ date, title, body }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create journal.");
  }
  return data;
}

export async function deleteJournal(id) {
  const response = await fetch(`${BASE_URL}/journals/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete journal.");
  }
  return data;
}

export async function getGratitude() {
  const response = await fetch(`${BASE_URL}/gratitude`, {
    method: "GET",
    headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch gratitude logs.");
  }
  return data;
}

export async function saveGratitude(date, items) {
  const response = await fetch(`${BASE_URL}/gratitude`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ date, items }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to save gratitude log.");
  }
  return data;
}
