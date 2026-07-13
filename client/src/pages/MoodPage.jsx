import React, { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Smile, Check, AlertCircle } from "lucide-react";
import { getTheme } from "../utils/theme";
import { getMoods, saveMood } from "../utils/api";

const moodsList = [
  { emoji: "😔", label: "Low", value: 1 },
  { emoji: "😐", label: "Okay", value: 2 },
  { emoji: "😊", label: "Good", value: 3 },
  { emoji: "😄", label: "Great", value: 4 },
  { emoji: "🤩", label: "Amazing", value: 5 },
];

const moodValueMap = {
  Low: 1,
  Okay: 2,
  Good: 3,
  Great: 4,
  Amazing: 5,
};

const getMoodTheme = (label) => {
  const map = {
    Low: { bg: "bg-[#F3F4F6] text-[#4B5563] border-[#9CA3AF]", hover: "hover:border-[#9CA3AF]" },
    Okay: { bg: "bg-[#E3D9C9]/35 text-[#7C2D12] border-[#E3D9C9]", hover: "hover:border-[#C8B195]" },
    Good: { bg: "bg-[#D6C7FF]/40 text-[#4C1D95] border-[#D6C7FF]", hover: "hover:border-[#C4B5FD]" },
    Great: { bg: "bg-[#FCDAB7]/45 text-[#9A3412] border-[#FCDAB7]", hover: "hover:border-[#FDBA74]" },
    Amazing: { bg: "bg-serene-primarySoft text-serene-primary border-serene-primary/55", hover: "hover:border-serene-primary" },
  };
  return map[label] || { bg: "bg-serene-primarySoft text-serene-primary border-serene-primary/55", hover: "hover:border-serene-primary" };
};

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isDark = getTheme() === "dark";

  // Compute Monday of the current week (Monday to Sunday)
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    weekDays.push({
      name: dayNames[i],
      dateStr,
      isToday: dateStr === today.toISOString().split("T")[0],
    });
  }

  // Load mood entries on mount
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        setError("");
        const data = await getMoods();
        setMoods(data);

        const todayString = today.toISOString().split("T")[0];
        const todayEntry = data.find((m) => m.date === todayString);
        if (todayEntry) {
          setSelectedMood(todayEntry.mood);
        }
      } catch (err) {
        setError(err.message || "Failed to load moods.");
      } finally {
        setLoading(false);
      }
    };
    fetchMoods();
  }, []);

  const handleMoodClick = async (moodLabel) => {
    setSelectedMood(moodLabel);
    const todayString = new Date().toISOString().split("T")[0];
    try {
      setError("");
      const savedMood = await saveMood(todayString, moodLabel);
      setMoods((prev) => {
        const existingIndex = prev.findIndex((m) => m.date === todayString);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = savedMood;
          return updated;
        } else {
          return [...prev, savedMood];
        }
      });
    } catch (err) {
      setError(err.message || "Failed to save mood.");
    }
  };

  const handleSave = async () => {
    if (!selectedMood) return;
    const todayString = new Date().toISOString().split("T")[0];
    try {
      setError("");
      setSaved(true);
      const savedMood = await saveMood(todayString, selectedMood);
      setMoods((prev) => {
        const existingIndex = prev.findIndex((m) => m.date === todayString);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = savedMood;
          return updated;
        } else {
          return [...prev, savedMood];
        }
      });
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to save mood.");
      setSaved(false);
    }
  };

  // Filter moods that fall within the current week
  const weeklyMoodsCount = weekDays.reduce((acc, day) => {
    const entry = moods.find((m) => m.date === day.dateStr);
    if (entry) acc += 1;
    return acc;
  }, 0);

  if (loading) {
    return (
      <AppShell>
        <PageHeader
          title="Mood Tracker"
          subtitle="Log your emotional check-ins to monitor wellness patterns"
        />
        <div className="p-6 text-sm text-serene-muted">Loading mood logs...</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Mood Tracker"
        subtitle="Log your emotional check-ins to monitor wellness patterns"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Logger Card */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="border-serene-border">
            <h2 className="text-base font-bold text-serene-primary font-serif mb-2">How are you feeling right now?</h2>
            <p className="text-xs text-serene-muted mb-6">Select a mood option below to record your logs.</p>

            {error && (
              <p className="text-serene-amber text-xs mb-4 font-sans font-medium">
                {error}
              </p>
            )}

            {/* Mood selector buttons */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {moodsList.map((mood) => {
                const isSelected = selectedMood === mood.label;
                const theme = getMoodTheme(mood.label);
                return (
                  <button
                    key={mood.label}
                    onClick={() => handleMoodClick(mood.label)}
                    className={`flex flex-col items-center justify-center p-4 rounded-[20px] border shadow-xs transition-all duration-300 hover:scale-102 cursor-pointer ${
                      isSelected
                        ? `${theme.bg} font-bold scale-[1.03]`
                        : `border-serene-border/50 bg-serene-surface text-serene-text ${theme.hover}`
                    }`}
                  >
                    <span className="text-3xl mb-2">{mood.emoji}</span>
                    <span className="text-[11px] tracking-wider uppercase font-semibold">{mood.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Conditional note and submit triggers */}
            {selectedMood !== "" && (
              <div className="border-t border-serene-border pt-5 animate-fade-in">
                <label className="block text-xs font-semibold text-serene-muted uppercase tracking-wider mb-2">
                  Add optional reflections or context
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What is influencing your emotional state today?"
                  rows={3}
                  className="w-full bg-serene-bg border border-serene-border rounded-lg p-3 text-sm text-serene-text placeholder-serene-muted focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary resize-none mb-4"
                />

                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={saved}
                    icon={saved ? Check : undefined}
                  >
                    {saved ? "Mood logged" : "Save mood check-in"}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Neutral Summary notice */}
          <div className="flex items-center gap-3 p-4 bg-serene-primarySoft/30 border border-serene-border rounded-lg text-xs text-serene-text">
            <AlertCircle className="w-4 h-4 text-serene-primary flex-shrink-0" />
            <p className="leading-relaxed">
              <strong>Wellness note:</strong> Tracking your mood can build self-reflection and emotional awareness. This visualization reflects database logs for your profile.
            </p>
          </div>
        </div>

        {/* Right Side: Plain SVG Bar Chart (This week's moods) */}
        <div className="flex flex-col gap-6">
          <Card className="border-serene-border">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-serene-primary uppercase tracking-wider">This week's moods</h3>
              <p className="text-[11px] text-serene-muted mt-0.5">
                {monday.toLocaleDateString("en-US", { month: "short", day: "numeric" })} –{" "}
                {sunday.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>

            <div className="h-44 w-full flex flex-col justify-end">
              <svg width="100%" height="90" viewBox="0 0 700 90" preserveAspectRatio="none" className="overflow-visible">
                {weekDays.map((day, idx) => {
                  const entry = moods.find((m) => m.date === day.dateStr);
                  const val = entry ? moodValueMap[entry.mood] || 0 : 0;
                  const barHeight = val * 18; // scaled to a max height of 90px (5 * 18)
                  const y = 90 - barHeight;
                  const x = 35 + idx * 95; // 7 bars distributed
                  
                  const moodColorMap = {
                    Low: "#9CA3AF",
                    Okay: "#C8B195",
                    Good: "#A78BFA",
                    Great: "#FB923C",
                    Amazing: "#4D7C59",
                  };
                  const barFill = entry ? moodColorMap[entry.mood] || "#4D7C59" : "transparent";

                  return (
                    <g key={day.name}>
                      {/* Empty track */}
                      <rect
                        x={x}
                        y={0}
                        width="30"
                        height={90}
                        rx="15"
                        fill="#FAF9F6"
                        stroke="#E2E8F0"
                        strokeWidth="1.5"
                        strokeDasharray={entry ? "none" : "2,2"}
                        className="opacity-70"
                      />
                      {/* Active bar */}
                      {val > 0 && (
                        <rect
                          x={x}
                          y={y}
                          width="30"
                          height={barHeight}
                          rx="15"
                          fill={barFill}
                          className="transition-all duration-300 hover:opacity-85"
                        />
                      )}
                      {/* Today dot indicator */}
                      {day.isToday && (
                        <circle
                          cx={x + 15}
                          cy={val > 0 ? y + 5 : 82}
                          r="3.5"
                          fill="#1E293B"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Day Labels Row */}
              <div className="grid grid-cols-7 text-center mt-3 border-t border-serene-border pt-2">
                {weekDays.map((day) => (
                  <span
                    key={day.name}
                    className={`text-[11px] font-sans ${
                      day.isToday ? "font-bold text-serene-text" : "text-serene-muted"
                    }`}
                  >
                    {day.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-serene-border pt-4 mt-6 text-center">
              <p className="text-xs font-semibold text-serene-primary">
                You checked in {weeklyMoodsCount} times this week
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
