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
const moodColors = ["#93C5FD", "#D1D5DB", "#86EFAC", "#FCD34D", "#F9A8D4"];

// Most common emotion tags from journal
const emotionSummary = [
  { label: "Hopeful",  count: 5, background: "#EEF5E8", color: "#3B6D11" },
  { label: "Calm",     count: 4, background: "#F5F0EB", color: "#5C4F3D" },
  { label: "Anxious",  count: 3, background: "#FEF9C3", color: "#854F0B" },
  { label: "Grateful", count: 2, background: "#FDF2F8", color: "#9D174D" },
];

// Stats cards
const stats = [
  { label: "Journal entries", value: "12", sub: "this month" },
  { label: "Avg mood", value: "😊", sub: "Good — this week" },
  { label: "Streak", value: "7", sub: "days in a row" },
  { label: "Gratitude logs", value: "9", sub: "this month" },
];

function InsightsPage() {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Max bar height in px
  const maxBarHeight = 160;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FAFAF8" }}>
      <Sidebar />
      <div style={{ marginLeft: "240px", flex: 1, padding: "48px 64px", maxWidth: "860px" }}>

        {/* ── PAGE HEADER ── */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "500", color: "#1C1917" }}>Insights</h1>
          <p style={{ fontSize: "14px", color: "#B0A99F", marginTop: "4px" }}>
            Your emotional patterns this week
          </p>
        </div>

        {/* ── STATS ROW ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                border: "1px solid #E8E4DF",
                padding: "20px",
              }}
            >
              <p style={{ fontSize: "28px", fontWeight: "500", color: "#1C1917" }}>{stat.value}</p>
              <p style={{ fontSize: "13px", fontWeight: "500", color: "#1C1917", marginTop: "8px" }}>{stat.label}</p>
              <p style={{ fontSize: "12px", color: "#B0A99F", marginTop: "2px" }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ── MOOD CHART + EMOTION TAGS (side by side) ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "16px", marginBottom: "32px" }}>

          {/* Mood bar chart */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #E8E4DF",
              padding: "24px",
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1C1917", marginBottom: "4px" }}>
              Mood this week
            </p>
            <p style={{ fontSize: "12px", color: "#B0A99F", marginBottom: "24px" }}>
              Daily mood check-ins
            </p>

            {/* Bars */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "12px",
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
                          backgroundColor: "#1C1917",
                          color: "#FAFAF8",
                          fontSize: "11px",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          whiteSpace: "nowrap",
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
                        backgroundColor: isHovered ? "#1C1917" : moodColors[entry.moodIndex],
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
            <div style={{ display: "flex", gap: "12px" }}>
              {weekData.map((entry, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <p style={{ fontSize: "12px", color: "#B0A99F" }}>{entry.day}</p>
                  <p style={{ fontSize: "14px", marginTop: "2px" }}>{moodEmojis[entry.moodIndex]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emotion tags summary */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #E8E4DF",
              padding: "24px",
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1C1917", marginBottom: "4px" }}>
              Journal emotions
            </p>
            <p style={{ fontSize: "12px", color: "#B0A99F", marginBottom: "24px" }}>
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
                        fontWeight: "500",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        backgroundColor: em.background,
                        color: em.color,
                      }}
                    >
                      {em.label}
                    </span>
                    <span style={{ fontSize: "12px", color: "#B0A99F" }}>{em.count} entries</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: "4px", backgroundColor: "#F5F0EB", borderRadius: "2px" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${(em.count / 5) * 100}%`,
                        backgroundColor: em.color,
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
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            border: "1px solid #E8E4DF",
            padding: "24px",
          }}
        >
          <p style={{ fontSize: "14px", fontWeight: "500", color: "#1C1917", marginBottom: "4px" }}>
            Weekly summary
          </p>
          <p style={{ fontSize: "12px", color: "#B0A99F", marginBottom: "16px" }}>
            Jun 9 – Jun 15
          </p>
          <p style={{ fontSize: "14px", color: "#5C4F3D", lineHeight: "1.8" }}>
            This was a mixed week emotionally. You started strong on Monday with a Good mood, dipped on Thursday feeling Low, but bounced back strongly by Friday feeling Amazing. Your journal entries show a pattern of hopefulness and reflection — you wrote 3 entries this week. Keep up the gratitude practice, it's showing positive effects on your mood trend.
          </p>

          {/* Highlight pills */}
          <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "8px", backgroundColor: "#EEF5E8", color: "#3B6D11" }}>
              📈 Mood improved by Friday
            </span>
            <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "8px", backgroundColor: "#F5F0EB", color: "#5C4F3D" }}>
              📓 3 journal entries
            </span>
            <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "8px", backgroundColor: "#FEF9C3", color: "#854F0B" }}>
              🔥 7 day streak
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default InsightsPage;
