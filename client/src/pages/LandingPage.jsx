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

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[580px] py-16 md:py-24 overflow-hidden flex items-center bg-serene-gradient border-b border-serene-border/20">
        {/* Soft Background botanical overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={botanicalHero}
            alt=""
            className="w-full h-full object-cover opacity-[0.06] mix-blend-multiply"
          />
        </div>
        
        {/* Whimsical celestial elements from Raft */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <span className="absolute top-[18%] left-[6%] text-xl text-serene-primary/30 animate-star-twinkle-1">✦</span>
          <span className="absolute top-[22%] right-[10%] text-3xl text-[#D6C7FF]/60 animate-star-twinkle-2">✦</span>
          <span className="absolute bottom-[20%] left-[12%] text-2xl text-[#FCDAB7]/70 animate-star-twinkle-3">✧</span>
          <span className="absolute bottom-[28%] right-[18%] text-lg text-serene-primary/20 animate-star-twinkle-1">✧</span>
        </div>

        <div className="relative max-w-6xl w-full mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Block */}
          <div className="md:col-span-7 text-left animate-page-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-serene-primarySoft text-serene-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-serene-primary/10">
              🌿 Your Mental Wellness Companion
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[54px] text-serene-text font-bold font-serif mb-6 leading-[1.1] tracking-tight">
              Your Mental <br />
              <span className="text-serene-primary">Health Matters.</span>
            </h1>
            <p className="text-base md:text-lg text-serene-muted mb-8 font-light leading-relaxed max-w-lg">
              A gentle, distraction-free space to check in daily, write private journals, track mood changes, and chat with a supportive AI companion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                className="hover:scale-102 transition-transform duration-300 shadow-sm"
                onClick={() => navigate(user ? "/home" : "/signup")}
              >
                Start a check-in
              </Button>
              {!user && (
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:scale-102 transition-transform duration-300"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>

          {/* Right Block */}
          <div className="md:col-span-5 flex justify-center items-center z-10 animate-fade-in">
            <div className="relative p-4 bg-serene-surface/60 border border-serene-border/30 rounded-[32px] shadow-sm backdrop-blur-md max-w-sm w-full transition-all duration-500 hover:scale-[1.02] hover:shadow-md">
              {/* Whimsical Sticker */}
              <div className="absolute -top-5 -right-5 bg-serene-text text-serene-surface rounded-full w-20 h-20 flex items-center justify-center text-center p-2 text-[9px] font-semibold uppercase tracking-wider select-none shadow-md rotate-12 animate-float">
                <span>We got you • check in</span>
              </div>
              <img
                src={mindfulnessIllustration}
                alt="Mindfulness Illustration"
                className="w-full h-auto object-cover rounded-[24px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SERENE SECTION ── */}
      <section className="py-24 bg-serene-surface/50 border-b border-serene-border/30 px-6 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Visual card showing Dashboard Mockup instead of duplicated illustration */}
          <div className="rounded-[32px] overflow-hidden border border-serene-border/30 shadow-sm bg-serene-surface p-4 transition-all duration-300 hover:shadow-md hover:scale-[1.01] animate-fade-in">
            <img
              src={dashboardMockup}
              alt="Serene App Interface"
              className="w-full h-auto object-cover rounded-[24px]"
            />
          </div>

          {/* Text block */}
          <div className="flex flex-col justify-center animate-page-slide-up">
            <span className="text-serene-primary text-xs uppercase font-bold tracking-wider mb-2 inline-block">
              🌿 About Serene
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-serene-text font-bold tracking-tight mb-6 leading-tight">
              A quiet sanctuary for emotional self-awareness
            </h2>
            <p className="text-serene-muted text-sm leading-relaxed mb-6 font-light">
              Serene is a self-guided digital workspace tailored to help you navigate how you feel. We believe emotional wellness shouldn't require complex dashboards or noisy feeds. By providing a clean, distraction-free environment, you can check in with yourself, record your thoughts, and notice patterns over time.
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-serene-text text-sm font-medium">
                <span className="bg-[#4D7C59]/10 text-serene-primary rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs">✓</span>
                <span>Fully private journal storage and encrypted data</span>
              </li>
              <li className="flex items-center gap-3 text-serene-text text-sm font-medium">
                <span className="bg-[#4D7C59]/10 text-serene-primary rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs">✓</span>
                <span>Gentle AI support to highlight key triggers</span>
              </li>
              <li className="flex items-center gap-3 text-serene-text text-sm font-medium">
                <span className="bg-[#4D7C59]/10 text-serene-primary rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs">✓</span>
                <span>No ads, no social metrics, and no notifications noise</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="py-24 bg-serene-primarySoft border-b border-serene-border/30 px-6 relative">
        {/* Soft decorative background leaf silhouette overlay */}
        <div className="absolute right-0 bottom-0 opacity-[0.05] pointer-events-none select-none z-0">
          <span className="text-[120px] leading-none">🌿</span>
        </div>
        <div className="absolute left-0 top-0 opacity-[0.05] pointer-events-none select-none z-0">
          <span className="text-[120px] leading-none">🍃</span>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-serene-text font-serif mb-4 tracking-tight">
              Quiet space for reflection
            </h2>
            <p className="text-serene-muted text-sm font-light">
              Simple, thoughtful elements to support your daily wellness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-serene-surface border border-serene-border/30 rounded-[24px] shadow-sm hover-lift hover-glow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-6 shadow-sm">😊</div>
                <h3 className="text-lg font-bold text-serene-text font-serif mb-3">Check in</h3>
                <p className="text-sm text-serene-muted font-light leading-relaxed">
                  Log your current emotional state daily in seconds. Notice patterns over time without judgment or pressure.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-serene-surface border border-serene-border/30 rounded-[24px] shadow-sm hover-lift hover-glow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-6 shadow-sm">✍️</div>
                <h3 className="text-lg font-bold text-serene-text font-serif mb-3">Reflect</h3>
                <p className="text-sm text-serene-muted font-light leading-relaxed">
                  Record your daily thoughts in a calm, distraction-free digital journal. Prompt questions help guide your voice.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-serene-surface border border-serene-border/30 rounded-[24px] shadow-sm hover-lift hover-glow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-6 shadow-sm">📊</div>
                <h3 className="text-lg font-bold text-serene-text font-serif mb-3">Notice patterns</h3>
                <p className="text-sm text-serene-muted font-light leading-relaxed">
                  View trends across mood metrics and journal logs. Uncover deep insights to foster mindfulness and self-compassion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section className="py-24 bg-serene-gradient border-b border-serene-border/20 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Step layout */}
          <div className="animate-page-slide-up">
            <span className="text-serene-primary text-xs uppercase font-bold tracking-wider mb-2 inline-block">
              👣 Step-by-Step
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-serene-text font-bold tracking-tight mb-8">
              A path toward emotional clarity
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <span className="text-serene-primary font-serif font-bold text-lg bg-serene-primary/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0 border border-serene-primary/20">1</span>
                <div>
                  <h3 className="font-bold text-base text-serene-text font-serif">Daily Mood Check-ins</h3>
                  <p className="text-serene-muted text-sm font-light leading-relaxed mt-1">
                    Begin each day by recording your emotional notes. Rate your energy, mood, and register your gratitude details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-serene-primary font-serif font-bold text-lg bg-serene-primary/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0 border border-serene-primary/20">2</span>
                <div>
                  <h3 className="font-bold text-base text-serene-text font-serif">Write & Reflect</h3>
                  <p className="text-serene-muted text-sm font-light leading-relaxed mt-1">
                    Use our clean digital text editor to write a journal entry. Let the companion analyze logs and organize triggers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-serene-primary font-serif font-bold text-lg bg-serene-primary/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0 border border-serene-primary/20">3</span>
                <div>
                  <h3 className="font-bold text-base text-serene-text font-serif">Acknowledge Insights</h3>
                  <p className="text-serene-muted text-sm font-light leading-relaxed mt-1">
                    Unlock long-term patterns via data-driven charts. Keep your records safe and notice what brings you joy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Breathing circle visual container instead of duplicated mockup */}
          <div className="flex justify-center items-center">
            <div className="rounded-[32px] overflow-hidden border border-serene-border/30 shadow-sm bg-serene-surface/40 p-8 text-center backdrop-blur-md max-w-sm w-full">
              <span className="text-serene-primary text-xs uppercase font-bold tracking-wider mb-4 inline-block">
                🌬️ Breath Space
              </span>
              <p className="text-serene-muted text-xs font-light mb-8">
                Take a deep breath. Sync your breathing with the expanding circle.
              </p>
              <div className="w-40 h-40 mx-auto rounded-full bg-serene-primary/10 border-2 border-serene-primary/30 flex items-center justify-center animate-breath mb-6">
                <span className="text-serene-primary font-serif font-semibold text-sm">Calm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINDFUL QUOTE ── */}
      <section className="py-24 bg-serene-primarySoft text-center border-b border-serene-border/30 px-6 relative overflow-hidden">
        {/* Soft background glow circles */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-[#D6C7FF]/15 blur-3xl rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-[#FCDAB7]/15 blur-3xl rounded-full"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xl inline-block mb-3 select-none">🍃</span>
          <blockquote className="font-serif text-2xl md:text-3xl text-serene-text italic leading-relaxed mb-6">
            "The happiness of your life depends upon the quality of your thoughts."
          </blockquote>
          <cite className="text-serene-muted text-xs uppercase font-bold tracking-wider not-italic">
            — Marcus Aurelius, Meditations
          </cite>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-24 bg-serene-gradient px-6 relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl text-serene-text font-bold text-center mb-10 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="bg-serene-surface/60 border border-serene-border/30 rounded-[24px] p-8 shadow-sm backdrop-blur-md">
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

      {/* ── FOOTER WITH BOTANICAL GRASS INTERACTION ── */}
      <footer className="bg-serene-surface/90 py-16 text-sm border-t border-serene-border/30 relative overflow-hidden">
        {/* Grass elements at the bottom footer representing Ghibli Hills */}
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

export default LandingPage;
