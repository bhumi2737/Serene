import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Smile,
  MessageSquare,
  Heart,
  BarChart3,
  User,
  LogOut
} from "lucide-react";

const navItems = [
  { label: "Home", path: "/home", icon: Home },
  { label: "Mood", path: "/mood", icon: Smile },
  { label: "Journal", path: "/journal", icon: BookOpen },
  { label: "Insights", path: "/insights", icon: BarChart3 },
  { label: "Chat", path: "/chat", icon: MessageSquare },
  { label: "Gratitude", path: "/gratitude", icon: Heart },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    if (name) setUserName(name);
    if (email) setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <aside className="w-[220px] bg-serene-surface dark:bg-[#25232A] border-r border-serene-border dark:border-[#3A3742] h-screen fixed top-0 left-0 flex flex-col justify-between p-4 z-40">
      <div className="flex flex-col gap-6">
        {/* Logo */}
        <div className="px-3 py-2">
          <div className="text-xl font-bold text-serene-primary dark:text-[#EDE8E0] flex items-center gap-2">
            🌿 <span className="font-serif font-semibold">Serene</span>
          </div>
          <p className="text-[11px] text-serene-muted dark:text-[#A39C8F] mt-1 uppercase tracking-wider font-semibold">Your calm space</p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                    ? "bg-serene-primarySoft text-serene-primary font-semibold dark:bg-[#2A2830] dark:text-[#EDE8E0]"
                    : "text-serene-muted hover:text-serene-text hover:bg-serene-bg dark:text-[#A39C8F] dark:hover:text-[#EDE8E0] dark:hover:bg-[#1C1B1F]"
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User profile & Logout */}
      <div className="flex flex-col gap-2 pt-4 border-t border-serene-border dark:border-[#3A3742]">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors w-full overflow-hidden ${isActive
              ? "bg-serene-primarySoft text-serene-primary font-semibold dark:bg-[#2A2830] dark:text-[#EDE8E0]"
              : "text-serene-muted hover:text-serene-text hover:bg-serene-bg dark:text-[#A39C8F] dark:hover:text-[#EDE8E0] dark:hover:bg-[#1C1B1F]"
            }`
          }
        >
          <User className="w-4 h-4 flex-shrink-0" />
          <div className="flex flex-col overflow-hidden text-left">
            <span className="truncate text-xs font-semibold">{userName}</span>
            <span className="truncate text-[10px] text-serene-muted dark:text-[#A39C8F] font-normal">{userEmail}</span>
          </div>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-serene-muted dark:text-[#A39C8F] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-left w-full"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
