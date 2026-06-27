import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import { Plus, Search, Filter, Sparkles, Calendar, BookOpen } from "lucide-react";

// Emotion styles for light mode
const emotionStyles = {
  Hopeful: { bg: "bg-[#EEF5E8]", text: "text-[#3B6D11]" },
  Calm: { bg: "bg-[#DCEBE4]", text: "text-[#23443B]" },
  Anxious: { bg: "bg-[#FFFBEB]", text: "text-[#B45309]" },
  Sad: { bg: "bg-[#EFF6FF]", text: "text-[#1D4ED8]" },
  Grateful: { bg: "bg-[#FDF2F8]", text: "text-[#9D174D]" },
};

const defaultPrompts = [
  "What did you learn about yourself today?",
  "Describe a moment today when you felt completely present.",
  "What is one small thing that made you smile today?",
  "Write about a boundary you set or wish you had set recently.",
];

export default function JournalPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("All");
  const [currentPrompt, setCurrentPrompt] = useState("");

  useEffect(() => {
    // Select a random prompt on load
    setCurrentPrompt(defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)]);

    const stored = localStorage.getItem("serene_journal");
    if (stored) {
      setEntries(JSON.parse(stored));
    } else {
      const defaults = [
        {
          id: 1,
          title: "Evening reflection",
          preview: "Finished my project today. It felt really good to see everything come together...",
          emotion: "Hopeful",
          aiDetected: "reflective, proud",
          time: "8:42 PM",
          date: "Today",
        },
        {
          id: 2,
          title: "Morning pages",
          preview: "Couldn't sleep well. A lot on my mind about placements...",
          emotion: "Anxious",
          aiDetected: "anxious, tired",
          time: "8:15 AM",
          date: "Today",
        },
        {
          id: 3,
          title: "Sunday wind down",
          preview: "Read for an hour. No screens after 9pm. Felt grounded...",
          emotion: "Calm",
          aiDetected: "calm, peaceful",
          time: "10:00 PM",
          date: "Yesterday",
        },
      ];
      setEntries(defaults);
      localStorage.setItem("serene_journal", JSON.stringify(defaults));
    }
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmotion = selectedEmotion === "All" || entry.emotion === selectedEmotion;
    return matchesSearch && matchesEmotion;
  });

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Journal"
        subtitle="Write down your thoughts to discover patterns"
        actions={
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => navigate("/journal/new")}
          >
            New entry
          </Button>
        }
      />

      {/* ── WRITING PROMPT BANNER ── */}
      <div className="bg-serene-primarySoft/40 border border-serene-border rounded-lg p-5 mb-8 flex items-start gap-4">
        <div className="p-2 rounded-full bg-serene-surface text-serene-primary flex-shrink-0 mt-0.5 shadow-sm">
          <Sparkles className="w-4 h-4 text-serene-primary" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-serene-primary uppercase tracking-wider">Prompt of the day</h4>
          <p className="text-sm text-serene-text mt-1 italic font-serif">"{currentPrompt}"</p>
        </div>
      </div>

      {/* ── FILTERS & SEARCH ROW ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-serene-surface p-4 rounded-lg border border-serene-border">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-serene-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries..."
            className="w-full pl-9 pr-4 py-2 border border-serene-border rounded-lg bg-serene-bg text-sm text-serene-text placeholder-serene-muted focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
          />
        </div>

        {/* Emotion Filter dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-serene-muted" />
          <select
            value={selectedEmotion}
            onChange={(e) => setSelectedEmotion(e.target.value)}
            className="border border-serene-border rounded-lg bg-serene-bg text-sm text-serene-text py-2 px-3 focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
          >
            <option value="All">All emotions</option>
            <option value="Hopeful">Hopeful</option>
            <option value="Calm">Calm</option>
            <option value="Anxious">Anxious</option>
            <option value="Sad">Sad</option>
            <option value="Grateful">Grateful</option>
          </select>
        </div>
      </div>

      {/* ── JOURNAL ENTRIES TIMELINE ── */}
      {filteredEntries.length === 0 ? (
        <EmptyState
          title="No journal entries found"
          description={
            searchQuery || selectedEmotion !== "All"
              ? "Try adjusting your filters or search terms."
              : "Start documenting your personal journey today."
          }
          icon={BookOpen}
          actionLabel={searchQuery || selectedEmotion !== "All" ? undefined : "Write First Entry"}
          onAction={() => navigate("/journal/new")}
        />
      ) : (
        <div className="flex flex-col gap-6 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-serene-border">
          {filteredEntries.map((entry) => {
            const styles = emotionStyles[entry.emotion] || emotionStyles["Calm"];
            const showAI = entry.aiDetected && entry.aiDetected !== "—";

            return (
              <div key={entry.id} className="relative pl-12 flex flex-col md:flex-row gap-4">
                {/* Timeline node icon */}
                <div className="absolute left-3.5 top-2.5 w-5 h-5 rounded-full bg-serene-bg border-4 border-serene-border flex items-center justify-center -translate-x-1/2 z-10 shadow-sm" />

                {/* Entry Card */}
                <Card className="flex-1 hover:border-serene-primarySoft transition-colors">
                  {/* Top line */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-base font-bold text-serene-primary">{entry.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles.bg} ${styles.text}`}>
                      {entry.emotion}
                    </span>
                  </div>

                  {/* Body preview */}
                  <p className="text-sm text-serene-text leading-relaxed font-serif mb-4 whitespace-pre-line">
                    {entry.preview}
                  </p>

                  {/* Footer tags & metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-serene-border text-xs text-serene-muted">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{entry.date} at {entry.time}</span>
                    </div>

                    {showAI && (
                      <div className="flex items-center gap-1 bg-serene-bg border border-serene-border px-2 py-1 rounded">
                        <span className="font-semibold text-[10px] text-serene-primary uppercase tracking-wider">AI companion tag:</span>
                        <span className="text-[11px] text-serene-text font-medium">{entry.aiDetected}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
