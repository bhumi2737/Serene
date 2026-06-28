import React from "react";
import Sidebar from "./Sidebar";

export default function AppShell({ children, noPadding = false }) {
  return (
    <div className="min-h-screen bg-serene-bg text-serene-text font-sans relative">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-[170px] flex flex-col">
        <main className={`w-full h-screen overflow-y-auto bg-serene-bg ${noPadding ? "" : "p-[40px_48px_40px_48px]"}`}>
          <div className={`${noPadding ? "h-full" : "w-full max-w-6xl mx-auto animate-fade-in"}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
