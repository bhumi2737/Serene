import React, { useState, useEffect, useMemo } from "react";
import { calculateStreak, calculateLongestStreak } from "../utils/streak";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import StatItem from "../components/StatItem";
import PageHeader from "../components/PageHeader";

const emotionSummary = [
  { label: "Hopeful", count: 5, bg: "bg-[#EEF5E8]", text: "text-[#3B6D11]", fill: "w-[100%]" },
  { label: "Calm", count: 4, bg: "bg-[#DCEBE4]", text: "text-[#23443B]", fill: "w-[80%]" },
  { label: "Anxious", count: 3, bg: "bg-[#FFFBEB]", text: "text-[#B45309]", fill: "w-[60%]" },
  { label: "Grateful", count: 2, bg: "bg-[#FDF2F8]", text: "text-[#9D174D]", fill: "w-[40%]" },
];

const MOOD_TO_NUMBER = {
  Low: 1,
  Okay: 2,
  Good: 3,
  Great: 4,
  Amazing: 5
};

const getLast30DaysDates = () => {
  const dates = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }
  return dates;
};

const getLast7DaysDates = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }
  return dates;
};

const get4WeeksRanges = () => {
  const weeks = [];
  for (let w = 0; w < 4; w++) {
    const weekDates = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date();
      date.setDate(date.getDate() - (w * 7 + d));
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      weekDates.push(`${year}-${month}-${day}`);
    }
    weeks.push(weekDates);
  }
  return weeks.reverse();
};

