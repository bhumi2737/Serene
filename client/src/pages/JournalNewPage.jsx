import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        maxWidth: "390px",
        margin: "0 auto",
        minHeight: "100vh",
        backgroundColor: "#FAFAF8",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
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
            color: "#B0A99F",
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
            backgroundColor: text.trim() ? "#1C1917" : "#E8E4DF",
            color: text.trim() ? "#ffffff" : "#B0A99F",
            border: "none",
            borderRadius: "8px",
            padding: "6px 14px",
            fontSize: "12px",
            fontWeight: "500",
            cursor: text.trim() ? "pointer" : "not-allowed",
          }}
        >
          {saved ? "Saved ✓" : "Save"}
        </button>
      </div>

      {/* ── DATE ── */}
      <p style={{ fontSize: "11px", color: "#B0A99F" }}>
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
          borderBottom: "1px solid #E8E4DF",
          padding: "8px 0",
          fontSize: "16px",
          fontWeight: "500",
          color: "#1C1917",
          outline: "none",
          fontFamily: "inherit",
          width: "100%",
        }}
      />

      {/* ── BODY TEXTAREA ── */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write freely..."
        style={{
          flex: 1,
          minHeight: "60vh",
          backgroundColor: "transparent",
          border: "none",
          padding: "8px 0",
          fontSize: "14px",
          color: "#1C1917",
          lineHeight: "1.8",
          resize: "none",
          outline: "none",
          fontFamily: "inherit",
          width: "100%",
        }}
      />
    </div>
  );
}

export default JournalNewPage;
