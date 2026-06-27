import React, { useState } from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { Smile, Check, AlertCircle } from "lucide-react";

const moods = [
  { emoji: "😔", label: "Low", value: 1, color: "#66736F" },
  { emoji: "😐", label: "Okay", value: 2, color: "#A9C7E8" },
  { emoji: "😊", label: "Good", value: 3, color: "#DCEBE4" },
  { emoji: "😄", label: "Great", value: 4, color: "#E78B78" },
  { emoji: "🤩", label: "Amazing", value: 5, color: "#23443B" },
];

// Demo weekly historical data formatted for Recharts
const initialHistory = [
  { name: "Mon", score: 3, label: "Good", date: "June 22" },
  { name: "Tue", score: 2, label: "Okay", date: "June 23" },
  { name: "Wed", score: 4, label: "Great", date: "June 24" },
  { name: "Thu", score: 1, label: "Low", date: "June 25" },
  { name: "Fri", score: 3, label: "Good", date: "June 26" },
  { name: "Sat", score: 4, label: "Great", date: "June 27" },
  { name: "Sun", score: 3, label: "Good", date: "June 28" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-serene-border p-3 rounded-lg shadow-md text-xs">
        <p className="font-bold text-serene-primary">{data.name} ({data.date})</p>
        <p className="text-serene-text mt-1">Logged: {data.label}</p>
      </div>
    );
  }
  return null;
};

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState(initialHistory);

  const handleSave = () => {
    if (selectedMood === null) return;

    // Append mock entry to demo history for today
    const currentMood = moods[selectedMood];
    const newEntry = {
      name: "Sun",
      score: currentMood.value,
      label: currentMood.label,
      date: "Today",
    };

    // Replace Sunday's placeholder entry
    const updated = history.map((h) => (h.name === "Sun" ? newEntry : h));
    setHistory(updated);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      setSelectedMood(null);
      setNote("");
    }, 2000);
  };

  const getMoodYLabel = (tick) => {
    switch (tick) {
      case 1: return "😔 Low";
      case 2: return "😐 Okay";
      case 3: return "😊 Good";
      case 4: return "😄 Great";
      case 5: return "🤩 Amazing";
      default: return "";
    }
  };

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

            {/* Mood selector buttons */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {moods.map((mood, i) => {
                const isSelected = selectedMood === i;
                return (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(i)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                      isSelected
                        ? "border-serene-primary bg-serene-primarySoft text-serene-primary font-semibold"
                        : "border-serene-border bg-serene-surface text-serene-text hover:border-serene-muted"
                    }`}
                  >
                    <span className="text-2xl mb-1">{mood.emoji}</span>
                    <span className="text-[10px] tracking-wide font-medium">{mood.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Conditional note and submit triggers */}
            {selectedMood !== null && (
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
              <strong>Wellness note:</strong> Tracking your mood can build self-reflection and emotional awareness. This visualization reflects mock dashboard logs for demonstration purposes.
            </p>
          </div>
        </div>

        {/* Right Side: Recharts Bar Visualization */}
        <div className="flex flex-col gap-6">
          <Card className="border-serene-border">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-serene-primary uppercase tracking-wider">Weekly trend</h3>
              <p className="text-[11px] text-serene-muted mt-0.5">June 22 – June 28 (demo data)</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={history}
                  margin={{ top: 10, right: 5, left: -25, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#DDE6E2" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#66736F", fontSize: 10 }}
                  />
                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={getMoodYLabel}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#66736F", fontSize: 9 }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(35, 68, 59, 0.03)" }} />
                  <Bar
                    dataKey="score"
                    fill="#A9C7E8"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="border-t border-serene-border pt-4 mt-2 text-center">
              <p className="text-xs font-semibold text-serene-primary">
                You checked in 7 times this week (demo data)
              </p>
            </div>
          </Card>
        </div>

      </div>
    </AppShell>
  );
}
