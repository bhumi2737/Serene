import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Button from "../components/Button";
import Card from "../components/Card";
import { ChevronLeft, Save } from "lucide-react";
import { createJournal, analyseJournal, updateJournalAnalysis } from "../utils/api";

const emotions = ["Calm", "Hopeful", "Anxious", "Sad", "Grateful"];

export default function JournalNewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("Calm");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [analysing, setAnalysing] = useState(false);
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
      const created = await createJournal(today, title.trim(), text.trim());
      const id = created._id;
      setSaving(false);
      
      setAnalysing(true);
      try {
        const analysis = await analyseJournal(text.trim());
        await updateJournalAnalysis(id, analysis.emotions, analysis.summary);
      } catch (analysisErr) {
        console.error("AI journal analysis failed:", analysisErr);
      }
      setAnalysing(false);
      setSaved(true);
      navigate("/journal");
    } catch (err) {
      setError(err.message || "Failed to save entry.");
      setSaving(false);
      setAnalysing(false);
    }
  };

  return (
    <AppShell>
      {/* ── HEADER & NAVIGATION ── */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-serene-border/30">
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
            disabled={saving || analysing || saved}
            onClick={handleSave}
            className="shadow-xs hover:scale-101 transition-transform"
          >
            {saving ? "Saving..." : (analysing ? "Analysing..." : (saved ? "Saved" : "Save Entry"))}
          </Button>
          {error && (
            <span className="text-serene-amber text-xs mt-1.5 font-sans font-medium">
              {error}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-serene-surface/50 border-serene-border/40 rounded-[24px]">
          <span className="text-[11px] font-bold text-serene-primary uppercase tracking-widest block mb-3 font-sans">
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
              className="w-full bg-transparent border-b border-serene-border/50 py-3.5 text-2xl font-bold text-serene-primary placeholder-serene-muted focus:outline-none focus:border-serene-primary font-serif transition-colors"
            />
            {titleError && <p className="text-serene-amber text-xs mt-1.5 font-sans font-semibold">{titleError}</p>}
          </div>

          {/* Emotion Tag Selection */}
          <div className="mb-6">
            <span className="text-[11px] font-bold text-serene-muted uppercase tracking-wider block mb-3 font-sans">
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
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-serene-primarySoft border-serene-primary text-serene-primary font-bold shadow-xs"
                        : "bg-transparent border-serene-border/60 text-serene-muted hover:border-serene-muted"
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
              className="w-full bg-serene-bg/30 border border-serene-border/60 rounded-[14px] p-4 text-[15px] text-serene-text leading-relaxed font-serif focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary resize-none shadow-inner transition-all duration-300"
            />
            {bodyError && <p className="text-serene-amber text-xs mt-1.5 font-sans font-semibold">{bodyError}</p>}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
