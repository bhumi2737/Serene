import React, { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { Heart, Check, Calendar } from "lucide-react";

export default function GratitudePage() {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [saved, setSaved] = useState(false);
  const [pastEntries, setPastEntries] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("serene_gratitude");
    if (stored) {
      setPastEntries(JSON.parse(stored));
    } else {
      // Default placeholder logs for demonstration
      const defaults = [
        {
          date: "Yesterday",
          items: [
            "Had a warm cup of herbal tea in the morning.",
            "A nice conversation with an old friend.",
            "Completed my project milestones ahead of schedule."
          ]
        },
        {
          date: "Last Wednesday",
          items: [
            "The weather was calm and sunny.",
            "Read a helpful article on mindfulness."
          ]
        }
      ];
      setPastEntries(defaults);
      localStorage.setItem("serene_gratitude", JSON.stringify(defaults));
    }
  }, []);

  const handleChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const hasContent = inputs.some((val) => val.trim() !== "");

  const handleSave = () => {
    if (!hasContent) return;

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    const newEntry = {
      date: today,
      items: inputs.filter((val) => val.trim() !== ""),
    };

    const updated = [newEntry, ...pastEntries];
    setPastEntries(updated);
    localStorage.setItem("serene_gratitude", JSON.stringify(updated));

    setInputs(["", "", ""]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formattedToday = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Gratitude Journal"
        subtitle="Slow down and write down small things that bring you comfort"
      />

      {/* ── DUAL COLUMN GRID LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Column 1: Today's check-in */}
        <div className="flex flex-col gap-4 animate-fade-in-up">
          <Card className="border-serene-border">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-4 h-4 text-serene-accent" />
              <span className="text-xs font-semibold text-serene-muted uppercase tracking-wider">
                {formattedToday} Check-in
              </span>
            </div>
            
            <p className="text-xs text-serene-muted mb-6 leading-relaxed">
              Listing items you are thankful for is a helpful tool for mindfulness. Try logging three things today.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              {inputs.map((val, i) => {
                const isFocused = focusedInput === i;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors ${
                        val.trim()
                          ? "bg-serene-primary text-white"
                          : isFocused
                          ? "bg-serene-primarySoft text-serene-primary"
                          : "bg-serene-bg text-serene-muted"
                      }`}
                    >
                      {i + 1}
                    </div>

                    <input
                      type="text"
                      value={val}
                      onFocus={() => setFocusedInput(i)}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => handleChange(i, e.target.value)}
                      placeholder={
                        i === 0
                          ? "I am thankful for..."
                          : i === 1
                          ? "Another thing I appreciate..."
                          : "A small positive detail today..."
                      }
                      className={`flex-1 bg-serene-bg border rounded-lg px-3 py-2 text-sm text-serene-text placeholder-serene-muted focus:outline-none focus:ring-1 focus:ring-serene-primary ${
                        isFocused ? "border-serene-primary" : "border-serene-border"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={!hasContent || saved}
                icon={saved ? Check : undefined}
              >
                {saved ? "Logged ✓" : "Save today's check-in"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Column 2: Past entries list */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          <h3 className="text-xs font-bold text-serene-muted uppercase tracking-wider">Past gratitude reflections</h3>

          {pastEntries.length === 0 ? (
            <EmptyState
              title="No reflections logged yet"
              description="Your saved daily gratitude entries will show up here."
              icon={Heart}
            />
          ) : (
            <div className="flex flex-col gap-4">
              {pastEntries.map((group, gi) => (
                <Card key={gi} className="border-serene-border p-5">
                  <div className="flex items-center gap-1.5 text-xs text-serene-muted mb-3 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{group.date}</span>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {group.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2.5 text-sm text-serene-text leading-relaxed font-serif">
                        <div className="w-1.5 h-1.5 rounded-full bg-serene-accent flex-shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </AppShell>
  );
}
