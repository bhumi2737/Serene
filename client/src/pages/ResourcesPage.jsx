import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/Button";

const getCategoryStyles = (category) => {
  const lower = category.toLowerCase();
  if (lower.includes("anxiety")) return "bg-[#D6C7FF]/35 text-[#4C1D95]";
  if (lower.includes("sleep")) return "bg-serene-primarySoft/90 text-serene-primary";
  if (lower.includes("mindfulness")) return "bg-[#FCDAB7]/45 text-[#9A3412]";
  if (lower.includes("students")) return "bg-[#FEF08A]/60 text-[#854D0E]";
  if (lower.includes("therapy")) return "bg-serene-secondary/40 text-serene-text";
  return "bg-serene-primarySoft/60 text-serene-primary";
};

function ArticleCard({ category, title, content }) {
  const [expanded, setExpanded] = useState(false);
  const displayContent = expanded ? content : content.slice(0, 95) + "...";

  return (
    <div className="bg-serene-surface border border-serene-border/30 rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover-lift hover-glow">
      <div>
        <span className={`${getCategoryStyles(category)} font-semibold tracking-wide uppercase text-[10px] rounded-full px-3 py-1 inline-block`}>
          {category}
        </span>
        <h3 className="text-serene-text font-serif text-[18px] font-bold mt-4 tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-serene-muted text-[13px] leading-relaxed mt-3 font-light">
          {displayContent}
        </p>
      </div>
      <div>
        {expanded ? (
          <button
            onClick={() => setExpanded(false)}
            className="text-serene-primary hover:opacity-80 text-[13px] font-semibold mt-4 inline-flex items-center gap-1 transition-opacity"
          >
            Show less ↑
          </button>
        ) : (
          <button
            onClick={() => setExpanded(true)}
            className="text-serene-primary hover:opacity-80 text-[13px] font-semibold mt-4 inline-flex items-center gap-1 transition-opacity"
          >
            Read more ↓
          </button>
        )}
      </div>
    </div>
  );
}

