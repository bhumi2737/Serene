import React, { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Heart } from "lucide-react";

export default function GratitudePage() {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [pastEntries, setPastEntries] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("serene_gratitude");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Sort by date descending
      const sorted = parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPastEntries(sorted);
    } else {
      setPastEntries([]);
    }
  }, []);

  const handleChange = (index, value) => {
    const nextInputs = [...inputs];
    nextInputs[index] = value;
    setInputs(nextInputs);
    setErrorMsg("");
  };

  const handleSave = () => {
    setErrorMsg("");
    setSuccess(false);

    const item1 = inputs[0] || "";
    const item2 = inputs[1] || "";
    const item3 = inputs[2] || "";

    if (!item1.trim() && !item2.trim() && !item3.trim()) {
      setErrorMsg("Please add at least one item.");
      return;
    }

    const stored = localStorage.getItem("serene_gratitude");
    let currentEntries = stored ? JSON.parse(stored) : [];

    const todayString = new Date().toISOString().split("T")[0];
    const newEntry = {
      date: todayString,
      items: [item1.trim(), item2.trim(), item3.trim()],
    };

    const existingIndex = currentEntries.findIndex((e) => e.date === todayString);
    if (existingIndex > -1) {
      currentEntries[existingIndex] = newEntry;
    } else {
      currentEntries.push(newEntry);
    }

    localStorage.setItem("serene_gratitude", JSON.stringify(currentEntries));

    // Sort and update past entries list
    const sorted = [...currentEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    setPastEntries(sorted);

    // Clear inputs & show success
    setInputs(["", "", ""]);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);
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
            <h2 className="font-serif text-[16px] text-serene-text font-semibold mb-4.5">
              Today's highlights
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={inputs[0]}
                onChange={(e) => handleChange(0, e.target.value)}
                placeholder="1. I'm grateful for..."
                className="w-full bg-serene-bg border border-serene-border rounded-[10px] p-[12px_16px] text-[14px] text-serene-text placeholder-serene-muted focus:outline-none focus:border-serene-green"
              />
              <input
                type="text"
                value={inputs[1]}
                onChange={(e) => handleChange(1, e.target.value)}
                placeholder="2. I'm grateful for..."
                className="w-full bg-serene-bg border border-serene-border rounded-[10px] p-[12px_16px] text-[14px] text-serene-text placeholder-serene-muted focus:outline-none focus:border-serene-green"
              />
              <input
                type="text"
                value={inputs[2]}
                onChange={(e) => handleChange(2, e.target.value)}
                placeholder="3. I'm grateful for..."
                className="w-full bg-serene-bg border border-serene-border rounded-[10px] p-[12px_16px] text-[14px] text-serene-text placeholder-serene-muted focus:outline-none focus:border-serene-green"
              />
            </div>

            {errorMsg && (
              <p className="text-serene-amber text-xs mt-3 font-sans font-medium">
                {errorMsg}
              </p>
            )}

            {success && (
              <p className="text-[#4A7C59] text-xs mt-3 font-sans font-medium">
                Saved! 🌿
              </p>
            )}

            <button
              onClick={handleSave}
              className="bg-serene-green text-white text-[14px] font-medium py-2.5 px-6 rounded-lg border-0 hover:bg-[#3d664a] transition-colors mt-5 cursor-pointer"
            >
              Save today's gratitude
            </button>
          </Card>
        </div>

        {/* Column 2: Past entries list */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          <h3 className="font-serif text-[16px] text-serene-text font-semibold">
            Previous entries
          </h3>

          {pastEntries.length === 0 ? (
            <p className="text-serene-muted text-sm italic">
              No previous entries yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {pastEntries.map((entry, idx) => (
                <Card key={idx} className="border-serene-border p-5">
                  <span className="block text-[11px] font-bold text-serene-muted tracking-wider uppercase font-sans mb-3">
                    {formatDate(entry.date)}
                  </span>

                  <ul className="flex flex-col gap-2">
                    {entry.items
                      .filter((item) => item && item.trim() !== "")
                      .map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-serene-text text-[13px] leading-relaxed font-sans flex items-start gap-2"
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
