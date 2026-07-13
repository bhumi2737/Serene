import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Save, Shield, Download, Trash2, LogOut, Check } from "lucide-react";
import { calculateStreak } from "../utils/streak";
import { getTheme, setTheme as setThemeUtil } from "../utils/theme";
import {
  isNotificationSupported,
  requestNotificationPermission,
  getNotificationPrefs,
  setNotificationPrefs
} from "../utils/notifications";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("Bhumi");
  const [email, setEmail] = useState("bhumi@example.com");
  const [reminderTime, setReminderTime] = useState("20:00");
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const [saved, setSaved] = useState(false);
  const [streak, setStreak] = useState(0);
  const [notificationError, setNotificationError] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    
    setStreak(calculateStreak());

    // Load active theme
    const activeTheme = getTheme();
    setTheme(activeTheme);

    // Load notification preferences
    const prefs = getNotificationPrefs();
    setNotifications(prefs.enabled);
    setReminderTime(prefs.time);

    const handleFocus = () => {
      setStreak(calculateStreak());
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  const handleSave = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setThemeUtil(newTheme);
  };

  const handleToggleNotifications = async () => {
    setNotificationError("");
    if (notifications) {
      setNotificationPrefs(false, reminderTime);
      setNotifications(false);
    } else {
      if (!isNotificationSupported()) {
        setNotificationError("Notifications aren't supported in this browser.");
        return;
      }
      const permission = await requestNotificationPermission();
      if (permission === "granted") {
        setNotificationPrefs(true, reminderTime);
        setNotifications(true);
      } else {
        setNotificationError("Notification permission was denied. You can enable it in your browser settings.");
      }
    }
  };

  const handleTimeChange = (newTime) => {
    setReminderTime(newTime);
    setNotificationPrefs(notifications, newTime);
  };

  const handleExport = () => {
    const data = {
      journal: JSON.parse(localStorage.getItem("serene_journals") || "[]"),
      gratitude: JSON.parse(localStorage.getItem("serene_gratitude") || "[]"),
      profile: { name, email, reminderTime, notifications, theme }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `serene-export-${name.toLowerCase().replace(/\s+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to permanently clear your local reflection logs? This action is irreversible.")) {
      localStorage.clear();
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("serene_token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const firstLetter = name.charAt(0).toUpperCase() || "U";

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Settings"
        subtitle="Manage your profile preferences, privacy, and data exports"
        className="dark:text-[#EDE8E0]"
      />

      {/* ── TWO COLUMN DESKTOP GRID / STACKED ON MOBILE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
        
        {/* Column 1: Account details */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          {/* Profile Overview Card */}
          <Card className="flex items-center gap-4 border-serene-border/50 p-6 bg-serene-surface/50 rounded-[20px] shadow-xs">
            <div className="w-16 h-16 rounded-full bg-serene-primary flex items-center justify-center text-white text-2.5xl font-bold font-serif shadow-sm">
              {firstLetter}
            </div>
            <div>
              <h2 className="text-lg font-bold text-serene-primary">{name}</h2>
              <p className="text-xs text-serene-muted">{email}</p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 bg-serene-primarySoft/60 text-serene-primary border border-serene-primary/10 text-[11.5px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                🔥 {streak} Day streak
              </div>
            </div>
          </Card>

          {/* Account Info Form Card */}
          <Card className="border-serene-border/50 p-7 bg-serene-surface/50 rounded-[20px] shadow-xs">
            <h3 className="text-[13px] font-bold text-serene-primary uppercase tracking-widest mb-4.5 font-sans">Account Info</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">
                  Display name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-serene-bg/30 border border-serene-border/60 rounded-lg p-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-serene-bg/30 border border-serene-border/60 rounded-lg p-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary transition-all duration-200"
                />
              </div>
            </div>
          </Card>

          {/* Privacy & Safety Card */}
          <Card className="border-serene-border/50 p-7 bg-serene-surface/50 rounded-[20px] shadow-xs">
            <h3 className="text-[13px] font-bold text-serene-primary uppercase tracking-widest mb-3 font-sans">Privacy & Safety</h3>
            <p className="text-xs text-serene-muted leading-relaxed mb-5">
              Your reflection texts and emotional logs are kept safe locally. Serene respects your absolute privacy and does not upload your personal notes to third-party services.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={handleExport}
                className="hover:scale-101 transition-transform"
              >
                Export data (JSON)
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Trash2}
                className="text-red-600 hover:bg-red-50/50 hover:text-red-700 border-red-200 hover:scale-101 transition-transform"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </div>

        {/* Column 2: Preferences */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          {/* Preference Settings Card */}
          <Card className="border-serene-border/50 p-7 bg-serene-surface/50 rounded-[20px] shadow-xs">
            <h3 className="text-[13px] font-bold text-serene-primary uppercase tracking-widest mb-4.5 font-sans">Preferences</h3>
            <div className="flex flex-col gap-5">
              {/* Reminder time */}
              <div>
                <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">
                  Daily Check-in reminder
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-full max-w-[180px] bg-serene-bg/30 border border-serene-border/60 rounded-lg p-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary transition-all duration-200"
                />
              </div>

              {/* Theme selector */}
              <div>
                <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">
                  Application Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="w-full max-w-[180px] bg-serene-bg/30 border border-serene-border/60 rounded-lg p-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary transition-all duration-200"
                >
                  <option value="light">Calm Light</option>
                  <option value="dark">Calm Dark</option>
                </select>
              </div>

              {/* Accessible Switch Notification Toggle */}
              <div className="flex flex-col pt-4 border-t border-serene-border/30">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-serene-primary">Browser notifications</h4>
                    <p className="text-xs text-serene-muted mt-0.5">Gentle reminders to check in daily</p>
                  </div>
                  
                  {/* Switch button */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifications}
                    onClick={handleToggleNotifications}
                    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-serene-primary cursor-pointer ${
                      notifications ? "bg-serene-primary" : "bg-serene-border"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        notifications ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                {notificationError && (
                  <p className="text-xs text-serene-amber mt-2 font-sans font-medium">
                    {notificationError}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-serene-border/50 p-7 bg-serene-surface/50 rounded-[20px] shadow-xs">
            <h3 className="text-[13px] font-bold text-serene-primary uppercase tracking-widest mb-3.5 font-sans">System Actions</h3>
            <Button
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
              className="w-full justify-start text-left hover:scale-101 transition-transform"
            >
              Sign out from this session
            </Button>
          </Card>
        </div>

      </div>

      {/* ── RIGHT ALIGNED SAVE BUTTON ROW ── */}
      <div className="flex justify-end gap-3 pb-8 border-t border-serene-border/30 pt-6">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saved}
          icon={saved ? Check : Save}
          className="shadow-xs hover:scale-102 transition-transform"
        >
          {saved ? "Changes saved" : "Save changes"}
        </Button>
      </div>

    </AppShell>
  );
}