function ResourcesPage() {
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

  const articles = [
    {
      category: "Anxiety",
      title: "Understanding Anxiety: Signs and Coping Strategies",
      content: "Anxiety is your body's natural response to stress. It becomes a concern when it interferes with daily life. Common signs include excessive worry, restlessness, difficulty concentrating, and physical symptoms like a racing heart. Effective coping strategies include deep breathing exercises, progressive muscle relaxation, limiting caffeine, maintaining a regular sleep schedule, and talking to someone you trust. Journalling your worries can help you identify patterns and feel more in control. Remember: anxiety is treatable, and you do not have to manage it alone."
    },
    {
      category: "Sleep",
      title: "How Sleep Affects Your Mental Health",
      content: "Sleep and mental health are deeply connected. Poor sleep can worsen anxiety, depression, and emotional regulation. During sleep, your brain processes emotions and consolidates memories. Adults need 7–9 hours per night. To improve sleep: set a consistent bedtime, avoid screens 1 hour before bed, keep your room cool and dark, avoid caffeine after 2pm, and try a short relaxation routine before sleeping. If you regularly struggle to sleep despite good habits, consider speaking with a healthcare provider."
    },
    {
      category: "Mindfulness",
      title: "Getting Started with Mindfulness",
      content: "Mindfulness means paying attention to the present moment without judgment. It does not require meditation cushions or hours of practice. Start with just 5 minutes a day: sit comfortably, focus on your breath, and gently return your attention when your mind wanders. You can also practice mindful eating — noticing the taste, texture, and smell of your food — or mindful walking, paying attention to each step. Regular mindfulness practice reduces stress, improves focus, and builds emotional resilience over time."
    },
    {
      category: "Students",
      title: "Managing Academic Pressure and Burnout",
      content: "Academic burnout happens when prolonged stress depletes your energy and motivation. Signs include exhaustion, cynicism about your studies, and feeling ineffective no matter how hard you try. To prevent burnout: break large tasks into smaller steps, take regular breaks (try the Pomodoro technique — 25 minutes work, 5 minutes rest), prioritise sleep over late-night studying, talk to a trusted friend or counsellor, and remember that your worth is not measured by your grades. It is okay to ask for help."
    },
    {
      category: "Therapy",
      title: "When Should You Seek Professional Help?",
      content: "Consider seeking professional support if you have felt persistently sad, anxious, or empty for more than two weeks; if your emotions are affecting your relationships, work, or daily functioning; if you are using substances to cope; or if you are having thoughts of self-harm. Therapy is not a sign of weakness — it is a sign of self-awareness and courage. A qualified mental health professional can provide tools and perspective that friends and family cannot. In India, options include iCall, YourDost, and college counselling centres."
    },
    {
      category: "Self-care",
      title: "Building a Daily Mental Wellness Routine",
      content: "Small daily habits compound into significant mental health improvements over time. A simple routine might include: 5 minutes of journalling in the morning to set your intentions, a short walk or physical movement, one mindful meal where you eat without screens, a brief check-in with your emotions (Serene's mood tracker is great for this), and 10 minutes of reading or a relaxing activity before bed. You do not need to do all of these at once. Start with one habit and build gradually. Consistency matters more than perfection."
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

      {/* ── PAGE HERO SECTION ── */}
      <section className="bg-serene-gradient pt-16 pb-10 text-center px-12 animate-fade-in relative">
        <div className="max-w-xl mx-auto relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl text-serene-text font-bold tracking-tight">
            Mental Health Resources
          </h1>
          <p className="text-serene-muted text-base md:text-lg max-w-[520px] mx-auto mt-4 leading-relaxed font-light">
            You are not alone. Here are trusted articles, self-care practices, and guidance to support your emotional wellbeing.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: UNDERSTANDING MENTAL HEALTH ── */}
      <section className="bg-serene-surface/40 py-16 px-6 md:px-12 border-t border-b border-serene-border/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          <h2 className="font-serif text-2xl text-serene-text font-bold mb-8 tracking-tight">
            Understanding Mental Health
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {articles.map((art, idx) => (
              <ArticleCard
                key={idx}
                category={art.category}
                title={art.title}
                content={art.content}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SELF-HELP TECHNIQUES ── */}
      <section className="bg-serene-gradient py-20 px-6 md:px-12 border-b border-serene-border/20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-serene-text font-bold mb-8 tracking-tight">
            Quick Self-Help Techniques
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Tech 1 */}
            <div className="bg-serene-surface border border-serene-border/30 rounded-[24px] p-6 shadow-sm hover-lift hover-glow">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-4 shadow-xs">🌬️</div>
              <h3 className="text-serene-text font-serif text-[18px] font-bold tracking-tight">
                4-7-8 Breathing
              </h3>
              <ul className="text-serene-muted text-sm leading-relaxed mt-4 space-y-3 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">1</span>
                  <span>Inhale quietly through your nose for 4 seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">2</span>
                  <span>Hold your breath for 7 seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">3</span>
                  <span>Exhale completely through your mouth for 8 seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">4</span>
                  <span>Repeat 3–4 times.</span>
                </li>
                <li className="text-xs italic text-serene-muted pl-7 mt-2 leading-snug">
                  This activates your parasympathetic nervous system and reduces acute anxiety within minutes.
                </li>
              </ul>
            </div>

            {/* Tech 2 */}
            <div className="bg-serene-surface border border-serene-border/30 rounded-[24px] p-6 shadow-sm hover-lift hover-glow">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-4 shadow-xs">🌱</div>
              <h3 className="text-serene-text font-serif text-[18px] font-bold tracking-tight">
                5-4-3-2-1 Grounding
              </h3>
              <ul className="text-serene-muted text-sm leading-relaxed mt-4 space-y-3 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">1</span>
                  <span>Name 5 things you can see around you.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">2</span>
                  <span>Name 4 things you can physically touch.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">3</span>
                  <span>Name 3 things you can hear.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">4</span>
                  <span>Name 2 things you can smell.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">5</span>
                  <span>Name 1 thing you can taste.</span>
                </li>
                <li className="text-xs italic text-serene-muted pl-7 mt-2 leading-snug">
                  This technique interrupts anxious thoughts by anchoring you in the physical present.
                </li>
              </ul>
            </div>

            {/* Tech 3 */}
            <div className="bg-serene-surface border border-serene-border/30 rounded-[24px] p-6 shadow-sm hover-lift hover-glow">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-4 shadow-xs">📓</div>
              <h3 className="text-serene-text font-serif text-[18px] font-bold tracking-tight">
                Brain Dump Journalling
              </h3>
              <ul className="text-serene-muted text-sm leading-relaxed mt-4 space-y-3 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">1</span>
                  <span>Set a timer for 5 minutes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">2</span>
                  <span>Write everything on your mind without filtering, spelling errors, or edits.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">3</span>
                  <span>Do not stop writing until the timer ends.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">4</span>
                  <span>Close the journal and take 3 deep breaths.</span>
                </li>
                <li className="text-xs italic text-serene-muted pl-7 mt-2 leading-snug">
                  Pouring chaotic thoughts onto paper helps clarify and quiet the mind.
                </li>
              </ul>
            </div>

            {/* Tech 4 */}
            <div className="bg-serene-surface border border-serene-border/30 rounded-[24px] p-6 shadow-sm hover-lift hover-glow">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-serene-border/20 flex items-center justify-center text-2xl mb-4 shadow-xs">🚶</div>
              <h3 className="text-serene-text font-serif text-[18px] font-bold tracking-tight">
                10-Minute Walk Reset
              </h3>
              <ul className="text-serene-muted text-sm leading-relaxed mt-4 space-y-3 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">1</span>
                  <span>When overwhelmed, step outside for just 10 minutes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">2</span>
                  <span>Leave your phone behind if possible to avoid distraction.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">3</span>
                  <span>Walk at a comfortable, conscious pace.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-serene-primary font-bold text-xs bg-serene-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-serene-primary/20">4</span>
                  <span>Notice your surroundings — sounds, breeze, smells, shapes.</span>
                </li>
                <li className="text-xs italic text-serene-muted pl-7 mt-2 leading-snug">
                  Physical displacement shifts visual context and resets cognitive overload.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FINDING SUPPORT ── */}
      <section className="bg-serene-primarySoft/50 py-16 px-6 md:px-12 border-b border-serene-border/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl text-serene-text font-bold mb-3 text-center tracking-tight">
            Finding Professional Support
          </h2>
          <p className="text-serene-muted text-sm mb-10 text-center font-light">
            Affordable, licensed mental health support is available in India.
          </p>

          <div className="bg-serene-surface border border-serene-border/30 rounded-[28px] p-8 max-w-[680px] mx-auto shadow-sm hover-lift">
            <p className="text-serene-text text-sm leading-relaxed font-light">
              If you feel you need professional support, here are some steps to get started: First, speak with your college counsellor — most universities in India offer free counselling services. Second, visit your nearest government hospital — psychiatric services are available free of charge. Third, search for 'mental health counsellor near me' to find local practitioners. Fourth, consider online platforms like iCall (TISS) which offer affordable sessions starting at ₹300. Remember: seeking help is a sign of strength, not weakness. You deserve support.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
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

export default ResourcesPage;
