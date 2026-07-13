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
    <div className="h-screen overflow-y-auto flex flex-col bg-serene-gradient text-serene-text font-sans scroll-smooth">
      {/* ── CLEAN NAVIGATION WITH BLUR ── */}
      <header className="bg-[#FAF9F6]/85 backdrop-blur-md border-b border-serene-border/40 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span onClick={() => navigate("/")} className="text-lg font-bold text-serene-primary flex items-center gap-2 cursor-pointer transition-transform hover:scale-102">
              🌿 <span className="font-serif text-serene-text">Serene</span>
            </span>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="/resources"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/resources");
                }}
                className="text-sm text-serene-muted hover:text-serene-primary font-semibold transition-colors"
              >
                Resources
              </a>
              <a
                href="/safety"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/safety");
                }}
                className="text-sm text-serene-muted hover:text-serene-primary font-semibold transition-colors"
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
      <section className="bg-serene-gradient pt-16 pb-10 text-center px-12 animate-fade-in">
        <div className="max-w-xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-serene-text font-bold tracking-tight">
            Safety & Clinical Notice
          </h1>
          <p className="text-serene-muted text-base md:text-lg max-w-[520px] mx-auto mt-4 leading-relaxed font-light">
            Please read this carefully before using Serene.
          </p>
        </div>
      </section>

      {/* ── SECTION 1: WHAT SERENE IS AND ISN'T ── */}
      <section className="bg-serene-surface/40 py-16 px-6 md:px-12 border-t border-serene-border/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Card: What Serene IS */}
            <div className="bg-serene-primarySoft/40 border border-serene-primary/20 rounded-[28px] p-8 shadow-sm hover-lift">
              <h2 className="text-serene-primary font-serif text-[20px] font-bold mb-6 flex items-center gap-2">
                ✓ Serene is...
              </h2>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">✓</span>
                  <span>A private space for daily emotional reflection</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">✓</span>
                  <span>A tool for mood tracking and pattern awareness</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">✓</span>
                  <span>A journalling companion with gentle AI support</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">✓</span>
                  <span>A resource hub for mental wellness information</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">✓</span>
                  <span>A habit-building tool for emotional self-awareness</span>
                </li>
              </ul>
            </div>

            {/* Right Card: What Serene IS NOT - Using soft peach/coral colors */}
            <div className="bg-[#FCDAB7]/10 border border-[#FCDAB7]/40 rounded-[28px] p-8 shadow-sm hover-lift">
              <h2 className="text-[#C2410C] font-serif text-[20px] font-bold mb-6 flex items-center gap-2">
                ✗ Serene is not...
              </h2>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-[#C2410C] font-bold text-xs bg-[#FCDAB7]/25 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-[#FCDAB7]/40">✗</span>
                  <span>A clinical therapy or counselling service</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-[#C2410C] font-bold text-xs bg-[#FCDAB7]/25 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-[#FCDAB7]/40">✗</span>
                  <span>A medical diagnostic or treatment tool</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-[#C2410C] font-bold text-xs bg-[#FCDAB7]/25 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-[#FCDAB7]/40">✗</span>
                  <span>A crisis intervention or emergency service</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-[#C2410C] font-bold text-xs bg-[#FCDAB7]/25 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-[#FCDAB7]/40">✗</span>
                  <span>A replacement for professional mental healthcare</span>
                </li>
                <li className="flex items-start gap-3 text-serene-text text-sm leading-relaxed font-light">
                  <span className="text-[#C2410C] font-bold text-xs bg-[#FCDAB7]/25 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-[#FCDAB7]/40">✗</span>
                  <span>A licensed medical or psychological service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: EMERGENCY NOTICE ── */}
      <section className="bg-serene-gradient py-16 px-6 text-center border-b border-serene-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-serene-surface border border-[#FCDAB7]/45 border-l-[6px] border-l-[#C2410C] rounded-[24px] p-8 max-w-[680px] mx-auto shadow-sm hover-lift">
            <span className="text-[#C2410C] uppercase tracking-wider text-xs font-bold">
              🚨 Need Immediate Help?
            </span>
            <h2 className="text-serene-text font-serif text-2xl font-bold mt-3">
              If you are in crisis, please reach out now.
            </h2>
            <p className="text-serene-muted text-sm leading-relaxed mt-4 font-light">
              If you are experiencing thoughts of self-harm, suicide, or are in a mental health emergency, please do not rely on Serene. Contact emergency services or a crisis helpline immediately. Serene is not equipped to handle emergencies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <a
                href="tel:112"
                className="inline-block bg-[#C2410C] text-white rounded-lg py-2.5 px-6 text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
              >
                Call 112 (Emergency)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: ABOUT THE AI COMPANION ── */}
      <section className="bg-serene-surface/40 py-16 px-6 border-b border-serene-border/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-serene-text font-serif text-2xl font-bold mb-6 tracking-tight">
            About the AI Companion
          </h2>
          <div className="bg-serene-surface border border-serene-border/30 rounded-[24px] p-8 shadow-sm">
            <p className="text-serene-text text-sm leading-relaxed font-light">
              Serene's AI companion is powered by a language model and is designed for gentle, supportive conversation only. It is not a licensed therapist, psychologist, or medical professional. The AI may make mistakes, misunderstand context, or provide incomplete responses. Please do not make medical or clinical decisions based on AI responses. The AI companion is a supplementary wellness tool — it works best alongside, not instead of, human connection and professional support when needed.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: DATA PRIVACY ── */}
      <section className="bg-serene-gradient py-16 px-6 border-b border-serene-border/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-serene-text font-serif text-2xl font-bold mb-8 tracking-tight">
            Your Privacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-serene-surface border border-serene-border/30 rounded-[24px] p-6 shadow-sm hover-lift hover-glow">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-4 shadow-xs">🔒</div>
              <h3 className="text-serene-text font-serif text-base font-bold">
                Your Data Stays Yours
              </h3>
              <p className="text-serene-muted text-xs mt-3 leading-relaxed font-light">
                Your journal entries, mood logs, and gratitude notes are private to your account. We do not sell, share, or analyse your personal data for commercial purposes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-serene-surface border border-serene-border/30 rounded-[24px] p-6 shadow-sm hover-lift hover-glow">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-4 shadow-xs">🛡️</div>
              <h3 className="text-serene-text font-serif text-base font-bold">
                Secure Storage
              </h3>
              <p className="text-serene-muted text-xs mt-3 leading-relaxed font-light">
                All data is encrypted in transit using HTTPS. Passwords are hashed using bcrypt and are never stored in plain text. Your data is stored securely in MongoDB Atlas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-serene-surface border border-serene-border/30 rounded-[24px] p-6 shadow-sm hover-lift hover-glow">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-4 shadow-xs">🗑️</div>
              <h3 className="text-serene-text font-serif text-base font-bold">
                Delete Anytime
              </h3>
              <p className="text-serene-muted text-xs mt-3 leading-relaxed font-light">
                You can export or permanently delete all your data from the Profile settings page at any time. Deletion is immediate and irreversible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ACKNOWLEDGEMENT ── */}
      <section className="bg-serene-surface/40 py-16 px-6 backdrop-blur-sm border-b border-serene-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="bg-serene-surface border border-serene-border/30 rounded-[28px] p-8 max-w-[620px] mx-auto text-center shadow-sm">
            <h2 className="font-serif text-lg text-serene-text font-bold mb-6 tracking-tight">
              By using Serene, you acknowledge:
            </h2>
            <ul className="text-serene-muted text-sm leading-relaxed space-y-3.5 text-left list-none max-w-[500px] mx-auto font-light">
              <li className="flex items-start gap-2.5">
                <span className="text-serene-primary font-bold text-[14px] shrink-0">•</span>
                <span>Serene is a self-guided wellness tool, not a clinical service.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-serene-primary font-bold text-[14px] shrink-0">•</span>
                <span>The AI companion is not a therapist or medical professional.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-serene-primary font-bold text-[14px] shrink-0">•</span>
                <span>You will seek emergency services in a crisis, not Serene.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-serene-primary font-bold text-[14px] shrink-0">•</span>
                <span>Your data is stored securely and privately.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-serene-primary font-bold text-[14px] shrink-0">•</span>
                <span>You are responsible for your own mental health decisions.</span>
              </li>
            </ul>
            <p className="text-[#C2410C] text-xs italic mt-6">
              If you have questions about safety or privacy, please contact us.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER WITH BOTANICAL GRASS INTERACTION ── */}
      <footer className="bg-serene-surface/90 py-16 text-sm border-t border-serene-border/30 mt-auto relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-serene-primary/10 to-transparent pointer-events-none opacity-40"></div>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="text-serene-muted text-xs">
            © {new Date().getFullYear()} Serene. All wellness features are self-check templates.
          </div>
          <div className="flex items-center gap-6 text-xs text-serene-muted">
            <a
              href="/safety"
              onClick={(e) => {
                e.preventDefault();
                navigate("/safety");
              }}
              className="hover:text-serene-primary font-medium transition-colors"
            >
              Safety
            </a>
            <a
              href="/resources"
              onClick={(e) => {
                e.preventDefault();
                navigate("/resources");
              }}
              className="hover:text-serene-primary font-medium transition-colors"
            >
              Resources
            </a>
            <a href="/privacy" onClick={(e) => { e.preventDefault(); alert("Demo Privacy Policy: Serene processes all data locally on your device."); }} className="hover:text-serene-primary font-medium transition-colors">Privacy Policy</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); alert("Contact: support@serene-demo.local"); }} className="hover:text-serene-primary font-medium transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SafetyPage;
