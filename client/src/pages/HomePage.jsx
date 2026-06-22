import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const moods = [
  { emoji: "😔", label: "Low" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😊", label: "Good" },
  { emoji: "😄", label: "Great" },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const streakDone = [true, true, true, true, true, false, false];

function HomePage() {
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 390, maxWidth: '100%', paddingBottom: 96 }}>
        {/* Header */}
        <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: '#B0A99F' }}>Monday, Jun 15</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#1C1917' }}>Good evening</div>
          </div>

          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#E8E0D5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C1917', fontWeight: 500 }}>
            B
          </div>
        </div>

        {/* Mood check-in */}
        <div style={{ padding: 12 }}>
          <div style={{ marginBottom: 8, fontSize: 14, fontWeight: 500 }}>How are you feeling?</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {moods.map((mood, i) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(i)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  background: selectedMood === i ? '#1C1917' : '#F5F0EB',
                  color: selectedMood === i ? '#fff' : '#5C4F3D',
                  borderRadius: 12,
                  padding: 12,
                  border: 'none',
                }}
              >
                <div style={{ fontSize: 20 }}>{mood.emoji}</div>
                <div style={{ fontSize: 12, color: selectedMood === i ? '#fff' : '#B0A99F' }}>{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Weekly streak */}
        <div style={{ padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>This week</div>
              <div style={{ fontSize: 12, color: '#B0A99F' }}>5 day streak</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {weekDays.map((d, i) => (
              <div key={`day-${i}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: streakDone[i] ? '#1C1917' : '#F5F0EB', color: streakDone[i] ? '#fff' : '#5C4F3D' }}>
                  {streakDone[i] ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <div style={{ fontSize: 12 }}>{i + 1}</div>
                  )}
                </div>
                <div style={{ fontSize: 12, color: '#B0A99F' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            
            {/* Journal card */}
            <button
              onClick={() => navigate("/journal")}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                border: "1px solid #E8E4DF",
                padding: "16px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" fill="none" stroke="#5C4F3D" strokeWidth="1.8" viewBox="0 0 24 24" style={{ marginBottom: "10px", display: "block" }}>
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
              </svg>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#1C1917" }}>Journal</p>
              <p style={{ fontSize: "10px", color: "#B0A99F", marginTop: "3px" }}>Last entry 2h ago</p>
            </button>

            {/* Talk to AI card */}
            <button
              onClick={() => navigate("/chat")}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                border: "1px solid #E8E4DF",
                padding: "16px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" fill="none" stroke="#5C4F3D" strokeWidth="1.8" viewBox="0 0 24 24" style={{ marginBottom: "10px", display: "block" }}>
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#1C1917" }}>Talk to AI</p>
              <p style={{ fontSize: "10px", color: "#B0A99F", marginTop: "3px" }}>Here for you</p>
            </button>
          </div>

          {/* Gratitude card — full width */}
          <button
            onClick={() => navigate("/gratitude")}
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              border: "1px solid #E8E4DF",
              padding: "16px",
              textAlign: "left",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <svg width="18" height="18" fill="none" stroke="#5C4F3D" strokeWidth="1.8" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <div>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#1C1917" }}>Gratitude</p>
              <p style={{ fontSize: "10px", color: "#B0A99F", marginTop: "3px" }}>Log 3 things you're thankful for</p>
            </div>
          </button>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}

export default HomePage;
