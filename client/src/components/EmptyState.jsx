import React from "react";
import { Inbox } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  title = "No items yet",
  description = "Get started by creating your first entry.",
  actionLabel,
  onAction,
  icon: Icon = Inbox,
  className = "",
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-serene-surface border border-dashed border-serene-border rounded-lg ${className}`}>
      <div className="w-12 h-12 rounded-full bg-serene-primarySoft flex items-center justify-center text-serene-primary mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-serene-text mb-1">{title}</h3>
      <p className="text-sm text-serene-muted mb-6 max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
