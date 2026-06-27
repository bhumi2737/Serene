import React from "react";

export default function StatItem({ value, label, subtext, className = "" }) {
  return (
    <div className={`flex flex-col p-4 bg-serene-bg rounded-lg border border-serene-border ${className}`}>
      <span className="text-2xl font-bold text-serene-primary">{value}</span>
      <span className="text-xs font-semibold text-serene-text mt-1">{label}</span>
      {subtext && <span className="text-xs text-serene-muted mt-0.5">{subtext}</span>}
    </div>
  );
}
