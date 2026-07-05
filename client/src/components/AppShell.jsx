import React from "react";
import Sidebar from "./Sidebar";

// Curated organic leaf drawing
const LeafSvg = ({ className, size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`absolute pointer-events-none text-[#4A7C59]/[0.08] dark:text-[#EDE8E0]/[0.03] z-0 ${className}`}
  >
    <path
      d="M2 22C2 22 3.5 15 9 10C14 5.5 19.5 3.5 22 2C20.5 4.5 18.5 10 14 15C9 20.5 2 22 2 22Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M13 11L7 17M17 7L11 13"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export default function AppShell({ children, noPadding = false }) {
  return (
    <div className="min-h-screen bg-serene-bg text-serene-text font-sans relative overflow-hidden">
      {/* 🍃 Ambient drifting leaves container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <LeafSvg className="left-[4%] top-0 animate-leaf-1" size={44} />
        <LeafSvg className="right-[6%] top-0 animate-leaf-2" size={60} />
        <LeafSvg className="left-[12%] top-0 animate-leaf-3" size={38} />
        <LeafSvg className="right-[15%] top-0 animate-leaf-4" size={52} />
        <LeafSvg className="left-[8%] top-0 animate-leaf-5" size={48} />
      </div>

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-[170px] flex flex-col relative z-10">
        <main className={`w-full h-screen overflow-y-auto bg-serene-bg ${noPadding ? "" : "p-[40px_48px_40px_48px]"}`}>
          <div className={`${noPadding ? "h-full" : "w-full max-w-6xl mx-auto animate-page-slide-up"}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
