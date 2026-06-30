import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { calculateStreak } from "../utils/streak";

const moods = [
  { emoji: "😔", label: "Low" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😊", label: "Good" },
  { emoji: "😄", label: "Great" },
  { emoji: "🤩", label: "Amazing" },
];

const moodValueMap = {
  Low: 1,
  Okay: 2,
  Good: 3,
  Great: 4,
  Amazing: 5,
};

export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Bhumi");
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodSaved, setMoodSaved] = useState(false);

  // States to trigger re-renders or updates for calculations
  const [weeklyStats, setWeeklyStats] = useState({
    journalCount: 0,
    gratitudeCount: 0,
    moodCount: 0,
    avgMoodLabel: "No data yet",
    avgMoodEmoji: "",
    streakCount: 0,
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).toUpperCase();

  const loadWeeklyStats = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const mondayString = monday.toISOString().split("T")[0];
    const sundayString = sunday.toISOString().split("T")[0];

    const storedJournals = localStorage.getItem("serene_journals");
    const journals = storedJournals ? JSON.parse(storedJournals) : [];
    const journalCount = journals.filter(
      (entry) => entry.date >= mondayString && entry.date <= sundayString
    ).length;

    const storedGratitude = localStorage.getItem("serene_gratitude");
    const gratitude = storedGratitude ? JSON.parse(storedGratitude) : [];
    const gratitudeCount = gratitude.filter(
      (entry) => entry.date >= mondayString && entry.date <= sundayString
    ).length;

    const storedMoods = localStorage.getItem("serene_moods");
    const moodsList = storedMoods ? JSON.parse(storedMoods) : [];
    const moodCount = moodsList.filter(
      (entry) => entry.date >= mondayString && entry.date <= sundayString
    ).length;

    // Average mood
    const weeklyMoodEntries = moodsList.filter(
      (entry) => entry.date >= mondayString && entry.date <= sundayString
    );
    let avgMoodLabel = "No data yet";
    let avgMoodEmoji = "";

    if (weeklyMoodEntries.length > 0) {
      const totalScore = weeklyMoodEntries.reduce((sum, entry) => {
        const val = moodValueMap[entry.mood] || 0;
        return sum + val;
      }, 0);
      const avgScore = Math.round(totalScore / weeklyMoodEntries.length);
      
      const moodLabels = ["Low", "Okay", "Good", "Great", "Amazing"];
      const moodEmojis = ["😔", "😐", "😊", "😄", "🤩"];
      if (avgScore >= 1 && avgScore <= 5) {
        avgMoodLabel = moodLabels[avgScore - 1];
        avgMoodEmoji = moodEmojis[avgScore - 1];
      }
    }

    const streakCount = calculateStreak();

    setWeeklyStats({
      journalCount,
      gratitudeCount,
      moodCount,
      avgMoodLabel,
      avgMoodEmoji,
      streakCount,
    });
  };

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);

    // Load initial weekly stats
    loadWeeklyStats();

    // Pre-select today's mood
    const stored = localStorage.getItem("serene_moods");
    if (stored) {
      const currentMoods = JSON.parse(stored);
      const todayString = new Date().toISOString().split("T")[0];
      const todayEntry = currentMoods.find((m) => m.date === todayString);
      if (todayEntry) {
        const idx = moods.findIndex((m) => m.label === todayEntry.mood);
        if (idx > -1) {
          setSelectedMood(idx);
        }
      }
    }
  }, []);

  const handleMoodSelect = (index) => {
    setSelectedMood(index);
    setMoodSaved(true);

    const selectedMoodLabel = moods[index].label;
    const todayString = new Date().toISOString().split("T")[0];

    const stored = localStorage.getItem("serene_moods");
    let currentMoods = stored ? JSON.parse(stored) : [];

    const existingIndex = currentMoods.findIndex((m) => m.date === todayString);
    if (existingIndex > -1) {
      currentMoods[existingIndex].mood = selectedMoodLabel;
    } else {
      currentMoods.push({ date: todayString, mood: selectedMoodLabel });
    }

    localStorage.setItem("serene_moods", JSON.stringify(currentMoods));

    // Reload weekly stats directly to reflect changes immediately
    loadWeeklyStats();

    setTimeout(() => {
      setMoodSaved(false);
    }, 3000);
  };

  return (
    <AppShell>
      <div className="relative min-h-[calc(100vh-80px)] text-serene-text font-sans pb-12">
        {/* Decorative Crystal SVG (Positioned absolute top right) */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute -top-4 right-0 text-serene-border"
        >
          <path d="M12 2L2 12l10 10 10-10L12 2z" />
          <path d="M12 2v20M2 12h20" />
        </svg>

        {/* ── HEADER AREA ── */}
        <div className="mb-10">
          <span className="text-[12px] font-semibold text-serene-muted uppercase tracking-widest font-sans">
            {formattedDate}
          </span>
          <h1 className="font-serif text-[36px] font-bold text-serene-text leading-tight mt-1">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-[15px] text-serene-muted mt-1.5">
            A quiet space to understand how you feel.
          </p>
        </div>

        {/* ── TWO COLUMN SPLIT LAYOUT ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column (flex 1) */}
          <div className="flex-1 w-full flex flex-col">
            {/* Mood check-in card */}
            <div className="bg-white dark:bg-[#25232A] border border-serene-border rounded-[16px] p-7 w-full">
              <h2 className="font-serif text-[20px] font-semibold text-serene-text">
                How are you feeling today?
              </h2>
              <p className="text-serene-muted text-[14px] mt-1.5 mb-6">
                Select a mood option to record your daily check-in.
              </p>

              {/* 5 Mood buttons */}
              <div className="grid grid-cols-5 gap-3">
                {moods.map((mood, idx) => {
                  const isSelected = selectedMood === idx;
                  return (
                    <div
                      key={mood.label}
                      onClick={() => handleMoodSelect(idx)}
                      className={`flex flex-col items-center justify-center p-4 rounded-[12px] border cursor-pointer transition-colors ${
                        isSelected
                          ? "border-serene-green bg-serene-deep text-serene-text font-medium"
                          : "border-serene-border bg-serene-bg text-serene-muted hover:border-serene-muted"
                      }`}
                    >
                      <span className="text-[32px] leading-none">{mood.emoji}</span>
                      <span className="text-[12px] text-serene-muted mt-2 font-sans font-medium">
                        {mood.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Saved Success Notice */}
              {moodSaved && (
                <div className="mt-4 p-3 bg-serene-deep border border-serene-border rounded-lg text-center text-xs text-serene-text font-medium animate-fade-in">
                  Check-in saved: Feeling {moods[selectedMood].label} today.
                </div>
              )}
            </div>

            {/* Other ways to check in */}
            <div className="mt-8">
              <span className="block text-[11px] font-bold text-serene-muted tracking-wider uppercase font-sans mb-3.5">
                OTHER WAYS TO CHECK IN
              </span>

              {/* 3 Activities cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Journal */}
                <div
                  onClick={() => navigate("/journal")}
                  className="bg-serene-bg border border-serene-border rounded-[12px] p-[18px] flex items-center gap-[14px] cursor-pointer hover:border-serene-muted transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-serene-surface flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-serene-muted">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-medium text-serene-text">Journal</h4>
                    <p className="text-[12px] text-serene-muted leading-relaxed mt-0.5">
                      Distraction-free personal entries
                    </p>
                  </div>
                </div>

                {/* Gratitude */}
                <div
                  onClick={() => navigate("/gratitude")}
                  className="bg-serene-bg border border-serene-border rounded-[12px] p-[18px] flex items-center gap-[14px] cursor-pointer hover:border-serene-muted transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-serene-surface flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-serene-muted">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-medium text-serene-text">Gratitude</h4>
                    <p className="text-[12px] text-serene-muted leading-relaxed mt-0.5">
                      Log items you are thankful for
                    </p>
                  </div>
                </div>

                {/* Companion */}
                <div
                  onClick={() => navigate("/chat")}
                  className="bg-serene-bg border border-serene-border rounded-[12px] p-[18px] flex items-center gap-[14px] cursor-pointer hover:border-serene-muted transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-serene-surface flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-serene-muted">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-medium text-serene-text">Companion</h4>
                    <p className="text-[12px] text-serene-muted leading-relaxed mt-0.5">
                      Gentle prompts & chat companion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (fixed 220px) */}
          <div className="w-full lg:w-[220px] flex flex-col flex-shrink-0 animate-fade-in">
            <span className="block text-[11px] font-bold text-serene-muted tracking-wider uppercase font-sans mb-4">
              WEEKLY SUMMARY
            </span>

            {/* Stat Blocks */}
            <div className="flex flex-col gap-5">
              {/* Stat 1 */}
              <div>
                <div className="flex items-center gap-1.5">
                  {weeklyStats.avgMoodEmoji && <span className="text-[24px]">{weeklyStats.avgMoodEmoji}</span>}
                  <span className="font-serif text-[28px] font-bold text-serene-text">
                    {weeklyStats.avgMoodLabel}
                  </span>
                </div>
                <p className="text-[13px] text-serene-muted leading-tight mt-0.5">
                  Average mood this week
                </p>
                <span className="block text-[12px] text-serene-muted mt-0.5">
                  Based on past 7 days (demo data)
                </span>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-[36px] font-bold text-serene-text">
                    {weeklyStats.journalCount}
                  </span>
                  <span className="font-serif text-[24px] text-serene-text">entries</span>
                </div>
                <p className="text-[13px] font-medium text-serene-text leading-tight">
                  Journal Logs
                </p>
                <span className="block text-[12px] text-serene-muted mt-0.5">
                  This week (demo data)
                </span>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-[36px] font-bold text-serene-text">
                    {weeklyStats.gratitudeCount}
                  </span>
                  <span className="font-serif text-[24px] text-serene-text">logs</span>
                </div>
                <p className="text-[13px] font-medium text-serene-text leading-tight">
                  Gratitude Check-ins
                </p>
                <span className="block text-[12px] text-serene-muted mt-0.5">
                  This week (demo data)
                </span>
              </div>

              {/* Stat 4 */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-[36px] font-bold text-serene-text">
                    {weeklyStats.streakCount}
                  </span>
                  <span className="font-serif text-[24px] text-serene-text">days</span>
                </div>
                <p className="text-[13px] font-medium text-serene-text leading-tight">
                  Active Streak
                </p>
                <span className="block text-[12px] text-serene-muted mt-0.5">
                  Consistent check-ins (demo data)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
