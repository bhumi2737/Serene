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
          <Card className="border-serene-border p-7 bg-white dark:bg-[#25232A]">
            <h2 className="font-serif text-[18px] text-serene-text font-semibold mb-4.5">
              Today's highlights
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={item1}
                onChange={(e) => {
                  setItem1(e.target.value);
                  setError("");
                }}
                placeholder="1. I'm grateful for..."
                className="w-full bg-serene-bg border border-serene-border rounded-[10px] p-[12px_16px] text-[16px] text-serene-text placeholder-serene-muted focus:outline-none focus:border-serene-green"
              />
              <input
                type="text"
                value={item2}
                onChange={(e) => {
                  setItem2(e.target.value);
                  setError("");
                }}
                placeholder="2. I'm grateful for..."
                className="w-full bg-serene-bg border border-serene-border rounded-[10px] p-[12px_16px] text-[16px] text-serene-text placeholder-serene-muted focus:outline-none focus:border-serene-green"
              />
              <input
                type="text"
                value={item3}
                onChange={(e) => {
                  setItem3(e.target.value);
                  setError("");
                }}
                placeholder="3. I'm grateful for..."
                className="w-full bg-serene-bg border border-serene-border rounded-[10px] p-[12px_16px] text-[16px] text-serene-text placeholder-serene-muted focus:outline-none focus:border-serene-green"
              />
            </div>

            {error && (
              <p className="text-serene-amber text-sm mt-3 font-sans font-medium">
                {error}
              </p>
            )}

            {success && (
              <p className="text-[#4A7C59] text-sm mt-3 font-sans font-medium">
                Saved! 🌿
              </p>
            )}

            <button
              onClick={handleSave}
              className="bg-serene-green text-white text-[16px] font-medium py-2.5 px-6 rounded-lg border-0 hover:bg-[#3d664a] transition-colors mt-5 cursor-pointer"
            >
              Save today's gratitude
            </button>
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
                <Card key={idx} className="border-serene-border p-5">
                  <span className="block text-[12px] font-bold text-serene-muted tracking-wider uppercase font-sans mb-3">
                    {formatDate(entry.date)}
                  </span>

                  <ul className="flex flex-col gap-2">
                    {entry.items
                      .filter((item) => item && item.trim() !== "")
                      .map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-serene-text text-[15px] leading-relaxed font-sans flex items-start gap-2"
                        >
                          <span className="text-serene-amber">•</span>
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
