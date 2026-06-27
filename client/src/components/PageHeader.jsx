import React from "react";

export default function PageHeader({ title, subtitle, actions, className = "" }) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-serene-border mb-8 gap-4 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-serene-primary leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-serene-muted mt-1.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
