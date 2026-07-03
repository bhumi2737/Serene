import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/Button";

function ArticleCard({ category, title, content }) {
  const [expanded, setExpanded] = useState(false);
  const displayContent = expanded ? content : content.slice(0, 80) + "...";

  return (
    <div className="bg-serene-surface/75 backdrop-blur-md border border-serene-border/45 rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-[#4A7C59]/40">
      <div>
        <span className="bg-[#4A7C59]/10 text-[#4A7C59] font-medium tracking-wide uppercase text-[10px] rounded-full px-3 py-1 inline-block">
          {category}
        </span>
        <h3 className="text-serene-text font-serif text-[16px] font-semibold mt-3 tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-serene-muted text-[13px] leading-relaxed mt-2.5">
          {displayContent}
        </p>
      </div>
      <div>
        {expanded ? (
          <button
            onClick={() => setExpanded(false)}
            className="text-[#C17F24] hover:text-[#a0681c] text-[13px] font-semibold mt-4 inline-flex items-center gap-1 transition-colors hover:underline"
          >
            Show less ↑
          </button>
        ) : (
          <button
            onClick={() => setExpanded(true)}
            className="text-[#C17F24] hover:text-[#a0681c] text-[13px] font-semibold mt-4 inline-flex items-center gap-1 transition-colors hover:underline"
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
          Mental Health Resources
        </h1>
        <p className="text-serene-muted text-[16px] max-w-[520px] mx-auto mt-[12px] leading-relaxed">
          You are not alone. Here are trusted resources and guidance to support your wellbeing.
        </p>
      </section>

      {/* ── SECTION 2: UNDERSTANDING MENTAL HEALTH ── */}
      <section className="bg-serene-primarySoft py-12 px-6 md:px-12 border-t border-b border-serene-border">
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          <h2 className="font-serif text-[22px] text-serene-text font-bold mb-[20px]">
            Understanding Mental Health
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] items-start">
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
      <section className="bg-serene-bg py-16 px-6 md:px-12 border-b border-serene-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-[22px] text-serene-text font-bold mb-[24px] tracking-tight">
            Quick Self-Help Techniques
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] items-start">
            {/* Tech 1 */}
            <div className="bg-serene-surface/80 backdrop-blur-sm border border-serene-border/45 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-[28px]">🌬️</span>
              <h3 className="text-serene-text font-serif text-[16px] font-semibold mt-3 tracking-tight">
                4-7-8 Breathing
              </h3>
              <ul className="text-serene-muted text-[13px] leading-relaxed mt-4 space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">1</span>
                  <span>Inhale quietly through your nose for 4 seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">2</span>
                  <span>Hold your breath for 7 seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">3</span>
                  <span>Exhale completely through your mouth for 8 seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">4</span>
                  <span>Repeat 3–4 times.</span>
                </li>
                <li className="text-[12px] italic text-serene-muted pl-7 mt-1.5 leading-snug">
                  This activates your parasympathetic nervous system and reduces acute anxiety within minutes.
                </li>
              </ul>
            </div>

            {/* Tech 2 */}
            <div className="bg-serene-surface/80 backdrop-blur-sm border border-serene-border/45 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-[28px]">🌱</span>
              <h3 className="text-serene-text font-serif text-[16px] font-semibold mt-3 tracking-tight">
                5-4-3-2-1 Grounding
              </h3>
              <ul className="text-serene-muted text-[13px] leading-relaxed mt-4 space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">1</span>
                  <span>Name 5 things you can see.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">2</span>
                  <span>Name 4 things you can physically touch.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">3</span>
                  <span>Name 3 things you can hear.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">4</span>
                  <span>Name 2 things you can smell.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">5</span>
                  <span>Name 1 thing you can taste.</span>
                </li>
                <li className="text-[12px] italic text-serene-muted pl-7 mt-1.5 leading-snug">
                  This technique interrupts anxious thoughts by anchoring you in the present moment.
                </li>
              </ul>
            </div>

            {/* Tech 3 */}
            <div className="bg-serene-surface/80 backdrop-blur-sm border border-serene-border/45 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-[28px]">📓</span>
              <h3 className="text-serene-text font-serif text-[16px] font-semibold mt-3 tracking-tight">
                Brain Dump Journalling
              </h3>
              <ul className="text-serene-muted text-[13px] leading-relaxed mt-4 space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">1</span>
                  <span>Set a timer for 5 minutes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">2</span>
                  <span>Write everything on your mind without filtering or editing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">3</span>
                  <span>Do not stop writing until the timer ends.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">4</span>
                  <span>Close the journal and take 3 deep breaths.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">5</span>
                  <span>Notice how much lighter you feel.</span>
                </li>
              </ul>
            </div>

            {/* Tech 4 */}
            <div className="bg-serene-surface/80 backdrop-blur-sm border border-serene-border/45 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-[28px]">🚶</span>
              <h3 className="text-serene-text font-serif text-[16px] font-semibold mt-3 tracking-tight">
                10-Minute Walk Reset
              </h3>
              <ul className="text-serene-muted text-[13px] leading-relaxed mt-4 space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">1</span>
                  <span>When overwhelmed, step outside for just 10 minutes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">2</span>
                  <span>Leave your phone behind if possible.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">3</span>
                  <span>Walk at a comfortable pace.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">4</span>
                  <span>Notice your surroundings — sounds, smells, textures.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4A7C59] font-bold text-[12px] bg-[#4A7C59]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">5</span>
                  <span>Return with a clearer, calmer mind.</span>
                </li>
                <li className="text-[12px] italic text-serene-muted pl-7 mt-1.5 leading-snug">
                  Physical movement shifts your mental state.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FINDING SUPPORT ── */}
      <section className="bg-serene-primarySoft py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-[22px] text-serene-text font-bold mb-[8px] text-center tracking-tight">
            Finding Professional Support
          </h2>
          <p className="text-serene-muted text-[14px] mb-[32px] text-center">
            Affordable mental health support is available in India.
          </p>

          <div className="bg-serene-surface/85 backdrop-blur-md border border-serene-border/45 rounded-2xl p-8 max-w-[640px] mx-auto shadow-sm transition-all duration-300 hover:shadow-md">
            <p className="text-serene-text text-[14px] leading-relaxed">
              If you feel you need professional support, here are some steps to get started: First, speak with your college counsellor — most universities in India offer free counselling services. Second, visit your nearest government hospital — psychiatric services are available free of charge. Third, search for 'mental health counsellor near me' to find local practitioners. Fourth, consider online platforms like iCall (TISS) which offer affordable sessions starting at ₹300. Remember: seeking help is a sign of strength, not weakness. You deserve support.
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

export default ResourcesPage;
