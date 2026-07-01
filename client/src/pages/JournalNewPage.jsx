import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Button from "../components/Button";
import Card from "../components/Card";
import { ChevronLeft, Save } from "lucide-react";
import { createJournal } from "../utils/api";

const emotions = ["Calm", "Hopeful", "Anxious", "Sad", "Grateful"];

export default function JournalNewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("Calm");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");

  const handleSave = async () => {
    setTitleError("");
    setBodyError("");
    setError("");

    let hasError = false;
    if (!title.trim()) {
      setTitleError("This field is required.");
      hasError = true;
    }
    if (!text.trim()) {
      setBodyError("This field is required.");
      hasError = true;
    }
    if (hasError) return;

    setSaving(true);
    const today = new Date().toISOString().split("T")[0];
    try {
      await createJournal(today, title.trim(), text.trim());
      setSaved(true);
      setTimeout(() => {
        navigate("/journal");
      }, 500);
    } catch (err) {
      setError(err.message || "Failed to save entry.");
      setSaving(false);
    }
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
        <div className="flex flex-col items-end">
          <Button
            variant="primary"
            icon={Save}
            disabled={saving || saved}
            onClick={handleSave}
          >
            {saving ? "Saving..." : (saved ? "Saved" : "Save Entry")}
          </Button>
          {error && (
            <span className="text-serene-amber text-xs mt-1.5 font-sans font-medium">
              {error}
            </span>
          )}
        </div>
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
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setTitleError("");
              }}
              placeholder="Title of reflection"
              className="w-full bg-transparent border-b border-serene-border dark:border-[#3A3742] py-3 text-xl font-semibold text-serene-primary dark:text-[#EDE8E0] placeholder-serene-muted dark:placeholder-[#A39C8F] focus:outline-none focus:border-serene-primary font-serif"
            />
            {titleError && <p className="text-serene-amber text-xs mt-1 font-sans">{titleError}</p>}
          </div>

          {/* Emotion Tag Selection (kept for layout preservation) */}
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
                        ? "bg-serene-primarySoft dark:bg-[#2A2830] border-serene-primary dark:border-[#3A3742] text-serene-primary dark:text-[#EDE8E0] font-semibold"
                        : "bg-serene-bg dark:bg-[#1C1B1F] border-serene-border dark:border-[#3A3742] text-serene-text dark:text-[#EDE8E0] hover:border-serene-muted"
                    }`}
                  >
                    {emo}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Area Body */}
          <div>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (e.target.value.trim()) setBodyError("");
              }}
              placeholder="Start writing freely..."
              rows={12}
              className="w-full bg-serene-bg dark:bg-[#1C1B1F] border border-serene-border dark:border-[#3A3742] rounded-lg p-4 text-sm text-serene-text dark:text-[#EDE8E0] leading-relaxed font-serif focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary resize-none"
            />
            {bodyError && <p className="text-serene-amber text-xs mt-1 font-sans">{bodyError}</p>}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
