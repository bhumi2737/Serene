import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Home() {
  const navigate = useNavigate();
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const stats = [
    { emoji: "📊", value: "7/10", label: "Mood Score" },
    { emoji: "📓", value: "3", label: "Journal Entries" },
    { emoji: "🌸", value: "5", label: "Gratitude Logs" },
    { emoji: "🔥", value: "10", label: "Day Streak" },
  ];

  const quickActions = [
    { label: "Log Mood", emoji: "😊", path: "/mood", color: "#7C3AED", rgb: "124, 58, 237" },
    { label: "Write in Journal", emoji: "✍️", path: "/journal", color: "#0D9488", rgb: "13, 148, 136" },
    { label: "Add Gratitude", emoji: "🙏", path: "/gratitude", color: "#F97316", rgb: "249, 115, 22" },
    { label: "Chat with AI", emoji: "💬", path: "/chat", color: "#A78BFA", rgb: "167, 139, 250" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "#0F0E17", position: "relative" }}>
      {/* Ambient Pulsing Glows */}
      <div style={{
        position: "absolute",
        top: "5%",
        left: "25%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.07) 0%, rgba(0,0,0,0) 70%)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "pulseGlow 12s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "5%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(13, 148, 136, 0.05) 0%, rgba(0,0,0,0) 70%)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "pulseGlow 15s ease-in-out infinite 2s",
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
        {/* Scrollable Container stretched to full desktop width */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "40px 60px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Hero Greeting Card */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(124, 58, 237, 0.22) 0%, rgba(13, 148, 136, 0.12) 100%)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "24px",
              padding: "36px 48px",
              marginBottom: "36px",
              backdropFilter: "blur(8px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "40px",
              animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <div>
              <div style={{ color: "#94A3B8", fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>
                {todayDate}
              </div>
              <h1 style={{ color: "#FFFFFF", fontSize: "38px", fontWeight: "800", margin: "0 0 8px 0", letterSpacing: "-0.03em" }}>
                {getGreeting()}, Bhumi 👋
              </h1>
              <p style={{ color: "#A78BFA", fontSize: "17px", margin: 0, fontWeight: "500" }}>
                How are you feeling today? Take a moment for yourself.
              </p>
            </div>

            {/* Vector Illustration (Sunset hills & calm ocean wave) */}
            <div style={{ animation: "float 6s ease-in-out infinite", flexShrink: 0, display: "block" }}>
              <svg width="240" height="150" viewBox="0 0 240 150" fill="none">
                <circle cx="120" cy="75" r="40" fill="url(#sunGradient)" />
                <path d="M10 130 C 60 70, 90 100, 140 60 C 190 100, 200 90, 230 130 Z" fill="rgba(124, 58, 237, 0.22)" stroke="rgba(124, 58, 237, 0.4)" strokeWidth="1.5" />
                <path d="M30 130 C 80 90, 110 110, 160 80 C 200 110, 210 105, 240 130 Z" fill="rgba(13, 148, 136, 0.18)" stroke="rgba(13, 148, 136, 0.3)" strokeWidth="1.5" />
                <path d="M0 125 Q 60 120, 120 125 T 240 125 L 240 150 L 0 150 Z" fill="#1A1A2E" opacity="0.9"/>
                <circle cx="50" cy="40" r="1.5" fill="#FFFFFF" opacity="0.6" />
                <circle cx="180" cy="30" r="2" fill="#FFFFFF" opacity="0.8" />
                <circle cx="210" cy="55" r="1.2" fill="#FFFFFF" opacity="0.4" />
                <defs>
                  <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Today at a Glance */}
          <h2 style={{
            color: "#E2E8F0",
            fontSize: "14px",
            fontWeight: "700",
            margin: "0 0 16px 0",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
            opacity: 0,
          }}>
            Today at a glance
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginBottom: "36px",
              animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards",
              opacity: 0,
            }}
          >
            {stats.map((stat, i) => {
              const isHovered = hoveredStat === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  style={{
                    backgroundColor: "rgba(26, 26, 46, 0.6)",
                    border: isHovered ? "1px solid rgba(124, 58, 237, 0.3)" : "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "20px",
                    padding: "24px",
                    textAlign: "center",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>{stat.emoji}</div>
                  <div style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: "800", marginBottom: "4px" }}>
                    {stat.value}
                  </div>
                  <div style={{ color: "#94A3B8", fontSize: "12px", fontWeight: "600" }}>{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <h2 style={{
            color: "#E2E8F0",
            fontSize: "14px",
            fontWeight: "700",
            margin: "0 0 16px 0",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards",
            opacity: 0,
          }}>
            Quick actions
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
              opacity: 0,
            }}
          >
            {quickActions.map((action, i) => {
              const isHovered = hoveredBtn === i;
              return (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  onMouseEnter={() => setHoveredBtn(i)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={{
                    backgroundColor: isHovered ? `rgba(${action.rgb}, 0.15)` : "rgba(26, 26, 46, 0.6)",
                    border: `1px solid ${isHovered ? action.color : "rgba(255, 255, 255, 0.08)"}`,
                    borderRadius: "20px",
                    padding: "32px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                    outline: "none",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>{action.emoji}</div>
                  <div style={{ color: "#E2E8F0", fontSize: "14px", fontWeight: "700", letterSpacing: "-0.01em" }}>
                    {action.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
