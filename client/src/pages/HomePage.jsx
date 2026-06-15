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
              <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
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
        <div style={{ padding: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button onClick={() => navigate('/journal')} style={{ backgroundColor: '#fff', borderRadius: 16, border: '1px solid #E8E4DF', padding: 16, textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Journal</div>
            <div style={{ fontSize: 12, color: '#B0A99F', marginTop: 6 }}>Last entry 2h ago</div>
          </button>

          <button onClick={() => navigate('/chat')} style={{ backgroundColor: '#fff', borderRadius: 16, border: '1px solid #E8E4DF', padding: 16, textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Talk to AI</div>
            <div style={{ fontSize: 12, color: '#B0A99F', marginTop: 6 }}>Here for you</div>
          </button>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}

export default HomePage;
