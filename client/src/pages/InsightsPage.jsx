import React from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import StatItem from "../components/StatItem";
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
import { Info } from "lucide-react";

const weekData = [
  { name: "Mon", score: 3, label: "Good" },
  { name: "Tue", score: 2, label: "Okay" },
  { name: "Wed", score: 4, label: "Great" },
  { name: "Thu", score: 1, label: "Low" },
  { name: "Fri", score: 5, label: "Amazing" },
  { name: "Sat", score: 4, label: "Great" },
  { name: "Sun", score: 3, label: "Good" },
];

const emotionSummary = [
  { label: "Hopeful", count: 5, bg: "bg-[#EEF5E8]", text: "text-[#3B6D11]", fill: "w-[100%]" },
  { label: "Calm", count: 4, bg: "bg-[#DCEBE4]", text: "text-[#23443B]", fill: "w-[80%]" },
  { label: "Anxious", count: 3, bg: "bg-[#FFFBEB]", text: "text-[#B45309]", fill: "w-[60%]" },
  { label: "Grateful", count: 2, bg: "bg-[#FDF2F8]", text: "text-[#9D174D]", fill: "w-[40%]" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-serene-border p-2.5 rounded-lg shadow-sm text-xs">
        <p className="font-bold text-serene-primary">{data.name}</p>
        <p className="text-serene-text mt-0.5">Mood: {data.label}</p>
      </div>
    );
  }
  return null;
};

export default function InsightsPage() {
  const getWeeklyRange = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    const format = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${format(start)} – ${format(end)}`;
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
        title="Insights"
        subtitle="Understand your emotional trends and notice patterns over time"
      />

      {/* ── STATS METRICS GRID ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
        <StatItem
          value="12 logs"
          label="Journal entries"
          subtext="This month (demo data)"
        />
        <StatItem
          value="😊 Good"
          label="Average mood"
          subtext="This week (demo data)"
        />
        <StatItem
          value="10 days"
          label="Streak"
          subtext="Current active checks (demo data)"
        />
        <StatItem
          value="9 logs"
          label="Gratitude checks"
          subtext="This month (demo data)"
        />
      </div>

      {/* ── CHARTS SPLIT LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
        
        {/* Weekly Mood Chart */}
        <div className="lg:col-span-2">
          <Card className="border-serene-border">
            <div className="mb-6">
              <h3 className="text-base font-bold text-serene-primary font-serif">Mood this week</h3>
              <p className="text-xs text-serene-muted mt-0.5">Daily emotional check-ins (demo data)</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#DDE6E2" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#66736F", fontSize: 11 }} />
                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={getMoodYLabel}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#66736F", fontSize: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(35, 68, 59, 0.02)" }} />
                  <Bar dataKey="score" fill="#A9C7E8" radius={[4, 4, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
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
    </AppShell>
  );
}
