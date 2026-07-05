import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import { calculateStreak } from "../utils/streak";
import { getMoods, getJournals, getGratitude, saveMood } from "../utils/api";

const moodsList = [
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

  // Breathing Space states
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathStage, setBreathStage] = useState("Inhale"); // Inhale, Hold In, Exhale, Hold Out
  const [secondsLeft, setSecondsLeft] = useState(4);

  // Celestial Window states
  const [isNight, setIsNight] = useState(false);

  // Mindful Growth Plant states
  const [waterCount, setWaterCount] = useState(0);
  const [growthStage, setGrowthStage] = useState(0); // 0 to 4
  const [isWatering, setIsWatering] = useState(false);

  // Cozy Fireplace states
  const [fireOn, setFireOn] = useState(false);

  // API loaded states
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [gratitude, setGratitude] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Breathing guide timer
  useEffect(() => {
    let timer;
    if (isBreathing) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setBreathStage((currentStage) => {
              if (currentStage === "Inhale") return "Hold In";
              if (currentStage === "Hold In") return "Exhale";
              if (currentStage === "Exhale") return "Hold Out";
              return "Inhale";
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathStage("Inhale");
      setSecondsLeft(4);
    }
    return () => clearInterval(timer);
  }, [isBreathing]);

  const handleStartBreathing = () => {
    setIsBreathing(true);
    setBreathStage("Inhale");
    setSecondsLeft(4);
  };

  const handleStopBreathing = () => {
    setIsBreathing(false);
  };

  const handleWaterPlant = () => {
    if (isWatering || growthStage >= 4) return;
    setIsWatering(true);
    
    setWaterCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount > 0 && nextCount % 3 === 0) {
        setGrowthStage((prevStage) => Math.min(prevStage + 1, 4));
      }
      return nextCount;
    });

    setTimeout(() => {
      setIsWatering(false);
    }, 1500);
  };

  const handleResetPlant = () => {
    setWaterCount(0);
    setGrowthStage(0);
    setIsWatering(false);
  };

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);

    const loadData = async () => {
      try {
        const [moodsData, journalsData, gratitudeData] = await Promise.all([
          getMoods(),
          getJournals(),
          getGratitude(),
        ]);
        setMoods(moodsData);
        setJournals(journalsData);
        setGratitude(gratitudeData);

        // Pre-select today's mood
        const todayString = new Date().toISOString().split("T")[0];
        const todayEntry = moodsData.find((m) => m.date === todayString);
        if (todayEntry) {
          const idx = moodsList.findIndex((m) => m.label === todayEntry.mood);
          if (idx > -1) {
            setSelectedMood(idx);
          }
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleMoodSelect = async (index) => {
    setSelectedMood(index);
    setMoodSaved(true);

    const selectedMoodLabel = moodsList[index].label;
    const todayString = new Date().toISOString().split("T")[0];

    try {
      const savedMood = await saveMood(todayString, selectedMoodLabel);
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
      console.error("Failed to save mood:", err);
    }

    setTimeout(() => {
      setMoodSaved(false);
    }, 3000);
  };

  // Compute Monday of the current week (Monday to Sunday)
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

  // Compute weekly statistics dynamically
  const journalCount = journals.filter(
    (entry) => entry.date >= mondayString && entry.date <= sundayString
  ).length;

  const gratitudeCount = gratitude.filter(
    (entry) => entry.date >= mondayString && entry.date <= sundayString
  ).length;

  const moodCount = moods.filter(
    (entry) => entry.date >= mondayString && entry.date <= sundayString
  ).length;

  const weeklyMoodEntries = moods.filter(
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

  const streakCount = calculateStreak(moods);

  if (loading) {
    return (
      <AppShell>
        <div className="p-6 text-sm text-serene-muted">Loading your wellness dashboard...</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="relative min-h-[calc(100vh-80px)] text-serene-text font-sans pb-12">
        {/* Decorative Crystal SVG */}
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
        <div className="mb-10 animate-fade-in-up">
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
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Mood check-in card */}
            <div className="bg-white dark:bg-[#25232A] border border-serene-border rounded-[16px] p-7 w-full hover-lift hover-glow">
              <h2 className="font-serif text-[20px] font-semibold text-serene-text">
                How are you feeling today?
              </h2>
              <p className="text-serene-muted text-[14px] mt-1.5 mb-6">
                Select a mood option to record your daily check-in.
              </p>

              {/* 5 Mood buttons */}
              <div className="grid grid-cols-5 gap-3">
                {moodsList.map((mood, idx) => {
                  const isSelected = selectedMood === idx;
                  return (
                    <div
                      key={mood.label}
                      onClick={() => handleMoodSelect(idx)}
                      className={`flex flex-col items-center justify-center p-4 rounded-[12px] border cursor-pointer transition-all hover:scale-105 active:scale-95 duration-200 ${
                        isSelected
                          ? "border-serene-green bg-serene-deep text-serene-text font-medium shadow-sm shadow-serene-green/10"
                          : "border-serene-border bg-serene-bg text-serene-muted hover:border-serene-muted hover:bg-serene-surface"
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
                  Check-in saved: Feeling {moodsList[selectedMood].label} today.
                </div>
              )}
            </div>

            {/* Breathing Space Guide Card */}
            <div className="bg-white dark:bg-[#25232A] border border-serene-border rounded-[16px] p-7 w-full hover-lift hover-glow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-serif text-[20px] font-semibold text-serene-text flex items-center gap-2">
                    🌿 Breathing Space
                  </h2>
                  <p className="text-serene-muted text-[14px] mt-1.5 mb-2">
                    A brief breathing cycle to help calm your mind.
                  </p>
                </div>
                {isBreathing && (
                  <button
                    onClick={handleStopBreathing}
                    className="text-[12px] bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/30 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors"
                  >
                    End Session
                  </button>
                )}
              </div>

              <div className="flex flex-col items-center justify-center py-6 min-h-[220px]">
                {!isBreathing ? (
                  <div className="text-center">
                    <button
                      onClick={handleStartBreathing}
                      className="bg-serene-green text-white text-[15px] font-medium py-3 px-8 rounded-full border-0 hover:bg-[#3d664a] shadow-lg shadow-serene-green/10 transition-transform active:scale-95 cursor-pointer font-sans"
                    >
                      Start Breathing Guide
                    </button>
                    <p className="text-[12px] text-serene-muted mt-4">
                      Follow the expand and contract rhythm (16-second cycle).
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center animate-fade-in w-full">
                    {/* Circle visualizer */}
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      {/* Animated background breathing circle */}
                      <div className="absolute inset-0 rounded-full bg-serene-primarySoft/40 dark:bg-[#2A2830]/65 animate-breath z-0" />
                      
                      {/* Static center core */}
                      <div className="w-20 h-20 rounded-full bg-serene-green text-white flex items-center justify-center text-[12px] font-bold z-10 shadow-md">
                        {secondsLeft}s
                      </div>
                    </div>

                    {/* Instruction text */}
                    <div className="mt-8 text-center min-h-[56px]">
                      <h3 className="font-serif text-[18px] text-serene-text font-semibold capitalize tracking-wide transition-all">
                        {breathStage === "Hold In" || breathStage === "Hold Out" ? "Hold..." : `${breathStage}...`}
                      </h3>
                      <p className="text-[13px] text-serene-muted mt-1.5 max-w-sm">
                        {breathStage === "Inhale" && "Breathe in slowly, feeling the fresh air enter..."}
                        {breathStage === "Hold In" && "Feel the quiet energy inside you..."}
                        {breathStage === "Exhale" && "Let it out smoothly, releasing all your tension..."}
                        {breathStage === "Hold Out" && "Rest in this peaceful space before the next breath..."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Other ways to check in */}
            <div>
              <span className="block text-[11px] font-bold text-serene-muted tracking-wider uppercase font-sans mb-3.5">
                OTHER WAYS TO CHECK IN
              </span>

              {/* 3 Activities cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Journal */}
                <div
                  onClick={() => navigate("/journal")}
                  className="bg-white dark:bg-[#25232A] border border-serene-border rounded-[12px] p-[18px] flex items-center gap-[14px] cursor-pointer hover-lift hover-glow"
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
                  className="bg-white dark:bg-[#25232A] border border-serene-border rounded-[12px] p-[18px] flex items-center gap-[14px] cursor-pointer hover-lift hover-glow"
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
                  className="bg-white dark:bg-[#25232A] border border-serene-border rounded-[12px] p-[18px] flex items-center gap-[14px] cursor-pointer hover-lift hover-glow"
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
                  {avgMoodEmoji && <span className="text-[24px]">{avgMoodEmoji}</span>}
                  <span className="font-serif text-[28px] font-bold text-serene-text">
                    {avgMoodLabel}
                  </span>
                </div>
                <p className="text-[13px] text-serene-muted leading-tight mt-0.5">
                  Average mood this week
                </p>
                <span className="block text-[12px] text-serene-muted mt-0.5">
                  Based on current logs
                </span>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-[36px] font-bold text-serene-text">
                    {journalCount}
                  </span>
                  <span className="font-serif text-[24px] text-serene-text">entries</span>
                </div>
                <p className="text-[13px] font-medium text-serene-text leading-tight">
                  Journal Logs
                </p>
                <span className="block text-[12px] text-serene-muted mt-0.5">
                  This week
                </span>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-[36px] font-bold text-serene-text">
                    {gratitudeCount}
                  </span>
                  <span className="font-serif text-[24px] text-serene-text">logs</span>
                </div>
                <p className="text-[13px] font-medium text-serene-text leading-tight">
                  Gratitude Check-ins
                </p>
                <span className="block text-[12px] text-serene-muted mt-0.5">
                  This week
                </span>
              </div>

              {/* Stat 4 */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-[36px] font-bold text-serene-text">
                    {streakCount}
                  </span>
                  <span className="font-serif text-[24px] text-serene-text">days</span>
                </div>
                <p className="text-[13px] font-medium text-serene-text leading-tight">
                  Active Streak
                </p>
                <span className="block text-[12px] text-serene-muted mt-0.5">
                  Consistent check-ins
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ZEN CORNER ── */}
        <div className="mt-12 border-t border-serene-border dark:border-[#3A3742] pt-10 animate-fade-in-up">
          <h2 className="font-serif text-[24px] font-bold text-serene-text">
            Zen Corner
          </h2>
          <p className="text-serene-muted text-[15px] mt-1 mb-6">
            Interactive, state-driven widgets to clear your mind and enjoy calming, lamp-like atmospheric effects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Widget 1: Celestial Window */}
            <div className="bg-white dark:bg-[#25232A] border border-serene-border dark:border-[#3A3742] rounded-[16px] p-6 relative overflow-hidden flex flex-col items-center justify-between min-h-[300px] hover-lift hover-glow transition-all duration-500">
              <div className="w-full text-left">
                <h3 className="font-serif text-[16px] font-semibold text-serene-text flex items-center gap-1.5">
                  🌙 Celestial Skylight
                </h3>
                <p className="text-[12px] text-serene-muted mt-1">
                  Pull the chain to toggle day & night
                </p>
              </div>

              {/* Skylight circle */}
              <div className={`w-32 h-32 rounded-full border-[3px] border-serene-border dark:border-[#3A3742] overflow-hidden relative shadow-inner flex items-center justify-center transition-all duration-700 ${
                isNight
                  ? "bg-gradient-to-b from-[#0d1b2a] via-[#1b263b] to-[#415a77] shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)]"
                  : "bg-gradient-to-b from-[#e3f2fd] via-[#bbdefb] to-[#ffecb3] shadow-[inset_0_4px_12px_rgba(0,0,0,0.08)]"
              }`}>
                {!isNight ? (
                  <>
                    {/* Day Sun */}
                    <div className="w-10 h-10 rounded-full bg-yellow-400 absolute top-5 left-11 shadow-[0_0_16px_rgba(250,204,21,0.65)]" />
                    {/* Drifting clouds */}
                    <div className="absolute top-10 left-0 w-8 h-4 bg-white/70 rounded-full blur-[0.5px] animate-cloud-drift-1" />
                    <div className="absolute top-16 right-0 w-10 h-5 bg-white/60 rounded-full blur-[0.5px] animate-cloud-drift-2" />
                  </>
                ) : (
                  <>
                    {/* Night Moon */}
                    <div className="w-9 h-9 rounded-full bg-slate-100 absolute top-5 left-11 shadow-[0_0_14px_rgba(255,255,255,0.45)] overflow-hidden">
                      {/* Dark overlay to make crescent */}
                      <div className="absolute w-7 h-7 rounded-full bg-[#1b263b] -top-1 -right-1" />
                    </div>
                    {/* Twinkling stars */}
                    <div className="absolute top-4 left-6 w-1 h-1 bg-white rounded-full animate-star-twinkle-1" />
                    <div className="absolute top-12 left-20 w-1.5 h-1.5 bg-white rounded-full animate-star-twinkle-2" />
                    <div className="absolute top-20 left-10 w-0.5 h-0.5 bg-white rounded-full animate-star-twinkle-3" />
                  </>
                )}
              </div>

              {/* Brass Pull Switch */}
              <div 
                onClick={() => setIsNight(!isNight)}
                className="absolute top-6 right-6 flex flex-col items-center cursor-pointer group z-20"
                title="Toggle Day/Night"
              >
                <div className="w-[1.2px] h-10 bg-serene-muted dark:bg-[#A39C8F] group-hover:bg-[#C17F24] transition-colors" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#C17F24] border border-[#a86e1e] shadow-sm active:translate-y-1 transition-transform" />
              </div>

              <span className="text-[12px] font-medium text-serene-muted dark:text-[#A39C8F] italic font-serif">
                {isNight ? "In the quiet dark, find rest." : "Welcome the warm daily sun."}
              </span>
            </div>

            {/* Widget 2: Mindful Growth Plant */}
            <div className="bg-white dark:bg-[#25232A] border border-serene-border dark:border-[#3A3742] rounded-[16px] p-6 relative overflow-hidden flex flex-col items-center justify-between min-h-[300px] hover-lift hover-glow">
              <div className="w-full text-left flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-[16px] font-semibold text-serene-text flex items-center gap-1.5">
                    🌱 Mindful Growth
                  </h3>
                  <p className="text-[12px] text-serene-muted mt-1">
                    Water the pot to sprout wellness
                  </p>
                </div>
                {growthStage === 4 && (
                  <button
                    onClick={handleResetPlant}
                    className="text-[10px] bg-serene-primarySoft text-serene-primary dark:bg-[#2A2830] dark:text-[#EDE8E0] px-2.5 py-1 rounded hover:bg-serene-border transition-colors font-medium"
                  >
                    Re-seed
                  </button>
                )}
              </div>

              {/* Plant Viewport */}
              <div className="relative w-32 h-32 flex flex-col items-center justify-end pb-1.5">
                {/* Sparkles on max growth */}
                {growthStage === 4 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="absolute text-yellow-400 text-xs animate-ping top-4 left-6">✨</span>
                    <span className="absolute text-yellow-300 text-xs animate-ping top-10 right-4">✨</span>
                    <span className="absolute text-yellow-400 text-[10px] animate-ping bottom-12 left-4">✨</span>
                  </div>
                )}

                {/* Watering can (absolute floating) */}
                <div 
                  className={`absolute -top-1 right-0 transition-all duration-500 pointer-events-none z-10 ${
                    isWatering ? "opacity-100 scale-100 translate-x-[-12px]" : "opacity-0 scale-75 translate-x-4"
                  }`}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    className={`w-9 h-9 text-serene-primary dark:text-[#EDE8E0] ${isWatering ? "animate-tilt-can" : ""}`}
                  >
                    <path d="M10 8h7l3 4v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2 2V9a2 2 0 0 1 2-2h4v3" />
                    <path d="M13 5V2m3 5V4" />
                    <path d="M4 14h6" />
                  </svg>

                  {/* Water Drops */}
                  {isWatering && (
                    <div className="absolute top-8 left-[-6px] flex gap-1 text-[8px] text-blue-400 pointer-events-none">
                      <span className="animate-drip-1">•</span>
                      <span className="animate-drip-2">•</span>
                      <span className="animate-drip-3">•</span>
                    </div>
                  )}
                </div>

                {/* Plant drawing based on growthStage */}
                <svg width="64" height="80" viewBox="0 0 64 80" className="transition-all duration-500">
                  {/* Pot (Always visible) */}
                  <path d="M16 52 L48 52 L44 76 L20 76 Z" fill="#D4A373" stroke="#8E7E6B" strokeWidth="1.5" />
                  <ellipse cx="32" cy="52" rx="16" ry="3" fill="#B58353" stroke="#8E7E6B" strokeWidth="1" />

                  {/* Growth Stage SVGs */}
                  {growthStage >= 0 && (
                    <path d="M32 52 L32 40" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" />
                  )}
                  {growthStage === 0 && (
                    <path d="M32 42 Q24 38 22 41" fill="none" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
                  )}
                  {growthStage >= 1 && (
                    <>
                      <path d="M32 40 Q40 34 44 38" fill="none" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
                      <path d="M32 40 L32 30" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" />
                    </>
                  )}
                  {growthStage >= 2 && (
                    <>
                      <path d="M32 30 Q22 24 18 28" fill="none" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="32" cy="28" r="3.5" fill="#e5989b" stroke="#b56576" strokeWidth="1" />
                    </>
                  )}
                  {growthStage >= 3 && (
                    <>
                      <path d="M32 28 L32 20" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M32 20 C28 14 36 14 32 20 Z" fill="#e5989b" stroke="#b56576" strokeWidth="1" />
                      <path d="M32 20 C24 18 24 24 32 20 Z" fill="#ffb5a7" stroke="#b56576" strokeWidth="1" />
                      <path d="M32 20 C40 18 40 24 32 20 Z" fill="#ffb5a7" stroke="#b56576" strokeWidth="1" />
                      <circle cx="32" cy="20" r="2.5" fill="#FAD02C" />
                    </>
                  )}
                  {growthStage === 4 && (
                    <>
                      <path d="M32 35 Q44 26 48 30" fill="none" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
                      <path d="M32 45 Q20 38 16 42" fill="none" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="48" cy="28" r="2.5" fill="#e5989b" />
                      <circle cx="16" cy="40" r="2.5" fill="#e5989b" />
                    </>
                  )}
                </svg>
              </div>

              {/* Water can trigger */}
              <button
                onClick={handleWaterPlant}
                disabled={isWatering || growthStage >= 4}
                className="bg-serene-green text-white text-[12px] font-medium py-2 px-5 rounded-full border-0 hover:bg-[#3d664a] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95 w-full max-w-[150px]"
              >
                {isWatering ? "Watering..." : growthStage >= 4 ? "Fully Grown 🌸" : `Water (${waterCount % 3}/3)`}
              </button>
            </div>

            {/* Widget 3: Cozy Fireplace */}
            <div className={`border border-serene-border dark:border-[#3A3742] rounded-[16px] p-6 relative overflow-hidden flex flex-col items-center justify-between min-h-[300px] hover-lift hover-glow transition-all duration-700 ${
              fireOn 
                ? "bg-[#1E1912] dark:bg-[#1E1912] animate-fire-glow border-[#D4A373]/30" 
                : "bg-white dark:bg-[#25232A]"
            }`}>
              <div className="w-full text-left">
                <h3 className="font-serif text-[16px] font-semibold text-serene-text flex items-center gap-1.5">
                  🔥 Hearth & Fire
                </h3>
                <p className="text-[12px] text-serene-muted mt-1">
                  Click the matches box to light the log
                </p>
              </div>

              {/* Fireplace Hearth view */}
              <div className="relative w-36 h-28 flex flex-col items-center justify-end overflow-hidden border-b border-serene-border dark:border-[#3A3742] pb-1">
                {/* Stonework backing */}
                <div className="absolute inset-0 bg-[#3a3530]/10 dark:bg-black/10 rounded-t-md border-t border-x border-serene-border dark:border-[#3A3742]" />

                {/* Animated Sparks */}
                {fireOn && (
                  <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping top-10 left-12 opacity-80" />
                    <span className="absolute w-1 h-1 bg-red-400 rounded-full animate-ping top-6 right-12 opacity-60" />
                    <span className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full animate-ping top-16 left-16 opacity-75" />
                  </div>
                )}

                {/* Flames drawing */}
                {fireOn ? (
                  <div className="relative w-16 h-16 flex items-end justify-center select-none z-10">
                    {/* Outer orange flame */}
                    <div 
                      className="absolute w-12 h-12 bg-gradient-to-t from-orange-600 via-orange-400 to-transparent rounded-full animate-flame-1 origin-bottom filter blur-[0.5px]"
                      style={{ borderRadius: "50% 50% 20% 20% / 80% 80% 30% 30%" }}
                    />
                    {/* Middle yellow flame */}
                    <div 
                      className="absolute w-9 h-9 bg-gradient-to-t from-yellow-500 via-yellow-300 to-transparent rounded-full animate-flame-2 origin-bottom filter blur-[0.2px]"
                      style={{ borderRadius: "50% 50% 20% 20% / 80% 80% 30% 30%" }}
                    />
                    {/* Inner core white-hot flame */}
                    <div 
                      className="absolute w-5 h-5 bg-white rounded-full animate-flame-3 origin-bottom filter blur-[0.1px]"
                      style={{ borderRadius: "50% 50% 20% 20% / 80% 80% 30% 30%" }}
                    />
                  </div>
                ) : (
                  <div className="h-6 w-16 z-10" />
                )}

                {/* Logs */}
                <div className="relative w-20 h-5 flex items-center justify-center gap-1 z-20">
                  <div className="w-10 h-3 bg-[#4e3d30] border border-[#3b2e24] rounded-sm transform rotate-[15deg] origin-bottom-left" />
                  <div className="w-10 h-3 bg-[#4e3d30] border border-[#3b2e24] rounded-sm transform rotate-[-15deg] origin-bottom-right -ml-4" />
                </div>
              </div>

              {/* Matchbox Click switch */}
              <button
                onClick={() => setFireOn(!fireOn)}
                className={`w-full max-w-[130px] py-1.5 px-4 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer ${
                  fireOn 
                    ? "bg-[#C17F24] border border-[#a86e1e] text-white hover:bg-[#a86e1e]"
                    : "bg-[#F8F3E6] dark:bg-[#3A3742] border border-serene-border dark:border-[#3A3742] text-serene-text hover:bg-serene-bg"
                }`}
              >
                {fireOn ? "🔥 Extinguish" : "🪵 Strike Match"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
