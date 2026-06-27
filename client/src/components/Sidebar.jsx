import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Home",
    path: "/",
    end: true,
    icon: (color) => (
      <svg width="18" height="18" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Journal",
    path: "/journal",
    icon: (color) => (
      <svg width="18" height="18" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
      </svg>
    ),
  },
  {
    label: "Mood",
    path: "/mood",
    icon: (color) => (
      <svg width="18" height="18" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    label: "Chat",
    path: "/chat",
    icon: (color) => (
      <svg width="18" height="18" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Gratitude",
    path: "/gratitude",
    icon: (color) => (
      <svg width="18" height="18" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: "Insights",
    path: "/insights",
    icon: (color) => (
      <svg width="18" height="18" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Profile",
    path: "/profile",
    icon: (color) => (
      <svg width="18" height="18" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "#16213E",
        borderRight: "1px solid #2A2A4A",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        padding: "32px 16px",
        boxSizing: "border-box",
        zIndex: 1000,
      }}
    >
      {/* Logo Area */}
      <div style={{ paddingBottom: "32px", paddingLeft: "12px" }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#A78BFA" }}>🌿 Serene</div>
        <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px" }}>Your calm space</div>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
        {navItems.map((item, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 24px",
                borderRadius: "10px",
                borderLeft: "3px solid",
                borderLeftColor: isActive ? "#7C3AED" : "transparent",
                backgroundColor: isActive
                  ? "rgba(124, 58, 237, 0.15)"
                  : isHovered
                  ? "rgba(124, 58, 237, 0.05)"
                  : "transparent",
                color: isActive
                  ? "#A78BFA"
                  : isHovered
                  ? "#E2E8F0"
                  : "#94A3B8",
                fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
                fontSize: "14px",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              })}
            >
              {({ isActive }) => (
                <>
                  {item.icon(isActive ? "#A78BFA" : isHovered ? "#E2E8F0" : "#94A3B8")}
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Streak Info at bottom */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "24px",
          borderTop: "1px solid #2A2A4A",
          paddingLeft: "12px",
        }}
      >
        <div style={{ fontSize: "12px", color: "#94A3B8" }}>
          Day 10 streak 🔥
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
