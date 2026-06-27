import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// Emotion tag colors
const emotionStyles = {
  Hopeful: { background: "#EEF5E8", color: "#3B6D11" },
  Calm: { background: "#1A1A2E", color: "#A78BFA" },
  Anxious: { background: "#FEF9C3", color: "#854F0B" },
  Sad: { background: "#EFF6FF", color: "#1D4ED8" },
  Grateful: { background: "#FDF2F8", color: "#9D174D" },
};

function JournalPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "#0F0E17", position: "relative" }}>
      {/* Ambient Pulsing Glows */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "30%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.07) 0%, rgba(0,0,0,0) 70%)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "pulseGlow 12s ease-in-out infinite",
      }} />

      <Sidebar />
      <div
        style={{
          marginLeft: "240px",
          flex: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "40px 60px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* ── HEADER ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", animation: "fadeInUp 0.5s ease forwards" }}>
            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#E2E8F0", letterSpacing: "-0.02em" }}>Journal</h1>
            <button
              onClick={() => navigate("/journal/new")}
              style={{
                backgroundColor: "#E2E8F0",
                color: "#0F0E17",
                border: "none",
                borderRadius: "10px",
                padding: "8px 18px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Write
            </button>
          </div>

          {/* ── DATE LABEL ── */}
          <p style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "24px", fontWeight: "500", animation: "fadeInUp 0.5s ease 0.05s forwards", opacity: 0 }}>
            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          {/* ── ENTRY CARDS (stretched in a responsive grid layout) ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "18px",
            }}
          >
            {entries.map((entry, index) => {
              const tagStyle = emotionStyles[entry.emotion] || emotionStyles["Calm"];
              const isHovered = hoveredCard === entry.id;
              return (
                <div
                  key={entry.id}
                  onMouseEnter={() => setHoveredCard(entry.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: "rgba(26, 26, 46, 0.6)",
                    borderRadius: "16px",
                    border: isHovered ? "1px solid rgba(124, 58, 237, 0.25)" : "1px solid rgba(255, 255, 255, 0.08)",
                    padding: "20px",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    backdropFilter: "blur(12px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "160px",
                    animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08 + 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div>
                    {/* Top row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <p style={{ fontSize: "14px", fontWeight: "700", color: "#E2E8F0" }}>{entry.title}</p>
                      <span
                        style={{
                          fontSize: "10px",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontWeight: "600",
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
                        color: "#94A3B8",
                        lineHeight: "1.6",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        marginBottom: "16px",
                      }}
                    >
                      {entry.preview}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div
                    style={{
                      paddingTop: "12px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg width="12" height="12" fill="none" stroke="#94A3B8" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M9.5 2a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                      <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: "500" }}>
                        AI: {entry.aiDetected}
                      </span>
                    </div>
                    <span style={{ fontSize: "10px", color: "#94A3B8", fontWeight: "500" }}>{entry.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalPage;
