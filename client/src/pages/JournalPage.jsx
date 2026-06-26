import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// Emotion tag colors
const emotionStyles = {
  Hopeful: { background: "#EEF5E8", color: "#3B6D11" },
  Calm: { background: "#F5F0EB", color: "#5C4F3D" },
  Anxious: { background: "#FEF9C3", color: "#854F0B" },
  Sad: { background: "#EFF6FF", color: "#1D4ED8" },
  Grateful: { background: "#FDF2F8", color: "#9D174D" },
};

function JournalPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage when page loads
  useEffect(() => {
    const stored = localStorage.getItem("serene_journal");
    if (stored) {
      setEntries(JSON.parse(stored));
    } else {
      // Default dummy entries if nothing saved yet
      const defaults = [
        {
          id: 1,
          title: "Evening reflection",
          preview: "Finished my project today. It felt really good to see everything come together...",
          emotion: "Hopeful",
          aiDetected: "reflective, proud",
          time: "8:42 PM",
          date: "Today",
        },
        {
          id: 2,
          title: "Morning pages",
          preview: "Couldn't sleep well. A lot on my mind about placements...",
          emotion: "Anxious",
          aiDetected: "anxious, tired",
          time: "8:15 AM",
          date: "Today",
        },
        {
          id: 3,
          title: "Sunday wind down",
          preview: "Read for an hour. No screens after 9pm. Felt grounded...",
          emotion: "Calm",
          aiDetected: "calm, peaceful",
          time: "10:00 PM",
          date: "Yesterday",
        },
      ];
      setEntries(defaults);
      localStorage.setItem("serene_journal", JSON.stringify(defaults));
    }
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FAFAF8" }}>
      <Sidebar />
      <div style={{ marginLeft: "240px", flex: 1, padding: "48px 64px", maxWidth: "860px" }}>
        {/* ── HEADER ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "18px", fontWeight: "500", color: "#1C1917" }}>Journal</h1>
          <button
            onClick={() => navigate("/journal/new")}
            style={{
              backgroundColor: "#1C1917",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Write
          </button>
        </div>

        {/* ── DATE LABEL ── */}
        <p style={{ fontSize: "11px", color: "#B0A99F" }}>
          {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        {/* ── ENTRY CARDS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {entries.map((entry) => {
            const tagStyle = emotionStyles[entry.emotion] || emotionStyles["Calm"];
            return (
              <div
                key={entry.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #E8E4DF",
                  padding: "14px 16px",
                }}
              >
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <p style={{ fontSize: "13px", fontWeight: "500", color: "#1C1917" }}>{entry.title}</p>
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      backgroundColor: tagStyle.background,
                      color: tagStyle.color,
                    }}
                  >
                    {entry.emotion}
                  </span>
                </div>

                {/* Preview */}
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6B6460",
                    lineHeight: "1.6",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {entry.preview}
                </p>

                {/* Bottom row */}
                <div
                  style={{
                    marginTop: "10px",
                    paddingTop: "10px",
                    borderTop: "1px solid #E8E4DF",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <svg width="12" height="12" fill="none" stroke="#B0A99F" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M9.5 2a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <span style={{ fontSize: "11px", color: "#B0A99F" }}>
                      AI: {entry.aiDetected}
                    </span>
                  </div>
                  <span style={{ fontSize: "10px", color: "#B0A99F" }}>{entry.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default JournalPage;
