import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Button from "../components/Button";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import { ChevronLeft, Save } from "lucide-react";

const emotions = ["Calm", "Hopeful", "Anxious", "Sad", "Grateful"];

export default function JournalNewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("Calm");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!text.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: title.trim() || "Untitled reflection",
      preview: text.trim(),
      emotion,
      aiDetected: "—", // Default empty for companion
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      date: "Today",
      fullText: text.trim(),
    };

    const stored = localStorage.getItem("serene_journal");
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [newEntry, ...existing];
    localStorage.setItem("serene_journal", JSON.stringify(updated));

    setSaved(true);
    setTimeout(() => navigate("/journal"), 1000);
  };

  return (
    <AppShell>
      {/* ── HEADER & NAVIGATION ── */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-serene-border">
        <Button
          variant="ghost"
          size="sm"
          icon={ChevronLeft}
          onClick={() => navigate("/journal")}
        >
          Back to list
        </Button>
        <Button
          variant="primary"
          icon={Save}
          disabled={!text.trim() || saved}
          onClick={handleSave}
        >
          {saved ? "Saved" : "Save Entry"}
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <span className="text-xs font-semibold text-serene-muted uppercase tracking-wider block mb-2">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of reflection"
            className="w-full bg-transparent border-b border-serene-border py-3 text-xl font-semibold text-serene-primary placeholder-serene-muted focus:outline-none focus:border-serene-primary mb-6 font-serif"
          />

          {/* Emotion Tag Selection */}
          <div className="mb-6">
            <span className="text-xs font-semibold text-serene-muted uppercase tracking-wider block mb-3">
              How does this reflect your emotional state?
            </span>
            <div className="flex flex-wrap gap-2">
              {emotions.map((emo) => {
                const isActive = emotion === emo;
                return (
                  <button
                    key={emo}
                    type="button"
                    onClick={() => setEmotion(emo)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      isActive
                        ? "bg-serene-primarySoft border-serene-primary text-serene-primary font-semibold"
                        : "bg-serene-bg border-serene-border text-serene-text hover:border-serene-muted"
                    }`}
                  >
                    {emo}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Area Body */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing freely..."
            rows={12}
            className="w-full bg-serene-bg border border-serene-border rounded-lg p-4 text-sm text-serene-text leading-relaxed font-serif focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary resize-none"
          />
        </Card>
      </div>
    </AppShell>
  );
}
