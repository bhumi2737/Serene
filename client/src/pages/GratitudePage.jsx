import React from "react";
import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

// Hardcoded past entries — grouped by date
// Each entry is one thing the user was grateful for
const pastEntries = [
  {
    date: "Saturday, Jun 14",
    items: [
      "Had a good night's sleep",
      "My friend called to check on me",
      "Finished reading a chapter of my book",
    ],
  },
  {
    date: "Friday, Jun 13",
    items: [
      "Made progress on my project",
      "Had a nice cup of chai in the evening",
    ],
  },
  {
    date: "Thursday, Jun 12",
    items: [
      "Family dinner felt warm and easy",
      "Learned something new today",
      "The weather was really nice",
    ],
  },
];

function GratitudePage() {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [saved, setSaved] = useState(false);
  const [pastEntries, setPastEntries] = useState([]);

  // Load past entries from localStorage when page loads
  useEffect(() => {
    const stored = localStorage.getItem("serene_gratitude");
    if (stored) {
      setPastEntries(JSON.parse(stored));
    }
  }, []);

  const handleChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const hasContent = inputs.some((val) => val.trim() !== "");

  const handleSave = () => {
    if (!hasContent) return;

    // Build today's entry
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    const newEntry = {
      date: today,
      items: inputs.filter((val) => val.trim() !== ""),
    };

    // Add to top of list and save to localStorage
    const updated = [newEntry, ...pastEntries];
    setPastEntries(updated);
    localStorage.setItem("serene_gratitude", JSON.stringify(updated));

    // Reset inputs and show confirmation
    setInputs(["", "", ""]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      style={{
        maxWidth: "390px",
        margin: "0 auto",
        minHeight: "100vh",
        backgroundColor: "#FAFAF8",
        padding: "24px 16px 100px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >

      {/* ── PAGE HEADER ── */}
      <div style={{ marginBottom: "4px" }}>
        <h1 style={{ fontSize: "18px", fontWeight: "500", color: "#1C1917" }}>
          Gratitude
        </h1>
        <p style={{ fontSize: "12px", color: "#B0A99F", marginTop: "4px" }}>
          What are you grateful for today?
        </p>
      </div>

      {/* ── TODAY'S ENTRY CARD ── */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #E8E4DF",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Date label */}
        <p style={{ fontSize: "11px", color: "#B0A99F" }}>Sunday, Jun 15</p>

        {/* 3 input fields — one per gratitude item */}
        {inputs.map((val, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Number circle */}
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: val.trim() ? "#1C1917" : "#F5F0EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background-color 0.15s ease",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  color: val.trim() ? "#FAFAF8" : "#B0A99F",
                }}
              >
                {i + 1}
              </span>
            </div>

            {/* Text input */}
            <input
              type="text"
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={
                i === 0
                  ? "I'm grateful for..."
                  : i === 1
                  ? "Something good today..."
                  : "One more thing..."
              }
              style={{
                flex: 1,
                backgroundColor: "#F5F0EB",
                border: "none",
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "13px",
                color: "#1C1917",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>
        ))}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!hasContent}
          style={{
            marginTop: "4px",
            backgroundColor: hasContent ? "#1C1917" : "#E8E4DF",
            color: hasContent ? "#ffffff" : "#B0A99F",
            border: "none",
            borderRadius: "10px",
            padding: "12px",
            fontSize: "13px",
            fontWeight: "500",
            cursor: hasContent ? "pointer" : "not-allowed",
            transition: "background-color 0.15s ease",
          }}
        >
          {saved ? "Saved ✓" : "Save for today"}
        </button>
      </div>

      {/* ── PAST ENTRIES ── */}
      {pastEntries.length > 0 && (
        <>
          <div style={{ marginTop: "8px" }}>
            <p style={{ fontSize: "13px", fontWeight: "500", color: "#1C1917" }}>Past entries</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {pastEntries.map((group, gi) => (
              <div
                key={gi}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #E8E4DF",
                  padding: "14px 16px",
                }}
              >
                <p style={{ fontSize: "11px", color: "#B0A99F", marginBottom: "10px" }}>{group.date}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {group.items.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "#E8E0D5",
                          marginTop: "5px",
                          flexShrink: 0,
                        }}
                      />
                      <p style={{ fontSize: "13px", color: "#1C1917", lineHeight: "1.5" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <BottomNav />
    </div>
  );
}

export default GratitudePage;
