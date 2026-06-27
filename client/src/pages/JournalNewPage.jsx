import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function JournalNewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!text.trim()) return;

    // Build new entry object
    const newEntry = {
      id: Date.now(),
      title: title.trim() || "Untitled",
      preview: text.trim().slice(0, 80) + (text.length > 80 ? "..." : ""),
      emotion: "Calm",
      aiDetected: "—",
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      date: "Today",
      fullText: text.trim(),
    };

    // Load existing entries, add new one to top, save back
    const stored = localStorage.getItem("serene_journal");
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [newEntry, ...existing];
    localStorage.setItem("serene_journal", JSON.stringify(updated));

    setSaved(true);
    setTimeout(() => navigate("/journal"), 1000);
  };

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
            padding: "48px 60px",
            width: "100%",
            boxSizing: "border-box",
            animation: "fadeInUp 0.5s ease forwards",
          }}
        >
          {/* ── HEADER ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Back button */}
            <button
              onClick={() => navigate("/journal")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#94A3B8",
                fontSize: "13px",
                padding: 0,
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              style={{
                backgroundColor: text.trim() ? "#E2E8F0" : "#2A2A4A",
                color: text.trim() ? "#0F0E17" : "#94A3B8",
                border: "none",
                borderRadius: "10px",
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: text.trim() ? "pointer" : "not-allowed",
                transition: "all 0.15s ease",
              }}
            >
              {saved ? "Saved ✓" : "Save"}
            </button>
          </div>

          {/* ── DATE ── */}
          <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "16px", fontWeight: "500" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>

          {/* ── TITLE INPUT ── */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            style={{
              backgroundColor: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "12px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: "#E2E8F0",
              outline: "none",
              fontFamily: "inherit",
              width: "100%",
              marginTop: "24px",
              marginBottom: "20px",
            }}
          />

          {/* ── BODY TEXTAREA ── */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write freely..."
            style={{
              minHeight: "60vh",
              backgroundColor: "transparent",
              border: "none",
              padding: "8px 0",
              fontSize: "15px",
              color: "#E2E8F0",
              lineHeight: "1.8",
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default JournalNewPage;
