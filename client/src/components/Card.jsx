import React from "react";

export default function Card({ children, className = "", onClick, ...props }) {
  const isClickable = !!onClick;
  return (
    <div
      onClick={onClick}
      className={`bg-serene-surface dark:bg-[#25232A] border border-serene-border dark:border-[#3A3742] rounded-lg p-6 ${
        isClickable ? "cursor-pointer hover:border-serene-primary/30 transition-colors" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
