import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Smile, BookOpen, BarChart3, User } from "lucide-react";

const navItems = [
  { label: "Home", path: "/home", icon: Home },
  { label: "Mood", path: "/mood", icon: Smile },
  { label: "Journal", path: "/journal", icon: BookOpen },
  { label: "Insights", path: "/insights", icon: BarChart3 },
  { label: "Profile", path: "/profile", icon: User },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-serene-surface border-t border-serene-border z-40 h-16 flex justify-around items-center px-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-serene-primary ${
              isActive ? "text-serene-primary font-semibold" : "text-serene-muted hover:text-serene-text"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-[10px] tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
