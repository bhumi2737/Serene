import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Plus, Calendar } from "lucide-react";

export default function JournalPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("serene_journals");
    if (stored) {
      const parsed = JSON.parse(stored);
      // Sort by date descending
      const sorted = parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(sorted);
    } else {
      setEntries([]);
    }
  }, []);

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

  const getBodyPreview = (body) => {
    if (!body) return "";
    if (body.length > 80) {
      return body.substring(0, 80) + "...";
    }
    return body;
  };

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Journal"
        subtitle="Write down your thoughts to discover patterns"
        actions={
          entries.length > 0 && (
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => navigate("/journal/new")}
            >
              New entry
            </Button>
          )
        }
      />

      {/* ── JOURNAL GRID AREA ── */}
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-serene-surface border border-serene-border rounded-lg max-w-xl mx-auto mt-8">
          <span className="text-4xl">📓</span>
          <h3 className="text-[18px] font-serif font-bold text-serene-primary mt-4">
            No entries yet
          </h3>
          <p className="text-[13px] text-serene-muted mt-1 max-w-xs">
            Start writing your first reflection.
          </p>
          <button
            onClick={() => navigate("/journal/new")}
            className="bg-serene-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg mt-6 hover:bg-opacity-90 transition-all font-sans"
          >
            Write your first entry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {entries.map((entry, index) => (
            <Card key={index} className="hover:border-serene-primarySoft transition-colors flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-base font-bold text-serene-primary font-serif">
                    {entry.title}
                  </h3>
                </div>
                <p className="text-sm text-serene-text leading-relaxed font-serif mb-4 whitespace-pre-line">
                  {getBodyPreview(entry.body)}
                </p>
              </div>

              {/* Date details */}
              <div className="flex items-center gap-2 pt-3 border-t border-serene-border text-xs text-serene-muted mt-auto">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(entry.date)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
