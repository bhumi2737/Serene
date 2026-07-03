import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import botanicalHero from "../assets/hero-botanical.png";
import mindfulnessIllustration from "../assets/mindfulness-illustration.png";
import dashboardMockup from "../assets/dashboard-mockup.png";
import Button from "../components/Button";

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-serene-border/40 py-4 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-serene-text font-serif font-semibold text-[15px] group-hover:text-[#4A7C59] transition-colors">
          {question}
        </span>
        <span className="text-serene-muted font-bold text-[18px] select-none pl-4">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 mt-3" : "max-h-0"
        }`}
      >
        <p className="text-serene-muted text-[13px] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  const faqs = [
    {
      question: "Is my data private and secure on Serene?",
      answer: "Yes, privacy is our foundational principle. Your journal entries and mood logs are encrypted in transit and stored securely in MongoDB Atlas. We do not sell, share, or analyze your personal logs for commercial purposes. You can export or permanently delete your data at any time from your Profile settings."
    },
    {
      question: "Is the AI companion a replacement for clinical therapy?",
      answer: "No. Serene's AI companion is designed strictly for gentle, supportive conversation and mindful guidance. It is not a licensed therapist or diagnostic medical tool. If you are experiencing distress, thoughts of self-harm, or emergency crises, always reach out to emergency clinical hotlines immediately."
    },
    {
      question: "How does mood tracking support my wellbeing?",
      answer: "Logging your emotional states builds self-awareness. By naming and scoring your feelings daily, you learn to identify triggers, notice behavioral trends over time, and build emotional resilience with gentle reflection."
    }
  ];

  return (
    <div className="h-screen overflow-y-auto flex flex-col bg-serene-bg text-serene-text font-sans scroll-smooth">
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

      {/* ── HERO SECTION ── */}
      <section className="relative w-full h-[580px] bg-[#17221F] overflow-hidden flex items-center">
        {/* Photo Background */}
        <img
          src={botanicalHero}
          alt="Chamomile and botanical leaves"
          className="absolute inset-0 w-full h-full object-cover opacity-65 animate-fade-in"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

        <div className="relative max-w-6xl w-full mx-auto px-6 z-10 text-white animate-fade-in-up">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-serene-textxl font-bold font-serif mb-4 leading-tight tracking-tight">
              Serene
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed">
              A quieter place to check in, write freely, and understand how you feel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(user ? "/home" : "/signup")}
              >
                Start a check-in
              </Button>
              {!user && (
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white hover:scale-105 transition-transform duration-300"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SERENE SECTION ── */}
      <section className="py-24 bg-serene-bg border-b border-serene-border/40 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Visual card */}
          <div className="rounded-3xl overflow-hidden border border-serene-border/45 shadow-md bg-serene-surface/50 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
            <img
              src={mindfulnessIllustration}
              alt="Mindfulness Reflection illustration"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>

          {/* Text block */}
          <div className="flex flex-col justify-center">
            <span className="text-[#4A7C59] text-[12px] uppercase font-bold tracking-wider mb-2 inline-block">
              🌿 ABOUT SERENE
            </span>
            <h2 className="font-serif text-3xl md:text-serene-textxl text-serene-text font-bold tracking-tight mb-6 leading-tight">
              A quiet sanctuary for emotional self-awareness
            </h2>
            <p className="text-serene-muted text-[14px] leading-relaxed mb-6">
              Serene is a self-guided digital workspace tailored to help you navigate how you feel. We believe emotional wellness shouldn't require complex dashboards or noisy feeds. By providing a clean, distraction-free environment, you can check in with yourself, record your thoughts, and notice patterns over time.
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-serene-text text-[13px] font-medium">
                <span className="bg-[#4A7C59]/10 text-[#4A7C59] rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Fully private journal storage and encrypted data</span>
              </li>
              <li className="flex items-center gap-3 text-serene-text text-[13px] font-medium">
                <span className="bg-[#4A7C59]/10 text-[#4A7C59] rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Gentle AI support to highlight key triggers</span>
              </li>
              <li className="flex items-center gap-3 text-serene-text text-[13px] font-medium">
                <span className="bg-[#4A7C59]/10 text-[#4A7C59] rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>No ads, no social metrics, and no notifications noise</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="py-24 bg-serene-primarySoft border-b border-serene-border/40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-serene-textxl font-bold text-serene-text font-serif mb-4 tracking-tight">
              Quiet space for reflection
            </h2>
            <p className="text-serene-muted text-sm">
              Simple, thoughtful elements to support your daily wellness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-white border border-serene-border/40 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-[#4A7C59]/40 flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-4">😊</div>
                <h3 className="text-lg font-bold text-serene-text font-serif mb-2">Check in</h3>
                <p className="text-[13px] text-serene-muted leading-relaxed">
                  Log your current emotional state daily in seconds. Notice patterns over time without judgment.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-white border border-serene-border/40 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-[#4A7C59]/40 flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-4">✍️</div>
                <h3 className="text-lg font-bold text-serene-text font-serif mb-2">Reflect</h3>
                <p className="text-[13px] text-serene-muted leading-relaxed">
                  Record your daily thoughts in a calm, distraction-free digital journal. Prompt questions guide your voice.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-white border border-serene-border/40 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-[#4A7C59]/40 flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-serene-text font-serif mb-2">Notice patterns</h3>
                <p className="text-[13px] text-serene-muted leading-relaxed">
                  View trends across mood metrics and journal logs. Uncover insights to foster mindfulness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section className="py-24 bg-serene-bg border-b border-serene-border/40 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Step layout */}
          <div>
            <span className="text-[#4A7C59] text-[12px] uppercase font-bold tracking-wider mb-2 inline-block">
              👣 STEP-BY-STEP
            </span>
            <h2 className="font-serif text-3xl md:text-serene-textxl text-serene-text font-bold tracking-tight mb-8">
              A path toward emotional clarity
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <span className="text-[#4A7C59] font-serif font-bold text-xl bg-[#4A7C59]/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0">1</span>
                <div>
                  <h3 className="font-bold text-[16px] text-serene-text font-serif">Daily Mood Check-ins</h3>
                  <p className="text-serene-muted text-[13px] leading-relaxed mt-1">
                    Begin each day by recording your emotional notes. Rate your energy, mood, and register your gratitude details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-[#4A7C59] font-serif font-bold text-xl bg-[#4A7C59]/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0">2</span>
                <div>
                  <h3 className="font-bold text-[16px] text-serene-text font-serif">Write & Reflect</h3>
                  <p className="text-serene-muted text-[13px] leading-relaxed mt-1">
                    Use our clean digital text editor to write a journal entry. Let the companion analyze logs and organize triggers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-[#4A7C59] font-serif font-bold text-xl bg-[#4A7C59]/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0">3</span>
                <div>
                  <h3 className="font-bold text-[16px] text-serene-text font-serif">Acknowledge Insights</h3>
                  <p className="text-serene-muted text-[13px] leading-relaxed mt-1">
                    Unlock long-term patterns via data-driven charts. Keep your records safe and notice what brings you joy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mockup card */}
          <div className="rounded-3xl overflow-hidden border border-serene-border/45 shadow-lg bg-white p-4 transition-all hover:scale-[1.02] duration-300">
            <img
              src={dashboardMockup}
              alt="Serene App dashboard mockup calendar"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── MINDFUL QUOTE ── */}
      <section className="py-20 bg-serene-primarySoft text-center border-b border-serene-border/40 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xl inline-block mb-3 select-none">🍃</span>
          <blockquote className="font-serif text-serene-textxl md:text-3xl text-serene-text italic leading-relaxed mb-4">
            "The happiness of your life depends upon the quality of your thoughts."
          </blockquote>
          <cite className="text-serene-muted text-[13px] uppercase font-bold tracking-wider not-italic">
            — Marcus Aurelius, Meditations
          </cite>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-20 bg-serene-bg px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-[24px] text-serene-text font-bold text-center mb-10 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="bg-serene-surface/70 border border-serene-border/40 rounded-2xl p-6 shadow-sm">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === idx}
                onToggle={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white dark:bg-[#1C1B1F]/90 py-12 text-sm border-t border-serene-border dark:border-[#3A3742] mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
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
            <a href="/privacy" onClick={(e) => { e.preventDefault(); alert("Demo Privacy Policy: Serene processes all data locally on your device."); }} className="hover:text-[#4A7C59] transition-colors">Privacy Policy</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); alert("Contact: support@serene-demo.local"); }} className="hover:text-[#4A7C59] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
