import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/Button";

function SafetyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("serene_token");
    if (!token) return;

    api
      .getMe(token)
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("serene_token");
        setUser(null);
      });
  }, []);

  return (
    <div className="h-screen overflow-y-auto flex flex-col bg-serene-bg text-serene-text font-sans">
      {/* ── CLEAN WHITE NAVIGATION ── */}
      <header className="bg-serene-surface/80 dark:bg-[#1C1B1F]/80 backdrop-blur-md border-b border-serene-border/40 dark:border-[#3A3742] sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span onClick={() => navigate("/")} className="text-lg font-bold text-serene-primary flex items-center gap-2 cursor-pointer">
              🌿 <span className="font-serif text-serene-text dark:text-white">Serene</span>
            </span>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="/resources"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/resources");
                }}
                className="text-sm text-serene-muted hover:text-[#4A7C59] font-medium transition-colors"
              >
                Resources
              </a>
              <a
                href="/safety"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/safety");
                }}
                className="text-sm text-serene-muted hover:text-[#4A7C59] font-medium transition-colors"
              >
                Safety
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-serene-muted mr-2">Hello, {user.name}</span>
                <Button variant="outline" size="sm" onClick={() => navigate("/home")}>
                  Go to App
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  Sign in
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── PAGE HERO SECTION ── */}
      <section className="bg-serene-bg pt-[60px] pb-[40px] text-center px-12 animate-fade-in">
        <h1 className="font-serif text-[40px] text-serene-text font-bold tracking-tight">
          Safety & Clinical Notice
        </h1>
        <p className="text-serene-muted text-[16px] max-w-[520px] mx-auto mt-[12px] leading-relaxed">
          Please read this carefully before using Serene.
        </p>
      </section>

      {/* ── SECTION 1: WHAT SERENE IS AND ISN'T ── */}
      <section className="bg-serene-bg py-16 px-6 md:px-12 border-t border-serene-border">
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {/* Left Card: What Serene IS */}
            <div className="bg-[#4A7C59]/5 border border-[#4A7C59]/20 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-[#4A7C59] font-serif text-[18px] font-semibold mb-6 flex items-center gap-2">
                ✓ Serene is...
              </h2>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/15 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span>
                  <span>A private space for daily emotional reflection</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/15 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span>
                  <span>A tool for mood tracking and pattern awareness</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/15 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span>
                  <span>A journalling companion with gentle AI support</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/15 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span>
                  <span>A resource hub for mental wellness information</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/15 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span>
                  <span>A habit-building tool for emotional self-awareness</span>
                </li>
              </ul>
            </div>

            {/* Right Card: What Serene IS NOT */}
            <div className="bg-[#DC2626]/5 border border-[#DC2626]/20 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-[#DC2626] font-serif text-[18px] font-semibold mb-6 flex items-center gap-2">
                ✗ Serene is not...
              </h2>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#DC2626] font-bold text-[12px] bg-[#DC2626]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✗</span>
                  <span>A clinical therapy or counselling service</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#DC2626] font-bold text-[12px] bg-[#DC2626]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✗</span>
                  <span>A medical diagnostic or treatment tool</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#DC2626] font-bold text-[12px] bg-[#DC2626]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✗</span>
                  <span>A crisis intervention or emergency service</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#DC2626] font-bold text-[12px] bg-[#DC2626]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✗</span>
                  <span>A replacement for professional mental healthcare</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-[14px] leading-relaxed">
                  <span className="text-[#DC2626] font-bold text-[12px] bg-[#DC2626]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✗</span>
                  <span>A licensed medical or psychological service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: EMERGENCY NOTICE ── */}
      <section className="bg-serene-primarySoft py-16 px-6 text-center border-t border-b border-serene-border">
        <div className="max-w-6xl mx-auto">
          <div className="bg-serene-surface/90 backdrop-blur-md border border-[rgba(220,38,38,0.25)] border-l-[6px] border-l-[#DC2626] rounded-2xl p-8 max-w-[680px] mx-auto shadow-sm hover:shadow-md transition-all duration-300">
            <span className="text-[#DC2626] uppercase tracking-wider text-[13px] font-semibold">
              🚨 NEED IMMEDIATE HELP?
            </span>
            <h2 className="text-serene-text font-serif text-[24px] font-bold mt-[12px]">
              If you are in crisis, please reach out now.
            </h2>
            <p className="text-serene-muted text-[15px] leading-relaxed mt-[12px]">
              If you are experiencing thoughts of self-harm, suicide, or are in a mental health emergency, please do not rely on Serene. Contact emergency services or a crisis helpline immediately. Serene is not equipped to handle emergencies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-[12px] mt-[24px]">
              <a
                href="tel:112"
                className="inline-block bg-[#DC2626] text-white rounded-[8px] py-[12px] px-[24px] text-[14px] font-semibold hover:bg-[#b91c1c] transition-colors"
              >
                Call 112 (Emergency)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: ABOUT THE AI COMPANION ── */}
      <section className="bg-serene-bg py-16 px-6 border-b border-serene-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-serene-text font-serif text-[22px] font-bold mb-[16px]">
            About the AI Companion
          </h2>
          <div className="bg-serene-surface/80 backdrop-blur-md border border-serene-border/45 rounded-2xl p-8 shadow-sm">
            <p className="text-serene-text text-[14px] leading-relaxed">
              Serene's AI companion is powered by an open-source language model and is designed for gentle, supportive conversation only. It is not a licensed therapist, psychologist, or medical professional. The AI may make mistakes, misunderstand context, or provide incomplete responses. Please do not make medical or clinical decisions based on AI responses. The AI companion is a supplementary wellness tool — it works best alongside, not instead of, human connection and professional support when needed.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: DATA PRIVACY ── */}
      <section className="bg-serene-primarySoft py-16 px-6 border-b border-serene-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-serene-text font-serif text-[22px] font-bold mb-[20px]">
            Your Privacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            {/* Card 1 */}
            <div className="bg-serene-surface/85 border border-serene-border/40 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-[#4A7C59]/40 transition-all duration-300 backdrop-blur-sm">
              <span className="text-[24px]">🔒</span>
              <h3 className="text-serene-text font-serif text-[15px] font-semibold mt-[10px]">
                Your Data Stays Yours
              </h3>
              <p className="text-serene-muted text-[13px] mt-[6px] leading-relaxed">
                Your journal entries, mood logs, and gratitude notes are private to your account. We do not sell, share, or analyse your personal data for commercial purposes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-serene-surface/85 border border-serene-border/40 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-[#4A7C59]/40 transition-all duration-300 backdrop-blur-sm">
              <span className="text-[24px]">🛡️</span>
              <h3 className="text-serene-text font-serif text-[15px] font-semibold mt-[10px]">
                Secure Storage
              </h3>
              <p className="text-serene-muted text-[13px] mt-[6px] leading-relaxed">
                All data is encrypted in transit using HTTPS. Passwords are hashed using bcrypt and are never stored in plain text. Your data is stored securely in MongoDB Atlas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-serene-surface/85 border border-serene-border/40 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-[#4A7C59]/40 transition-all duration-300 backdrop-blur-sm">
              <span className="text-[24px]">🗑️</span>
              <h3 className="text-serene-text font-serif text-[15px] font-semibold mt-[10px]">
                Delete Anytime
              </h3>
              <p className="text-serene-muted text-[13px] mt-[6px] leading-relaxed">
                You can export or permanently delete all your data from the Profile settings page at any time. Deletion is immediate and irreversible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ACKNOWLEDGEMENT ── */}
      <section className="bg-serene-bg py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-serene-surface/90 border border-serene-border/45 rounded-2xl p-8 max-w-[600px] mx-auto text-center shadow-sm">
            <h2 className="font-serif text-[18px] text-serene-text font-bold mb-[16px] tracking-tight">
              By using Serene, you acknowledge:
            </h2>
            <ul className="text-serene-muted text-[14px] leading-relaxed space-y-[8px] text-left list-none pl-5 max-w-[500px] mx-auto">
              <li className="flex items-start gap-2.5">
                <span className="text-[#4A7C59] font-bold text-[14px] shrink-0">•</span>
                <span>Serene is a self-guided wellness tool, not a clinical service.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#4A7C59] font-bold text-[14px] shrink-0">•</span>
                <span>The AI companion is not a therapist or medical professional.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#4A7C59] font-bold text-[14px] shrink-0">•</span>
                <span>You will seek emergency services in a crisis, not Serene.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#4A7C59] font-bold text-[14px] shrink-0">•</span>
                <span>Your data is stored securely and privately.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#4A7C59] font-bold text-[14px] shrink-0">•</span>
                <span>You are responsible for your own mental health decisions.</span>
              </li>
            </ul>
            <p className="text-[#C17F24] text-[13px] italic mt-[24px]">
              If you have questions about safety or privacy, please contact us.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-serene-bg py-[20px] px-[48px] text-sm border-t border-serene-border mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-serene-muted text-xs">
            © 2026 Serene. All wellness features are self-check templates.
          </div>
          <div className="flex items-center gap-6 text-xs text-serene-muted">
            <a
              href="/safety"
              onClick={(e) => {
                e.preventDefault();
                navigate("/safety");
              }}
              className="hover:text-[#4A7C59] transition-colors"
            >
              Safety
            </a>
            <a
              href="/resources"
              onClick={(e) => {
                e.preventDefault();
                navigate("/resources");
              }}
              className="hover:text-[#4A7C59] transition-colors"
            >
              Resources
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SafetyPage;
