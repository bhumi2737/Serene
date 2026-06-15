import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 10.5L12 4l9 6.5" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const IconInsights = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 3v18h18" />
    <path d="M7 13v6" />
    <path d="M12 9v10" />
    <path d="M17 5v14" />
  </svg>
);

const IconJournal = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 3h14v18H5z" />
    <path d="M9 7h6" />
  </svg>
);

const IconProfile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="8" r="3" />
    <path d="M6 20c1.5-3 4.5-4 6-4s4.5 1 6 4" />
  </svg>
);

const navItems = [
  { label: "Home", path: "/home", icon: <IconHome /> },
  { label: "Insights", path: "/insights", icon: <IconInsights /> },
  { label: "Journal", path: "/journal", icon: <IconJournal /> },
  { label: "Profile", path: "/profile", icon: <IconProfile /> },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed left-0 right-0 bottom-0 bg-serene-bg border-t border-serene-border">
      <div className="max-w-[390px] mx-auto">
        <div className="h-16 flex items-center justify-between px-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                color: pathname === item.path ? "#1C1917" : "#B0A99F",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {item.icon}
              <span style={{ fontSize: 11 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
