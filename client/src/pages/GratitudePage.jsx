import React, { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Heart } from "lucide-react";
import { getGratitude, saveGratitude } from "../utils/api";

export default function GratitudePage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");

  useEffect(() => {
    const fetchGratitude = async () => {
      try {
        setError("");
        const data = await getGratitude();
        setEntries(data);

        const todayString = new Date().toISOString().split("T")[0];
        const todayEntry = data.find((e) => e.date === todayString);
        if (todayEntry) {
          setItem1(todayEntry.items[0] || "");
          setItem2(todayEntry.items[1] || "");
          setItem3(todayEntry.items[2] || "");
        }
      } catch (err) {
        setError(err.message || "Failed to load gratitude logs.");
      } finally {
        setLoading(false);
      }
    };
    fetchGratitude();
  }, []);

  const handleSave = async () => {
    setError("");
    setSuccess(false);

    if (!item1.trim() && !item2.trim() && !item3.trim()) {
      setError("Please add at least one item.");
      return;
    }

    const todayString = new Date().toISOString().split("T")[0];
    try {
      const itemsList = [item1.trim(), item2.trim(), item3.trim()];
      const savedLog = await saveGratitude(todayString, itemsList);

      setEntries((prev) => {
        const existingIndex = prev.findIndex((e) => e.date === todayString);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = savedLog;
          return updated;
        } else {
          return [...prev, savedLog];
        }
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2500);
    } catch (err) {
      setError(err.message || "Failed to save gratitude log.");
    }
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Sort entries by date descending for past entries listing
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (loading) {
    return (
      <AppShell>
        <PageHeader
          title="Gratitude"
          subtitle="Three things you're grateful for today."
        />
        <div className="p-6 text-sm text-serene-muted">Loading gratitude logs...</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Gratitude"
        subtitle="Three things you're grateful for today."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Column 1: Today's check-in */}
        <div className="flex flex-col gap-4 animate-fade-in-up">
          <Card className="border-serene-border/50 p-8 bg-serene-surface/60 shadow-xs">
            <h2 className="font-serif text-[19px] text-serene-text font-bold mb-5 flex items-center gap-2">
              <span className="text-xl">🌸</span> Today's highlights
            </h2>

            <div className="flex flex-col gap-3.5">
              <input
                type="text"
                value={item1}
                onChange={(e) => {
                  setItem1(e.target.value);
                  setError("");
                }}
                placeholder="1. Something that made you smile..."
                className="w-full bg-serene-bg/50 border border-serene-border/70 rounded-[14px] p-[14px_18px] text-[15px] text-serene-text placeholder-serene-muted focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary transition-all duration-300"
              />
              <input
                type="text"
                value={item2}
                onChange={(e) => {
                  setItem2(e.target.value);
                  setError("");
                }}
                placeholder="2. Someone you appreciate..."
                className="w-full bg-serene-bg/50 border border-serene-border/70 rounded-[14px] p-[14px_18px] text-[15px] text-serene-text placeholder-serene-muted focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary transition-all duration-300"
              />
              <input
                type="text"
                value={item3}
                onChange={(e) => {
                  setItem3(e.target.value);
                  setError("");
                }}
                placeholder="3. A small victory or positive event..."
                className="w-full bg-serene-bg/50 border border-serene-border/70 rounded-[14px] p-[14px_18px] text-[15px] text-serene-text placeholder-serene-muted focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary transition-all duration-300"
              />
            </div>

            {error && (
              <p className="text-serene-amber text-xs mt-3 font-sans font-semibold">
                {error}
              </p>
            )}

            {success && (
              <p className="text-serene-primary text-xs mt-3 font-sans font-semibold flex items-center gap-1">
                Saved to your journal! 🌿
              </p>
            )}

            <Button
              onClick={handleSave}
              variant="primary"
              className="mt-6 w-full justify-center py-3 shadow-xs hover:scale-101 transition-transform"
            >
              Save today's gratitude
            </Button>
          </Card>
        </div>

        {/* Column 2: Past entries list */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          <h3 className="font-serif text-[18px] text-serene-text font-semibold">
            Previous entries
          </h3>

          {sortedEntries.length === 0 ? (
            <p className="text-serene-muted text-sm italic">
              No previous entries yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {sortedEntries.map((entry, idx) => (
                <Card key={idx} className="border-serene-border/40 p-6 bg-serene-surface/40 hover-lift hover-glow transition-all duration-300">
                  <div className="flex items-center justify-between mb-3.5 border-b border-serene-border/20 pb-2">
                    <span className="text-[11px] font-bold text-serene-primary tracking-wider uppercase font-sans">
                      {formatDate(entry.date)}
                    </span>
                    <span className="text-xs">🌿</span>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {entry.items
                      .filter((item) => item && item.trim() !== "")
                      .map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-serene-text text-[14px] leading-relaxed font-sans flex items-start gap-2.5"
                        >
                          <span className="text-serene-primary mt-1 text-[10px]">✦</span>
                          <span className="font-medium text-serene-text">{item}</span>
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
