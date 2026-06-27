import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function Profile() {
  const [name, setName] = useState("Bhumi");
  const [email, setEmail] = useState("bhumi@example.com");
  const [reminderTime, setReminderTime] = useState("20:00");
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const cardStyle = {
    backgroundColor: "rgba(26, 26, 46, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "28px",
    backdropFilter: "blur(12px)",
  };

  const labelStyle = {
    color: "#94A3B8",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#0F0E17",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    color: "#E2E8F0",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const firstLetter = name.charAt(0).toUpperCase() || "B";

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
        {/* Independently Scrollable Container stretched to full width */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "40px 60px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Page Header */}
          <div style={{ marginBottom: "36px", animation: "fadeInUp 0.5s ease forwards" }}>
            <h1 style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: "700", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>
              Profile & Settings
            </h1>
            <p style={{ color: "#94A3B8", fontSize: "14px", margin: 0 }}>
              Manage your account and preferences
            </p>
          </div>

          {/* ── 2 COLUMN DESKTOP GRID LAYOUT ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Column 1 — Left side settings */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards", opacity: 0 }}>
              
              {/* Avatar card */}
              <div style={{ ...cardStyle, display: "flex", alignItems: "center", gap: "20px" }}>
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7C3AED, #0D9488)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: "bold" }}>
                    {firstLetter}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
                  <div style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: "600" }}>{name}</div>
                  <div style={{ color: "#94A3B8", fontSize: "13px" }}>{email}</div>
                  <div
                    style={{
                      backgroundColor: "rgba(124, 58, 237, 0.2)",
                      border: "1px solid rgba(124, 58, 237, 0.4)",
                      borderRadius: "20px",
                      padding: "4px 10px",
                      fontSize: "11px",
                      color: "#A78BFA",
                      display: "inline-flex",
                      alignItems: "center",
                      fontWeight: "600",
                    }}
                  >
                    🔥 Day 10 streak
                  </div>
                </div>
              </div>

              {/* Account Info card */}
              <div style={cardStyle}>
                <h2 style={{ color: "#E2E8F0", fontSize: "15px", fontWeight: "700", margin: "0 0 20px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Account Info
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Display Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2 — Right side Preferences & Journey */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards", opacity: 0 }}>
              
              {/* Preferences card */}
              <div style={cardStyle}>
                <h2 style={{ color: "#E2E8F0", fontSize: "15px", fontWeight: "700", margin: "0 0 20px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Preferences
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Daily Reminder Time */}
                  <div>
                    <label style={labelStyle}>Daily Reminder Time</label>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      style={{ ...inputStyle, marginBottom: "6px" }}
                    />
                    <span style={{ color: "#94A3B8", fontSize: "12px", fontWeight: "500" }}>
                      We'll remind you to log your mood and journal at this time.
                    </span>
                  </div>

                  {/* Browser Notifications Toggle */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "#E2E8F0", fontSize: "14px", fontWeight: "600" }}>
                        Browser Notifications
                      </div>
                      <div style={{ color: "#94A3B8", fontSize: "12px", marginTop: "2px", fontWeight: "500" }}>
                        Get gentle reminders throughout the day
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <div
                      onClick={() => setNotifications(!notifications)}
                      style={{
                        width: "48px",
                        height: "26px",
                        borderRadius: "13px",
                        backgroundColor: notifications ? "#7C3AED" : "#2A2A4A",
                        cursor: "pointer",
                        position: "relative",
                        transition: "background-color 0.2s ease",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#FFFFFF",
                          position: "absolute",
                          top: "3px",
                          left: notifications ? "25px" : "3px",
                          transition: "left 0.2s ease",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Journey card */}
              <div style={cardStyle}>
                <h2 style={{ color: "#E2E8F0", fontSize: "15px", fontWeight: "700", margin: "0 0 20px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Your Journey
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  {/* Stat Mini-card 1 */}
                  <div
                    style={{
                      backgroundColor: "#0F0E17",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "22px", marginBottom: "4px" }}>📓</div>
                    <div style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}>18</div>
                    <div style={{ color: "#94A3B8", fontSize: "11px", marginTop: "2px", fontWeight: "500" }}>Journal Entries</div>
                  </div>
                  {/* Stat Mini-card 2 */}
                  <div
                    style={{
                      backgroundColor: "#0F0E17",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "22px", marginBottom: "4px" }}>📊</div>
                    <div style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}>10</div>
                    <div style={{ color: "#94A3B8", fontSize: "11px", marginTop: "2px", fontWeight: "500" }}>Mood Logs</div>
                  </div>
                  {/* Stat Mini-card 3 */}
                  <div
                    style={{
                      backgroundColor: "#0F0E17",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "22px", marginBottom: "4px" }}>🌸</div>
                    <div style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}>24</div>
                    <div style={{ color: "#94A3B8", fontSize: "11px", marginTop: "2px", fontWeight: "500" }}>Gratitude Notes</div>
                  </div>
                </div>
              </div>

              {/* Save Button inside second column */}
              <button
                onClick={handleSave}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: saved ? "#0D9488" : "#7C3AED",
                  border: "none",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                  outline: "none",
                }}
              >
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
