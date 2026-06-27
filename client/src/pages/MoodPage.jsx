import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

// Mood options with emoji, label, and a subtle color for the history dots
const moods = [
  { emoji: "😔", label: "Low",   color: "#0D9488" }, // secondary
  { emoji: "😐", label: "Okay",  color: "#0D9488" }, // secondary
  { emoji: "😊", label: "Good",  color: "#7C3AED" }, // primary
  { emoji: "😄", label: "Great", color: "#7C3AED" }, // primary
  { emoji: "🤩", label: "Amazing", color: "#7C3AED" }, // primary
];

// Hardcoded past 7 days of mood data
const weekHistory = [
  { day: "Mon", moodIndex: 2, note: "Had a productive day" },
  { day: "Tue", moodIndex: 1, note: "Feeling a bit tired" },
  { day: "Wed", moodIndex: 3, note: "Great session with friends" },
  { day: "Thu", moodIndex: 0, note: "Stressed about placements" },
  { day: "Fri", moodIndex: 2, note: "Finished my project" },
  { day: "Sat", moodIndex: 3, note: "Relaxed at home" },
  { day: "Sun", moodIndex: null, note: "" }, // today — not logged yet
];

function MoodPage() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [hoveredMoodBtn, setHoveredMoodBtn] = useState(null);

  const handleSave = () => {
    if (selectedMood === null) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
            padding: "40px 60px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* ── PAGE HEADER ── */}
          <div style={{ padding: "16px 0", marginBottom: "16px", animation: "fadeInUp 0.5s ease forwards" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#E2E8F0', letterSpacing: "-0.02em" }}>Mood</div>
            <div style={{ marginTop: 6, color: '#A78BFA', fontWeight: "500" }}>How are you feeling today?</div>
          </div>

          {/* ── SECTION 1: MOOD LOGGER ── */}
          <div
            style={{
              backgroundColor: "rgba(26, 26, 46, 0.6)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "24px",
              marginBottom: "32px",
              backdropFilter: "blur(12px)",
              animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
              opacity: 0,
            }}
          >
            {/* Mood emoji selector */}
            <div style={{ display: 'flex', gap: 12 }}>
              {moods.map((mood, i) => {
                const isSelected = selectedMood === i;
                const isHovered = hoveredMoodBtn === i;
                return (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(i)}
                    onMouseEnter={() => setHoveredMoodBtn(i)}
                    onMouseLeave={() => setHoveredMoodBtn(null)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      background: isSelected ? '#E2E8F0' : isHovered ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                      color: isSelected ? '#0F0E17' : '#E2E8F0',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '12px 8px',
                      borderRadius: 12,
                      width: '100%',
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {/* Emoji circle */}
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      background: isSelected ? '#E2E8F0' : '#0F0E17',
                      transition: "all 0.2s ease"
                    }}>
                      {mood.emoji}
                    </div>

                    {/* Label */}
                    <div style={{ fontSize: 12, color: isSelected ? '#0F0E17' : '#A78BFA', fontWeight: "600" }}>{mood.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Note input — only show after mood is selected */}
            {selectedMood !== null && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 13, marginBottom: 8, color: "#E2E8F0", fontWeight: "600" }}>Add a note (optional)</div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={3}
                  style={{
                    width: '100%',
                    backgroundColor: '#0F0E17',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    color: '#E2E8F0',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: 'inherit',
                    lineHeight: '1.6',
                  }}
                />
              </div>
            )}

            {/* Save button */}
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleSave}
                disabled={selectedMood === null}
                style={{
                  background: selectedMood === null ? '#2A2A4A' : '#E2E8F0',
                  color: selectedMood === null ? '#94A3B8' : '#0F0E17',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: 10,
                  cursor: selectedMood === null ? 'default' : 'pointer',
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
              >
                {saved ? 'Saved ✓' : 'Save mood'}
              </button>
            </div>
          </div>

          {/* ── SECTION 2: THIS WEEK HEADER ── */}
          <div style={{ marginBottom: "16px", animation: "fadeInUp 0.6s ease 0.15s forwards", opacity: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', textTransform: "uppercase", letterSpacing: "0.05em" }}>This week</div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>Your mood over the last 7 days</div>
          </div>

          {/* ── SECTION 2: MOOD HISTORY CHART ── */}
          <div
            style={{
              backgroundColor: "rgba(26, 26, 46, 0.6)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "24px",
              marginBottom: "32px",
              backdropFilter: "blur(12px)",
              animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
              opacity: 0,
            }}
          >
            {/* Bar chart area */}
            <div style={{ display: 'flex', alignItems: 'end', gap: 12, height: 120 }}>
              {weekHistory.map((entry, i) => {
                const heightPercent = entry.moodIndex !== null
                  ? ((entry.moodIndex + 1) / moods.length) * 100
                  : 6; // small placeholder for empty

                const barColor = entry.moodIndex !== null
                  ? moods[entry.moodIndex].color
                  : '#2A2A4A';

                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    {/* Bar */}
                    <div style={{ width: "100%", height: `${heightPercent}%`, background: barColor, borderRadius: 8, transition: "height 0.3s ease" }} />
                  </div>
                );
              })}
            </div>

            {/* Day labels below bars */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              {weekHistory.map((entry, i) => (
                <div key={i} style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ fontSize: 12, color: '#A78BFA', fontWeight: "600" }}>{entry.day}</div>
                  <div style={{ marginTop: 6 }}>{entry.moodIndex !== null ? moods[entry.moodIndex].emoji : '—'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 3: MOOD LOG LIST ── */}
          <div style={{ animation: "fadeInUp 0.6s ease 0.25s forwards", opacity: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#E2E8F0', textTransform: "uppercase", letterSpacing: "0.05em" }}>Log</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {weekHistory
                .filter((entry) => entry.moodIndex !== null)
                .slice()
                .reverse()
                .map((entry, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(26, 26, 46, 0.6)', borderRadius: 12, padding: 12, border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: "blur(12px)" }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {/* Colored dot */}
                      <div style={{ width: 12, height: 12, borderRadius: 6, background: moods[entry.moodIndex].color }} />

                      {/* Day + note */}
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0' }}>{entry.day}</div>
                        {entry.note && <div style={{ fontSize: 12, color: '#A78BFA', marginTop: 4 }}>{entry.note}</div>}
                      </div>
                    </div>

                    {/* Emoji */}
                    <div style={{ fontSize: 20 }}>{moods[entry.moodIndex].emoji}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodPage;
