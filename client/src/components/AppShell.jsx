import React from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function AppShell({ children }) {
  return (
    <div className="flex min-h-screen bg-serene-bg text-serene-text font-sans relative overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:pl-[220px]">
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10 pb-24 md:pb-10">
          <div className="w-full max-w-6xl mx-auto animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <BottomNav />
    </div>
  );
}
