import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Plus, Calendar } from "lucide-react";
import { getJournals, deleteJournal } from "../utils/api";

export default function JournalPage() {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setError("");
        const data = await getJournals();
        // Sort by date descending
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setJournals(sorted);
      } catch (err) {
        setError(err.message || "Failed to load journals.");
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this journal entry?")) return;
    try {
      setError("");
      await deleteJournal(id);
      setJournals((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete entry.");
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

  const getBodyPreview = (body) => {
    if (!body) return "";
    if (body.length > 80) {
      return body.substring(0, 80) + "...";
    }
    return body;
  };

  if (loading) {
    return (
      <AppShell>
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
        <div className="p-6 text-sm text-serene-muted">Loading journal entries...</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Journal"
        subtitle="Write down your thoughts to discover patterns"
        actions={
          journals.length > 0 && (
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

      {error && (
        <p className="text-serene-amber text-xs mt-4 font-sans font-medium">
          {error}
        </p>
      )}

      {/* ── JOURNAL GRID AREA ── */}
      {journals.length === 0 ? (
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
            className="bg-serene-primary dark:bg-[#4A7C59] text-white text-xs font-semibold px-5 py-2.5 rounded-lg mt-6 hover:bg-opacity-90 transition-all font-sans"
          >
            Write your first entry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {journals.map((entry) => (
            <Card key={entry._id} className="hover:border-serene-primarySoft transition-colors flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-base font-bold text-serene-primary font-serif">
                    {entry.title}
                  </h3>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="text-serene-amber hover:text-opacity-80 text-xs font-semibold cursor-pointer"
                  >
                    Delete
                  </button>
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