export default function InsightsPage() {
  const [reportRange, setReportRange] = useState("weekly");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportError, setReportError] = useState("");

  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [gratitude, setGratitude] = useState([]);

  const loadDataFromLocalStorage = () => {
    const storedMoods = localStorage.getItem("serene_moods");
    setMoods(storedMoods ? JSON.parse(storedMoods) : []);

    const storedJournals = localStorage.getItem("serene_journals");
    setJournals(storedJournals ? JSON.parse(storedJournals) : []);

    const storedGratitude = localStorage.getItem("serene_gratitude");
    setGratitude(storedGratitude ? JSON.parse(storedGratitude) : []);
  };

  useEffect(() => {
    loadDataFromLocalStorage();

    const handleFocus = () => {
      loadDataFromLocalStorage();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  const moodSeries = useMemo(() => {
    const dates = getLast30DaysDates();
    return dates.map((dateStr) => {
      const entry = moods.find((m) => m.date === dateStr);
      const moodValue = entry ? (MOOD_TO_NUMBER[entry.mood] || 0) : 0;
      return { date: dateStr, moodValue };
    });
  }, [moods]);

  const journalsLast30 = useMemo(() => {
    const dates = getLast30DaysDates();
    return journals.filter((j) => dates.includes(j.date));
  }, [journals]);

  const gratitudeLast30 = useMemo(() => {
    const dates = getLast30DaysDates();
    return gratitude.filter((g) => dates.includes(g.date));
  }, [gratitude]);

  const averageMoodThisWeek = useMemo(() => {
    const dates7 = getLast7DaysDates();
    const moodsThisWeek = moods.filter((m) => dates7.includes(m.date));
    if (moodsThisWeek.length === 0) return "No data";
    const sum = moodsThisWeek.reduce((acc, m) => acc + (MOOD_TO_NUMBER[m.mood] || 0), 0);
    const avg = Math.round(sum / moodsThisWeek.length);
    const labelMap = { 1: "Low", 2: "Okay", 3: "Good", 4: "Great", 5: "Amazing" };
    const label = labelMap[avg] || "No data";
    const emojiMap = { Low: "😔 Low", Okay: "😐 Okay", Good: "😊 Good", Great: "😄 Great", Amazing: "🤩 Amazing" };
    return emojiMap[label] || "No data";
  }, [moods]);

  const moodDistribution = useMemo(() => {
    const counts = { Low: 0, Okay: 0, Good: 0, Great: 0, Amazing: 0 };
    moods.forEach((m) => {
      if (counts[m.mood] !== undefined) {
        counts[m.mood]++;
      }
    });
    const total = moods.length;
    const items = [
      { label: "Low", emoji: "😔", key: "Low" },
      { label: "Okay", emoji: "😐", key: "Okay" },
      { label: "Good", emoji: "😊", key: "Good" },
      { label: "Great", emoji: "😄", key: "Great" },
      { label: "Amazing", emoji: "🤩", key: "Amazing" }
    ];
    return {
      total,
      items: items.map((item) => ({
        ...item,
        count: counts[item.key],
        percentage: total > 0 ? (counts[item.key] / total) * 100 : 0
      }))
    };
  }, [moods]);

  const patternInsight = useMemo(() => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const daySums = Array(7).fill(0);
    const dayCounts = Array(7).fill(0);

    moods.forEach((entry) => {
      const dayIndex = new Date(entry.date).getDay();
      const val = MOOD_TO_NUMBER[entry.mood];
      if (val) {
        daySums[dayIndex] += val;
        dayCounts[dayIndex]++;
      }
    });

    let maxAvg = -1;
    let bestDayIndex = -1;
    let distinctDaysCount = 0;

    for (let i = 0; i < 7; i++) {
      if (dayCounts[i] > 0) {
        distinctDaysCount++;
        const avg = daySums[i] / dayCounts[i];
        if (avg > maxAvg) {
          maxAvg = avg;
          bestDayIndex = i;
        }
      }
    }

    const hasEnoughData = distinctDaysCount >= 3;
    const bestDayName = bestDayIndex !== -1 ? daysOfWeek[bestDayIndex] : "";
    const dates30 = getLast30DaysDates();
    const loggedCountIn30 = moods.filter((m) => dates30.includes(m.date)).length;

    return {
      hasEnoughData,
      bestDayName,
      loggedCountIn30
    };
  }, [moods]);

  const journal4WeeksCounts = useMemo(() => {
    const weeks = get4WeeksRanges();
    return weeks.map((weekDates) => {
      return journals.filter((j) => weekDates.includes(j.date)).length;
    });
  }, [journals]);

  const gratitude4WeeksCounts = useMemo(() => {
    const weeks = get4WeeksRanges();
    return weeks.map((weekDates) => {
      return gratitude.filter((g) => weekDates.includes(g.date)).length;
    });
  }, [gratitude]);

  const currentStreak = useMemo(() => calculateStreak(), [moods]);
  const longestStreak = useMemo(() => calculateLongestStreak(), [moods]);

  const activeStyle = {
    border: "1px solid #D4CDB8",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "13px",
    cursor: "pointer",
    backgroundColor: "#D4CDB8",
    color: "#2C2416",
  };

  const inactiveStyle = {
    border: "1px solid #D4CDB8",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "13px",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#8C7E6A",
  };

  const downloadButtonStyle = {
    backgroundColor: "#2C2416",
    color: "white",
    borderRadius: "8px",
    padding: "10px 24px",
    fontSize: "14px",
    cursor: isGenerating ? "not-allowed" : "pointer",
    border: "none",
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    setReportError("");
    try {
      const storedMoods = localStorage.getItem("serene_moods");
      const moodsData = storedMoods ? JSON.parse(storedMoods) : [];

      const storedJournals = localStorage.getItem("serene_journals");
      const journalsData = storedJournals ? JSON.parse(storedJournals) : [];

      const storedGratitude = localStorage.getItem("serene_gratitude");
      const gratitudeData = storedGratitude ? JSON.parse(storedGratitude) : [];

      const streakVal = calculateStreak();

      const response = await fetch("http://localhost:5000/api/report/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          range: reportRange,
          moods: moodsData,
          journals: journalsData,
          gratitude: gratitudeData,
          streak: streakVal,
        }),
      });

      if (!response.ok) {
        setReportError("Failed to generate report. Please try again.");
        setIsGenerating(false);
        return;
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "serene-report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
      setIsGenerating(false);
    } catch (error) {
      setReportError("Something went wrong. Please try again.");
      setIsGenerating(false);
    }
  };

  const getWeeklyRange = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    const format = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${format(start)} – ${format(end)}`;
  };

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Insights"
        subtitle="Understand your emotional trends and notice patterns over time"
      />

      {/* ── STATS METRICS GRID ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
        <StatItem
          value={`${journalsLast30.length} ${journalsLast30.length === 1 ? "log" : "logs"}`}
          label="Journal entries"
          subtext="This month"
        />
        <StatItem
          value={averageMoodThisWeek}
          label="Average mood"
          subtext="This week"
        />
        <StatItem
          value={`${currentStreak} ${currentStreak === 1 ? "day" : "days"}`}
          label="Streak"
          subtext="Current active checks"
        />
        <StatItem
          value={`${gratitudeLast30.length} ${gratitudeLast30.length === 1 ? "log" : "logs"}`}
          label="Gratitude checks"
          subtext="This month"
        />
      </div>

      {/* ── CHARTS SPLIT LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
        
        {/* Mood Trend Chart */}
        <div className="lg:col-span-2">
          <Card className="border-serene-border">
            <div className="mb-6">
              <h3 className="text-base font-bold text-serene-primary font-serif">Mood trend</h3>
              <p className="text-xs text-serene-muted mt-0.5">Daily emotional check-ins (last 30 days)</p>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <svg viewBox="0 0 600 140" className="w-full h-full text-serene-muted select-none">
                {/* Horizontal grid lines for Y-axis markers */}
                <line x1="0" y1="10" x2="600" y2="10" stroke="#D4CDB8" strokeDasharray="3 3" opacity="0.3" />
                <line x1="0" y1="30" x2="600" y2="30" stroke="#D4CDB8" strokeDasharray="3 3" opacity="0.3" />
                <line x1="0" y1="50" x2="600" y2="50" stroke="#D4CDB8" strokeDasharray="3 3" opacity="0.3" />
                <line x1="0" y1="70" x2="600" y2="70" stroke="#D4CDB8" strokeDasharray="3 3" opacity="0.3" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#D4CDB8" strokeDasharray="3 3" opacity="0.3" />
                <line x1="0" y1="110" x2="600" y2="110" stroke="#D4CDB8" strokeWidth="1" />

                {moodSeries.map((item, i) => {
                  const x = i * 20 + 3;
                  const isRecent = i >= 23;
                  const height = item.moodValue === 0 ? 2 : (item.moodValue / 5) * 100;
                  const y = 110 - height;
                  const fill = item.moodValue === 0 ? "#D4CDB8" : (isRecent ? "#4A7C59" : "#D4CDB8");
                  const showLabel = i % 5 === 0;
                  
                  let labelText = "";
                  if (showLabel) {
                    const parts = item.date.split("-");
                    const d = new Date(parts[0], parts[1] - 1, parts[2]);
                    labelText = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  }

                  return (
                    <g key={item.date}>
                      <rect
                        x={x}
                        y={y}
                        width={14}
                        height={height}
                        fill={fill}
                        rx={item.moodValue === 0 ? 0 : 2}
                      />
                      {showLabel && (
                        <text
                          x={x + 7}
                          y={125}
                          textAnchor="middle"
                          fontSize="9"
                          fill="#8C7E6A"
                          className="font-sans"
                        >
                          {labelText}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </Card>

          {/* Mood Distribution Section */}
          <Card className="border-serene-border mt-6">
            <div className="mb-6">
              <h3 className="text-base font-bold text-serene-primary font-serif">Mood Distribution</h3>
              <p className="text-xs text-serene-muted mt-0.5">All-time frequency of each logged mood</p>
            </div>

            {moodDistribution.total === 0 ? (
              <p className="text-xs text-serene-muted font-sans py-2">
                No mood data yet. Start logging your mood to see patterns here.
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                {moodDistribution.items.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-24 text-xs text-serene-text font-semibold select-none">
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </div>
                    {/* Progress track */}
                    <div className="flex-1 h-2 bg-[#F5F0E8] rounded-full overflow-hidden border border-serene-border">
                      <div
                        className="h-full bg-[#4A7C59] rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="w-24 text-right text-xs text-serene-muted font-medium">
                      {item.count} {item.count === 1 ? "entry" : "entries"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Pattern Insight Card */}
          <Card className="border-serene-border mt-6">
            <div className="mb-4">
              <h3 className="text-base font-bold text-serene-primary font-serif">Your Pattern</h3>
            </div>
            <div className="flex flex-col gap-2">
              {patternInsight.hasEnoughData ? (
                <p style={{ color: "#2C2416", fontSize: "14px" }} className="font-serif font-bold">
                  Your mood tends to be highest on {patternInsight.bestDayName}s.
                </p>
              ) : (
                <p style={{ color: "#8E7E6B", fontSize: "13px" }} className="font-sans">
                  Keep logging your mood — patterns will appear here after a week or two.
                </p>
              )}
              <p style={{ color: "#8E7E6B", fontSize: "13px" }} className="font-sans">
                You've logged your mood on {patternInsight.loggedCountIn30} of the last 30 days.
              </p>
            </div>
          </Card>

          {/* Activity Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Journal Activity */}
            <Card className="border-serene-border">
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-serene-primary font-serif">Journal Activity</h3>
                <span className="text-2xl font-bold text-serene-primary mt-2">
                  {journalsLast30.length}
                </span>
                <span className="text-xs text-serene-muted mt-0.5">entries this month</span>
                
                <div className="h-10 mt-4">
                  <svg width="120" height="40" viewBox="0 0 120 40" className="text-serene-muted select-none">
                    {journal4WeeksCounts.map((count, i) => {
                      const maxVal = Math.max(...journal4WeeksCounts, 4);
                      const barHeight = (count / maxVal) * 30;
                      const y = 35 - barHeight;
                      return (
                        <rect
                          key={i}
                          x={i * 30 + 6}
                          y={y}
                          width={18}
                          height={barHeight}
                          fill="#4A7C59"
                          rx={2}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </Card>

            {/* Gratitude Activity */}
            <Card className="border-serene-border">
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-serene-primary font-serif">Gratitude Activity</h3>
                <span className="text-2xl font-bold text-serene-primary mt-2">
                  {gratitudeLast30.length}
                </span>
                <span className="text-xs text-serene-muted mt-0.5">logs this month</span>
                
                <div className="h-10 mt-4">
                  <svg width="120" height="40" viewBox="0 0 120 40" className="text-serene-muted select-none">
                    {gratitude4WeeksCounts.map((count, i) => {
                      const maxVal = Math.max(...gratitude4WeeksCounts, 4);
                      const barHeight = (count / maxVal) * 30;
                      const y = 35 - barHeight;
                      return (
                        <rect
                          key={i}
                          x={i * 30 + 6}
                          y={y}
                          width={18}
                          height={barHeight}
                          fill="#C17F24"
                          rx={2}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </Card>
          </div>

          {/* Streak Card */}
          <Card className="border-serene-border mt-6 mb-8">
            <div className="mb-4">
              <h3 className="text-base font-bold text-serene-primary font-serif">Streak Status</h3>
            </div>
            <div className="flex gap-12">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-serene-primary">
                  {currentStreak}
                </span>
                <span className="text-xs text-serene-muted mt-0.5 font-semibold">days</span>
                <span className="text-xs font-semibold text-serene-text mt-1">Current Streak</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-serene-primary">
                  {longestStreak}
                </span>
                <span className="text-xs text-serene-muted mt-0.5 font-semibold">days</span>
                <span className="text-xs font-semibold text-serene-text mt-1">Longest Streak</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Emotion Distribution summary */}
        <div>
          <Card className="border-serene-border">
            <div className="mb-6">
              <h3 className="text-base font-bold text-serene-primary font-serif">Journal emotions</h3>
              <p className="text-xs text-serene-muted mt-0.5">Self-logged tags this week (demo data)</p>
            </div>

            <div className="flex flex-col gap-5">
              {emotionSummary.map((emo) => (
                <div key={emo.label} className="flex flex-col">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className={`px-2 py-0.5 rounded font-semibold ${emo.bg} ${emo.text}`}>
                      {emo.label}
                    </span>
                    <span className="text-serene-muted font-medium">{emo.count} entries</span>
                  </div>
                  {/* Progress track */}
                  <div className="w-full h-2 bg-serene-bg rounded-full overflow-hidden border border-serene-border">
                    <div className={`h-full bg-serene-primary ${emo.fill} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ── WRAPUP SUMMARY CARD ── */}
      <Card className="border-serene-border bg-serene-primarySoft/25 mb-8">
        <h3 className="text-sm font-bold text-serene-primary uppercase tracking-wider mb-2">Weekly analysis summary</h3>
        <p className="text-xs text-serene-muted mb-4">{getWeeklyRange()} (demo summary data)</p>
        <p className="text-sm text-serene-text leading-relaxed font-serif">
          Your emotional logs show steady, supportive trends this week. Thursday reflected a slightly lower check-in matching a journal note containing higher stress descriptors. However, Friday logged a solid rebound. Continuing to document your days regularly helps build mindfulness.
        </p>
      </Card>

      {/* ── DOWNLOAD WELLNESS REPORT CARD ── */}
      <Card className="border-serene-border mb-8">
        <div className="mb-4">
          <h3 className="text-base font-bold text-serene-primary font-serif">Download Wellness Report</h3>
          <p className="text-[13px] text-serene-muted mt-0.5">
            Get a summary of your mood, journal, and gratitude data.
          </p>
        </div>

        <div className="flex gap-[12px] mb-4">
          <button
            onClick={() => setReportRange("weekly")}
            style={reportRange === "weekly" ? activeStyle : inactiveStyle}
          >
            Weekly
          </button>
          <button
            onClick={() => setReportRange("monthly")}
            style={reportRange === "monthly" ? activeStyle : inactiveStyle}
          >
            Monthly
          </button>
        </div>

        <button
          onClick={handleDownload}
          disabled={isGenerating}
          style={downloadButtonStyle}
        >
          {isGenerating ? "Generating..." : "Download PDF Report"}
        </button>

        {reportError && (
          <p style={{ color: "#C17F24", fontSize: "13px", marginTop: "8px" }}>
            {reportError}
          </p>
        )}
      </Card>
    </AppShell>
  );
}
