import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

// Weekly mood data — 0=Low, 1=Okay, 2=Good, 3=Great, 4=Amazing
const weekData = [
  { day: "Mon", moodIndex: 2, label: "Good" },
  { day: "Tue", moodIndex: 1, label: "Okay" },
  { day: "Wed", moodIndex: 3, label: "Great" },
  { day: "Thu", moodIndex: 0, label: "Low" },
  { day: "Fri", moodIndex: 4, label: "Amazing" },
  { day: "Sat", moodIndex: 3, label: "Great" },
  { day: "Sun", moodIndex: 2, label: "Good" },
];

const moodEmojis = ["😔", "😐", "😊", "😄", "🤩"];
const moodColors = ["#0D9488", "#0D9488", "#7C3AED", "#7C3AED", "#7C3AED"];

// Most common emotion tags from journal
const emotionSummary = [
  { label: "Hopeful",  count: 5, background: "#EEF5E8", color: "#3B6D11" },
  { label: "Calm",     count: 4, background: "#1A1A2E", color: "#A78BFA" },
  { label: "Anxious",  count: 3, background: "#FEF9C3", color: "#854F0B" },
  { label: "Grateful", count: 2, background: "#FDF2F8", color: "#9D174D" },
];

// Stats cards
const stats = [
  { label: "Journal entries", value: "12", sub: "this month" },
  { label: "Avg mood", value: "😊", sub: "Good — this week" },
  { label: "Streak", value: "10", sub: "days in a row" },
  { label: "Gratitude logs", value: "9", sub: "this month" },
];

function InsightsPage() {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Max bar height in px
  const maxBarHeight = 160;

  const getWeeklyRange = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    const format = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${format(start)} – ${format(end)}`;
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
          <div style={{ marginBottom: "32px", animation: "fadeInUp 0.5s ease forwards" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#E2E8F0", letterSpacing: "-0.02em" }}>Insights</h1>
            <p style={{ fontSize: "14px", color: "#94A3B8", marginTop: "4px", fontWeight: "500" }}>
              Your emotional patterns this week
            </p>
          </div>

          {/* ── STATS ROW ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginBottom: "32px",
              animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
              opacity: 0,
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "rgba(26, 26, 46, 0.6)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "24px",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p style={{ fontSize: "32px", fontWeight: "800", color: "#E2E8F0" }}>{stat.value}</p>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "#E2E8F0", marginTop: "8px" }}>{stat.label}</p>
                <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px", fontWeight: "500" }}>{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* ── MOOD CHART + EMOTION TAGS (side by side, stretched) ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: "20px",
              marginBottom: "32px",
              animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
              opacity: 0,
            }}
          >
            {/* Mood bar chart */}
            <div
              style={{
                backgroundColor: "rgba(26, 26, 46, 0.6)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "24px",
                backdropFilter: "blur(12px)",
              }}
            >
              <p style={{ fontSize: "14px", fontWeight: "700", color: "#E2E8F0", marginBottom: "4px" }}>
                Mood this week
              </p>
              <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "24px", fontWeight: "500" }}>
                Daily mood check-ins
              </p>

              {/* Bars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "16px",
                  height: `${maxBarHeight}px`,
                  marginBottom: "12px",
                }}
              >
                {weekData.map((entry, i) => {
                  const barH = ((entry.moodIndex + 1) / 5) * maxBarHeight;
                  const isHovered = hoveredDay === i;
                  return (
                    <div
                      key={i}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: "6px" }}
                      onMouseEnter={() => setHoveredDay(i)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {/* Tooltip on hover */}
                      {isHovered && (
                        <div
                          style={{
                            backgroundColor: "#E2E8F0",
                            color: "#0F0E17",
                            fontSize: "11px",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            whiteSpace: "nowrap",
                            zIndex: 10,
                          }}
                        >
                          {entry.label}
                        </div>
                      )}
                      {/* Bar */}
                      <div
                        style={{
                          width: "100%",
                          height: `${barH}px`,
                          backgroundColor: isHovered ? "#A78BFA" : moodColors[entry.moodIndex],
                          borderRadius: "8px 8px 4px 4px",
                          transition: "background-color 0.15s ease, height 0.3s ease",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Day labels */}
              <div style={{ display: "flex", gap: "16px" }}>
                {weekData.map((entry, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <p style={{ fontSize: "12px", color: "#94A3B8", fontWeight: "600" }}>{entry.day}</p>
                    <p style={{ fontSize: "14px", marginTop: "2px" }}>{moodEmojis[entry.moodIndex]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotion tags summary */}
            <div
              style={{
                backgroundColor: "rgba(26, 26, 46, 0.6)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "24px",
                backdropFilter: "blur(12px)",
              }}
            >
              <p style={{ fontSize: "14px", fontWeight: "700", color: "#E2E8F0", marginBottom: "4px" }}>
                Journal emotions
              </p>
              <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "24px", fontWeight: "500" }}>
                AI detected this week
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {emotionSummary.map((em, i) => (
                  <div key={i}>
                    {/* Label + count */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          backgroundColor: em.background,
                          color: em.color,
                        }}
                      >
                        {em.label}
                      </span>
                      <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: "600" }}>{em.count} entries</span>
                    </div>
                    {/* Progress bar */}
                    <div style={{ height: "4px", backgroundColor: "#0F0E17", borderRadius: "2px" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${(em.count / 5) * 100}%`,
                          backgroundColor: "#0D9488",
                          borderRadius: "2px",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── WEEKLY SUMMARY CARD ── */}
          <div
            style={{
              backgroundColor: "rgba(26, 26, 46, 0.6)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "24px",
              backdropFilter: "blur(12px)",
              animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
              opacity: 0,
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#E2E8F0", marginBottom: "4px" }}>
              Weekly summary
            </p>
            <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "16px", fontWeight: "500" }}>
              {getWeeklyRange()}
            </p>
            <p style={{ fontSize: "14px", color: "#A78BFA", lineHeight: "1.8", fontWeight: "400" }}>
              This was a mixed week emotionally. You started strong on Monday with a Good mood, dipped on Thursday feeling Low, but bounced back strongly by Friday feeling Amazing. Your journal entries show a pattern of hopefulness and reflection — you wrote 3 entries this week. Keep up the gratitude practice, it's showing positive effects on your mood trend.
            </p>

            {/* Highlight pills */}
            <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "8px", backgroundColor: "#EEF5E8", color: "#3B6D11", fontWeight: "600" }}>
                📈 Mood improved by Friday
              </span>
              <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "8px", backgroundColor: "#1A1A2E", color: "#A78BFA", fontWeight: "600" }}>
                📓 3 journal entries
              </span>
              <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "8px", backgroundColor: "#FEF9C3", color: "#854F0B", fontWeight: "600" }}>
                🔥 10 day streak
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default InsightsPage;
