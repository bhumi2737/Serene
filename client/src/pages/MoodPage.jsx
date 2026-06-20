import React, { useState } from "react";
import BottomNav from "../components/BottomNav";

// Mood options with emoji, label, and a subtle color for the history dots
const moods = [
  { emoji: "😔", label: "Low",   color: "#93C5FD" }, // soft blue
  { emoji: "😐", label: "Okay",  color: "#D1D5DB" }, // light gray
  { emoji: "😊", label: "Good",  color: "#86EFAC" }, // soft green
  { emoji: "😄", label: "Great", color: "#FCD34D" }, // soft yellow
  { emoji: "🤩", label: "Amazing", color: "#F9A8D4" }, // soft pink
];

// Hardcoded past 7 days of mood data
// moodIndex refers to index in moods array above (0=Low, 1=Okay, 2=Good, 3=Great, 4=Amazing)
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

  // Handle save — for now just shows a confirmation, no real backend
  const handleSave = () => {
    if (selectedMood === null) return; // don't save if no mood selected
    setSaved(true);
    setTimeout(() => setSaved(false), 2000); // hide confirmation after 2s
  };

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 390, maxWidth: '100%', paddingBottom: 96 }}>

        {/* ── PAGE HEADER ── */}
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1C1917' }}>Mood</div>
          <div style={{ marginTop: 6, color: '#5C4F3D' }}>How are you feeling today?</div>
        </div>

        {/* ── SECTION 1: MOOD LOGGER ── */}
        <div style={{ padding: 12 }}>
          {/* Mood emoji selector */}
          <div style={{ display: 'flex', gap: 12 }}>
            {moods.map((mood, i) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(i)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: selectedMood === i ? '#1C1917' : 'transparent',
                  color: selectedMood === i ? '#fff' : '#1C1917',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: 12,
                  width: '100%',
                }}
              >
                {/* Emoji circle */}
                <div style={{ width: 48, height: 48, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: selectedMood === i ? '#1C1917' : '#F5F0EB' }}>
                  {mood.emoji}
                </div>

                {/* Label */}
                <div style={{ fontSize: 12, color: selectedMood === i ? '#fff' : '#5C4F3D' }}>{mood.label}</div>
              </button>
            ))}
          </div>

          {/* Note input — only show after mood is selected */}
          {selectedMood !== null && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, marginBottom: 8 }}>Add a note (optional)</div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
                rows={3}
                style={{
                  width: '100%',
                  backgroundColor: '#F5F0EB',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: '#1C1917',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  lineHeight: '1.6',
                }}
              />
            </div>
          )}

          {/* Save button */}
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSave}
              disabled={selectedMood === null}
              style={{
                background: selectedMood === null ? '#E8E4DF' : '#1C1917',
                color: selectedMood === null ? '#B0A99F' : '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: 10,
                cursor: selectedMood === null ? 'default' : 'pointer',
                fontWeight: 600,
              }}
            >
              {saved ? 'Saved ✓' : 'Save mood'}
            </button>
          </div>
        </div>

        {/* ── SECTION 2: THIS WEEK HEADER ── */}
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>This week</div>
          <div style={{ fontSize: 12, color: '#B0A99F', marginTop: 4 }}>Your mood over the last 7 days</div>
        </div>

        {/* ── SECTION 2: MOOD HISTORY CHART ── */}
        <div style={{ padding: 12 }}>
          {/* Bar chart area */}
          <div style={{ display: 'flex', alignItems: 'end', gap: 12, height: 120 }}>
            {weekHistory.map((entry, i) => {
              const heightPercent = entry.moodIndex !== null
                ? ((entry.moodIndex + 1) / moods.length) * 100
                : 6; // small placeholder for empty

              const barColor = entry.moodIndex !== null
                ? moods[entry.moodIndex].color
                : '#F5F0EB';

              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  {/* Bar */}
                  <div style={{ width: 28, height: `${heightPercent}%`, background: barColor, borderRadius: 8 }} />
                </div>
              );
            })}
          </div>

          {/* Day labels below bars */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingLeft: 6, paddingRight: 6 }}>
            {weekHistory.map((entry, i) => (
              <div key={i} style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ fontSize: 12, color: '#5C4F3D' }}>{entry.day}</div>
                <div style={{ marginTop: 6 }}>{entry.moodIndex !== null ? moods[entry.moodIndex].emoji : '—'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 3: MOOD LOG LIST ── */}
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Log</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {weekHistory
              .filter((entry) => entry.moodIndex !== null)
              .slice()
              .reverse()
              .map((entry, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: 12, padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Colored dot */}
                    <div style={{ width: 12, height: 12, borderRadius: 6, background: moods[entry.moodIndex].color }} />

                    {/* Day + note */}
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{entry.day}</div>
                      {entry.note && <div style={{ fontSize: 12, color: '#5C4F3D', marginTop: 4 }}>{entry.note}</div>}
                    </div>
                  </div>

                  {/* Emoji */}
                  <div style={{ fontSize: 20 }}>{moods[entry.moodIndex].emoji}</div>
                </div>
              ))}
          </div>
        </div>

      <BottomNav />
      </div>
    </div>
  );
}

export default MoodPage;
