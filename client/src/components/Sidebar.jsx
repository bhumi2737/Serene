import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Home",
    path: "/home",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    label: "Mood",
    path: "/mood",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    label: "Journal",
    path: "/journal",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
      </svg>
    ),
  },
  {
    label: "Chat",
    path: "/chat",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    label: "Gratitude",
    path: "/gratitude",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    label: "Insights",
    path: "/insights",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#FAFAF8",
        borderRight: "1px solid #E8E4DF",
        padding: "32px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "32px", paddingLeft: "12px" }}>
        <p style={{ fontSize: "18px", fontWeight: "600", color: "#1C1917" }}>Serene</p>
        <p style={{ fontSize: "12px", color: "#B0A99F", marginTop: "2px" }}>Your calm space</p>
      </div>

      {/* Nav items */}
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: isActive ? "#F5F0EB" : "transparent",
              color: isActive ? "#1C1917" : "#B0A99F",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: isActive ? "500" : "400",
              width: "100%",
              textAlign: "left",
              transition: "background-color 0.15s ease, color 0.15s ease",
            }}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}

      {/* Profile at bottom */}
      <div style={{ marginTop: "auto", paddingTop: "24px", borderTop: "1px solid #E8E4DF" }}>
        <button
          onClick={() => navigate("/profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: pathname === "/profile" ? "#F5F0EB" : "transparent",
            color: pathname === "/profile" ? "#1C1917" : "#B0A99F",
            cursor: "pointer",
            fontSize: "14px",
            width: "100%",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#E8E0D5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "500",
              color: "#5C4F3D",
            }}
          >
            B
          </div>
          Profile
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
