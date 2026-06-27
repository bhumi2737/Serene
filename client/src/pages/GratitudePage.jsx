import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function GratitudePage() {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [saved, setSaved] = useState(false);
  const [pastEntries, setPastEntries] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

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

  const formattedToday = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

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
          {/* ── PAGE HEADER ── */}
          <div style={{ marginBottom: "24px", animation: "fadeInUp 0.5s ease forwards" }}>
            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#E2E8F0", letterSpacing: "-0.02em" }}>
              Gratitude
            </h1>
            <p style={{ fontSize: "13px", color: "#94A3B8", marginTop: "4px" }}>
              What are you grateful for today?
            </p>
          </div>

          {/* ── DUAL COLUMN GRID FOR WIDE DESKTOPS ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: pastEntries.length > 0 ? "1fr 1fr" : "1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Column 1: Today's check-in */}
            <div
              style={{
                backgroundColor: "rgba(26, 26, 46, 0.6)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                backdropFilter: "blur(12px)",
                animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
                opacity: 0,
              }}
            >
              <p style={{ fontSize: "12px", color: "#94A3B8", fontWeight: "600" }}>{formattedToday}</p>

              {inputs.map((val, i) => {
                const isFocused = focusedInput === i;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: val.trim() ? "#E2E8F0" : isFocused ? "rgba(124, 58, 237, 0.3)" : "#0F0E17",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: val.trim() ? "#0F0E17" : isFocused ? "#A78BFA" : "#94A3B8",
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>

                    <input
                      type="text"
                      value={val}
                      onFocus={() => setFocusedInput(i)}
                      onBlur={() => setFocusedInput(null)}
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
                        backgroundColor: "#0F0E17",
                        border: isFocused ? "1px solid rgba(124, 58, 237, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "10px",
                        padding: "12px",
                        fontSize: "13px",
                        color: "#E2E8F0",
                        outline: "none",
                        fontFamily: "inherit",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                  </div>
                );
              })}

              <button
                onClick={handleSave}
                disabled={!hasContent}
                style={{
                  marginTop: "4px",
                  backgroundColor: hasContent ? "#E2E8F0" : "#2A2A4A",
                  color: hasContent ? "#0F0E17" : "#94A3B8",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: hasContent ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                }}
              >
                {saved ? "Saved ✓" : "Save for today"}
              </button>
            </div>

            {/* Column 2: Past entries list */}
            {pastEntries.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
                  opacity: 0,
                }}
              >
                <div style={{ marginBottom: "4px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#E2E8F0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Past entries</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {pastEntries.map((group, gi) => (
                    <div
                      key={gi}
                      style={{
                        backgroundColor: "rgba(26, 26, 46, 0.6)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "20px",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <p style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "10px", fontWeight: "500" }}>{group.date}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {group.items.map((item, ii) => (
                          <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                            <div
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: "#7C3AED",
                                marginTop: "6px",
                                flexShrink: 0,
                              }}
                            />
                            <p style={{ fontSize: "13px", color: "#E2E8F0", lineHeight: "1.5" }}>{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GratitudePage;
