import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import StatItem from "../components/StatItem";
import { BookOpen, Heart, MessageSquare, Plus, Check } from "lucide-react";

const moods = [
  { emoji: "😔", label: "Low" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😊", label: "Good" },
  { emoji: "😄", label: "Great" },
  { emoji: "🤩", label: "Amazing" },
];

export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Bhumi");
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodSaved, setMoodSaved] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleMoodSelect = (index) => {
    setSelectedMood(index);
    setMoodSaved(true);
  };

  const getNextAction = (moodIdx) => {
    if (moodIdx === 0 || moodIdx === 1) {
      return {
        text: "Sharing your thoughts can bring relief. Would you like to write in your journal or chat with our companion?",
        primaryText: "Write a Journal Entry",
        primaryPath: "/journal",
        secondaryText: "Talk to Companion",
        secondaryPath: "/chat",
      };
    } else {
      return {
        text: "We are glad you are feeling well. Take a moment to write down what you are grateful for today.",
        primaryText: "Record Gratitude",
        primaryPath: "/gratitude",
        secondaryText: "Write in Journal",
        secondaryPath: "/journal",
      };
    }
  };

  return (
    <AppShell>
      {/* ── GREETING HERO ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-serene-border mb-8">
        <div>
          <span className="text-xs font-semibold text-serene-muted uppercase tracking-wider">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
          <h1 className="text-3xl font-bold text-serene-primary font-serif mt-1">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-sm text-serene-muted mt-1">
            A quiet space to understand how you feel.
          </p>
        </div>

        {/* Minimalist Botanical SVG Graphic */}
        <div className="flex-shrink-0 opacity-80">
          <svg width="120" height="90" viewBox="0 0 120 120" fill="none">
            <path
              d="M60 110 C 60 110, 40 70, 45 40 C 47 30, 55 15, 60 10 C 65 15, 73 30, 75 40 C 80 70, 60 110, 60 110 Z"
              fill="rgba(35, 68, 59, 0.08)"
              stroke="#23443B"
              strokeWidth="1.2"
            />
            <path
              d="M60 110 C 60 110, 80 80, 85 65 C 88 55, 92 45, 90 40 C 85 40, 78 48, 70 58 Z"
              fill="rgba(35, 68, 59, 0.04)"
              stroke="#23443B"
              strokeWidth="0.8"
            />
            <path
              d="M60 110 C 60 110, 40 80, 35 65 C 32 55, 28 45, 30 40 C 35 40, 42 48, 50 58 Z"
              fill="rgba(35, 68, 59, 0.04)"
              stroke="#23443B"
              strokeWidth="0.8"
            />
            <circle cx="60" cy="10" r="2.5" fill="#E78B78" />
            <circle cx="90" cy="40" r="2.5" fill="#E78B78" />
            <circle cx="30" cy="40" r="2.5" fill="#E78B78" />
          </svg>
        </div>
      </div>

      {/* ── MAIN ACTIONS / SPLIT LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Mood Logger Card (Primary Action) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="border-serene-border relative overflow-hidden">
            <h2 className="text-lg font-bold text-serene-primary font-serif mb-2">How are you feeling today?</h2>
            <p className="text-sm text-serene-muted mb-6">Select a mood option to record your daily check-in.</p>

            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {moods.map((mood, idx) => {
                const isSelected = selectedMood === idx;
                return (
                  <button
                    key={mood.label}
                    onClick={() => handleMoodSelect(idx)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                      isSelected
                        ? "border-serene-primary bg-serene-primarySoft text-serene-primary font-semibold"
                        : "border-serene-border bg-serene-surface text-serene-text hover:border-serene-muted"
                    }`}
                  >
                    <span className="text-2xl md:text-3xl mb-1">{mood.emoji}</span>
                    <span className="text-[11px] tracking-wide">{mood.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Next Recommended Action */}
            {moodSaved && selectedMood !== null && (
              <div className="mt-6 p-4 bg-serene-bg border border-serene-border rounded-lg animate-fade-in">
                <div className="flex items-center gap-2 text-serene-primary font-medium text-sm mb-1.5">
                  <Check className="w-4 h-4 text-serene-primary" />
                  <span>Check-in saved</span>
                </div>
                <p className="text-xs text-serene-muted leading-relaxed mb-4">
                  {getNextAction(selectedMood).text}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(getNextAction(selectedMood).primaryPath)}
                  >
                    {getNextAction(selectedMood).primaryText}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(getNextAction(selectedMood).secondaryPath)}
                  >
                    {getNextAction(selectedMood).secondaryText}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Secondary Actions: Quick Activity List */}
          <div>
            <h3 className="text-sm font-semibold text-serene-muted uppercase tracking-wider mb-3">Other ways to check in</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                onClick={() => navigate("/journal")}
                className="p-5 flex items-start gap-3 hover:border-serene-primary/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-serene-primarySoft flex items-center justify-center text-serene-primary flex-shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-serene-primary">Journal</h4>
                  <p className="text-xs text-serene-muted mt-1 leading-relaxed">Distraction-free personal entries</p>
                </div>
              </Card>

              <Card
                onClick={() => navigate("/gratitude")}
                className="p-5 flex items-start gap-3 hover:border-serene-primary/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-serene-primarySoft flex items-center justify-center text-serene-primary flex-shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-serene-primary">Gratitude</h4>
                  <p className="text-xs text-serene-muted mt-1 leading-relaxed">Log items you are thankful for</p>
                </div>
              </Card>

              <Card
                onClick={() => navigate("/chat")}
                className="p-5 flex items-start gap-3 hover:border-serene-primary/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-serene-primarySoft flex items-center justify-center text-serene-primary flex-shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-serene-primary">Companion</h4>
                  <p className="text-xs text-serene-muted mt-1 leading-relaxed">Gentle prompts & chat companion</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Side: Demo Statistics Row (Compact list layout) */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-semibold text-serene-muted uppercase tracking-wider mb-3">Weekly Summary</h3>
            <div className="flex flex-col gap-3">
              <StatItem
                value="😊 Good"
                label="Average mood this week"
                subtext="Based on past 7 days (demo data)"
              />
              <StatItem
                value="3 entries"
                label="Journal Logs"
                subtext="This week (demo data)"
              />
              <StatItem
                value="5 logs"
                label="Gratitude Check-ins"
                subtext="This week (demo data)"
              />
              <StatItem
                value="10 days"
                label="Active Streak"
                subtext="Consistent check-ins (demo data)"
              />
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
