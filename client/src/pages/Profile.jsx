import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Save, Shield, Download, Trash2, LogOut, Check } from "lucide-react";
import { calculateStreak } from "../utils/streak";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("Bhumi");
  const [email, setEmail] = useState("bhumi@example.com");
  const [reminderTime, setReminderTime] = useState("20:00");
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const [saved, setSaved] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    
    setStreak(calculateStreak());

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

  const handleExport = () => {
    const data = {
      journal: JSON.parse(localStorage.getItem("serene_journal") || "[]"),
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
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const firstLetter = name.charAt(0).toUpperCase() || "U";

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Settings"
        subtitle="Manage your profile preferences, privacy, and data exports"
      />

      {/* ── TWO COLUMN DESKTOP GRID / STACKED ON MOBILE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
        
        {/* Column 1: Account details */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          {/* Profile Overview Card */}
          <Card className="flex items-center gap-4 border-serene-border">
            <div className="w-16 h-16 rounded-full bg-serene-primary flex items-center justify-center text-white text-2xl font-bold font-serif">
              {firstLetter}
            </div>
            <div>
              <h2 className="text-lg font-bold text-serene-primary">{name}</h2>
              <p className="text-xs text-serene-muted">{email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-serene-primarySoft text-serene-primary text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                🔥 {streak} Day streak
              </div>
            </div>
          </Card>

          {/* Account Info Form Card */}
          <Card className="border-serene-border">
            <h3 className="text-sm font-bold text-serene-primary uppercase tracking-wider mb-4">Account Info</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">
                  Display name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-serene-bg border border-serene-border rounded-lg p-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
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
                  className="w-full bg-serene-bg border border-serene-border rounded-lg p-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
                />
              </div>
            </div>
          </Card>

          {/* Privacy & Safety Card */}
          <Card className="border-serene-border">
            <h3 className="text-sm font-bold text-serene-primary uppercase tracking-wider mb-3">Privacy & Safety</h3>
            <p className="text-xs text-serene-muted leading-relaxed mb-4">
              Your entries and emotional history are stored locally. Serene does not upload reflection texts to unverified services.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={handleExport}
              >
                Export data (JSON)
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Trash2}
                className="text-red-700 hover:bg-red-50 hover:text-red-700 border-red-200"
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
          <Card className="border-serene-border">
            <h3 className="text-sm font-bold text-serene-primary uppercase tracking-wider mb-4">Preferences</h3>
            <div className="flex flex-col gap-5">
              {/* Reminder time */}
              <div>
                <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">
                  Daily Check-in reminder
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full max-w-[180px] bg-serene-bg border border-serene-border rounded-lg p-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
                />
              </div>

              {/* Theme selector */}
              <div>
                <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">
                  Application Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full max-w-[180px] bg-serene-bg border border-serene-border rounded-lg p-2.5 text-sm text-serene-text focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
                >
                  <option value="light">Calm Light</option>
                  <option value="dark">Dark (demo placeholder)</option>
                </select>
              </div>

              {/* Accessible Switch Notification Toggle */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-serene-border">
                <div>
                  <h4 className="text-sm font-semibold text-serene-primary">Browser notifications</h4>
                  <p className="text-xs text-serene-muted mt-0.5">Gentle reminders to check in daily</p>
                </div>
                
                {/* Switch button */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications}
                  onClick={() => setNotifications(!notifications)}
                  className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-serene-primary ${
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
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-serene-border">
            <h3 className="text-sm font-bold text-serene-primary uppercase tracking-wider mb-3">System Actions</h3>
            <Button
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
              className="w-full justify-start text-left"
            >
              Sign out from this session
            </Button>
          </Card>
        </div>

      </div>

      {/* ── RIGHT ALIGNED SAVE BUTTON ROW ── */}
      <div className="flex justify-end gap-3 pb-8 border-t border-serene-border pt-6">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saved}
          icon={saved ? Check : Save}
        >
          {saved ? "Changes saved" : "Save changes"}
        </Button>
      </div>

    </AppShell>
  );
}
