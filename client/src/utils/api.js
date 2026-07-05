const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api`;

const getHeaders = () => {
  const token = localStorage.getItem("serene_token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export async function getMoods() {
  const response = await fetch(`${API_URL}/moods`, {
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
  const response = await fetch(`${API_URL}/moods`, {
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
  const response = await fetch(`${API_URL}/journals`, {
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
  const response = await fetch(`${API_URL}/journals`, {
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
  const response = await fetch(`${API_URL}/journals/${id}`, {
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
  const response = await fetch(`${API_URL}/gratitude`, {
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
  const response = await fetch(`${API_URL}/gratitude`, {
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

export async function sendChatMessage(messages) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ messages }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to send chat message.");
  }
  return data.reply;
}

export async function analyseJournal(text) {
  const response = await fetch(`${API_URL}/journal/analyse`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to analyse journal.");
  }
  return { emotions: data.emotions, summary: data.summary };
}

export async function updateJournalAnalysis(id, emotions, summary) {
  const response = await fetch(`${API_URL}/journals/${id}/analyse`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ emotions, summary }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update journal analysis.");
  }
  return data;
}
