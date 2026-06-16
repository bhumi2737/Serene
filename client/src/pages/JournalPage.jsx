import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const emotionStyles = {
  Hopeful: { backgroundColor: "#EEF5E8", color: "#3B6D11" },
  Calm: { backgroundColor: "#F5F0EB", color: "#5C4F3D" },
  Anxious: { backgroundColor: "#FEF9C3", color: "#854F0B" },
  Sad: { backgroundColor: "#EFF6FF", color: "#1D4ED8" },
};

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JournalPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: "Evening reflection",
      preview:
        "I took a long walk today and noticed how small moments kept appearing around me...",
      emotion: "Hopeful",
      aiDetected: "reflective, proud",
      time: "8:42 PM",
    },
    {
      id: 2,
      title: "Morning check-in",
      preview:
        "Woke up feeling a bit off but did a breathing exercise that helped ground me.",
      emotion: "Calm",
      aiDetected: "grounded, present",
      time: "7:10 AM",
    },
    {
      id: 3,
      title: "Work stress",
      preview:
        "There was a meeting that made me anxious; my chest tightened and I rushed through tasks.",
      emotion: "Anxious",
      aiDetected: "overwhelmed, hurried",
      time: "3:22 PM",
    },
    {
      id: 4,
      title: "Quiet night",
      preview:
        "I miss the old routines. It's a soft sadness that sits with me as I tidy up.",
      emotion: "Sad",
      aiDetected: "melancholic",
      time: "10:05 PM",
    },
  ]);

  const [composing, setComposing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPreview, setNewPreview] = useState("");
  const [newEmotion, setNewEmotion] = useState("Hopeful");

  function nowTimeString() {
    return new Date().toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const handleSave = () => {
    if (!newTitle && !newPreview) return;
    const entry = {
      id: Date.now(),
      title: newTitle || "Untitled",
      preview: newPreview || "",
      emotion: newEmotion,
      aiDetected: "",
      time: nowTimeString(),
    };
    setEntries((prev) => [entry, ...prev]);
    setNewTitle("");
    setNewPreview("");
    setNewEmotion("Hopeful");
    setComposing(false);
  };

  const wrapperStyle = {
    maxWidth: 390,
    margin: "0 auto",
    minHeight: "100vh",
    backgroundColor: "#FAFAF8",
    padding: "24px 16px 100px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const pageTitleStyle = {
    fontSize: 18,
    fontWeight: 500,
    color: "#1C1917",
  };

  const writeBtnStyle = {
    backgroundColor: "#1C1917",
    color: "#ffffff",
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 12,
    border: "none",
    cursor: "pointer",
  };

  const dateLabelStyle = {
    fontSize: 11,
    color: "#B0A99F",
    marginTop: 20,
    marginBottom: 10,
  };

  const listStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 0,
  };

  const cardBaseStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #E8E4DF",
    borderRadius: 16,
    padding: 12,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div style={pageTitleStyle}>Journal</div>
        <button
          style={writeBtnStyle}
          onClick={() => setComposing((c) => !c)}
          aria-label="Write"
        >
          {composing ? "Close" : "Write"}
        </button>
      </div>

      <div style={dateLabelStyle}>{formatDate(new Date())}</div>

      {composing ? (
        <div style={{ ...cardBaseStyle, marginBottom: 12 }}>
          <input
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{
              fontSize: 13,
              padding: 8,
              marginBottom: 8,
              borderRadius: 8,
              border: "1px solid #E8E4DF",
            }}
          />
          <textarea
            placeholder="Write a quick note..."
            value={newPreview}
            onChange={(e) => setNewPreview(e.target.value)}
            rows={3}
            style={{
              fontSize: 12,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #E8E4DF",
              marginBottom: 8,
              resize: "vertical",
            }}
          />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select
              value={newEmotion}
              onChange={(e) => setNewEmotion(e.target.value)}
              style={{ padding: "6px 8px", borderRadius: 8, border: "1px solid #E8E4DF" }}
            >
              <option>Hopeful</option>
              <option>Calm</option>
              <option>Anxious</option>
              <option>Sad</option>
            </select>

            <button
              onClick={handleSave}
              style={{ backgroundColor: "#1C1917", color: "#fff", borderRadius: 8, padding: "8px 12px", border: "none", cursor: "pointer" }}
            >
              Save
            </button>

            <button
              onClick={() => setComposing(false)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8E4DF", background: "transparent", cursor: "pointer" }}
            >
              Cancel
            </button>

            <button
              onClick={() => navigate("/journal/new")}
              style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#1C1917", textDecoration: "underline", cursor: "pointer" }}
            >
              Open full editor
            </button>
          </div>
        </div>
      ) : null}

      <div style={listStyle}>
        {entries.map((e) => (
          <div key={e.id} style={cardBaseStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div
                style={{ fontSize: 13, fontWeight: 500, color: "#1C1917" }}
              >
                {e.title}
              </div>
              <div
                style={{
                  borderRadius: 6,
                  fontSize: 10,
                  padding: "3px 8px",
                  fontWeight: 500,
                  ...(emotionStyles[e.emotion] || {}),
                }}
              >
                {e.emotion}
              </div>
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#6B6460",
                lineHeight: 1.6,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                marginBottom: 10,
              }}
            >
              {e.preview}
            </div>

            <div
              style={{
                borderTop: "1px solid #E8E4DF",
                paddingTop: 10,
                marginTop: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C9.243 2 7 4.243 7 7c0 .74.18 1.436.5 2.05C5.88 10.83 5 12.815 5 15c0 3.866 3.134 7 7 7s7-3.134 7-7c0-2.185-.88-4.17-2.5-5.95A4.992 4.992 0 0 0 17 7c0-2.757-2.243-5-5-5z"
                    fill="#B0A99F"
                  />
                </svg>
                {e.aiDetected ? (
                  <div style={{ fontSize: 11, color: "#B0A99F" }}>
                    AI detected: {e.aiDetected}
                  </div>
                ) : null}
              </div>

              <div style={{ fontSize: 10, color: "#B0A99F" }}>{e.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto" }}>
        <BottomNav />
      </div>
    </div>
  );
}
