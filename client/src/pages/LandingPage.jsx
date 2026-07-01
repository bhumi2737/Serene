import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import botanicalHero from "../assets/hero-botanical.png";
import Button from "../components/Button";

function LandingPage() {
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
      <header className="bg-white dark:bg-[#1C1B1F] border-b border-serene-border dark:border-[#3A3742] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span onClick={() => navigate("/")} className="text-lg font-bold text-serene-primary flex items-center gap-2 cursor-pointer">
              🌿 <span className="font-serif">Serene</span>
            </span>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-serene-muted hover:text-serene-primary font-medium transition-colors">Features</a>
              <a href="#resources" className="text-sm text-serene-muted hover:text-serene-primary font-medium transition-colors">Resources</a>
              <a href="#safety" className="text-sm text-serene-muted hover:text-serene-primary font-medium transition-colors">Safety</a>
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
      <section className="relative w-full h-[520px] bg-[#17221F] overflow-hidden flex items-center">
        {/* Photo Background */}
        <img
          src={botanicalHero}
          alt="Chamomile and botanical leaves"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative max-w-6xl w-full mx-auto px-6 z-10 text-white">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4 leading-tight">
              Serene
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed">
              A quieter place to understand how you feel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate(user ? "/home" : "/signup")}
              >
                Start a check-in
              </Button>
              {!user && (
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="py-20 bg-white dark:bg-[#1C1B1F] border-b border-serene-border dark:border-[#3A3742]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-serene-primary font-serif mb-4">Quiet space for reflection</h2>
            <p className="text-serene-muted">Simple, thoughtful elements to support your daily wellness journey.</p>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <div className="p-6 bg-serene-bg rounded-lg border border-serene-border text-center md:text-left">
              <div className="text-2xl mb-4 text-serene-primary">😊</div>
              <h3 className="text-lg font-bold text-serene-primary mb-2">Check in</h3>
              <p className="text-sm text-serene-muted leading-relaxed">
                Log your current emotional state daily in seconds. Notice patterns over time without judgment.
              </p>
            </div>

            <div className="p-6 bg-serene-bg rounded-lg border border-serene-border text-center md:text-left">
              <div className="text-2xl mb-4 text-serene-primary">✍️</div>
              <h3 className="text-lg font-bold text-serene-primary mb-2">Reflect</h3>
              <p className="text-sm text-serene-muted leading-relaxed">
                Record your daily thoughts in a calm, distraction-free digital journal. Prompt questions guide your voice.
              </p>
            </div>

            <div className="p-6 bg-serene-bg rounded-lg border border-serene-border text-center md:text-left">
              <div className="text-2xl mb-4 text-serene-primary">📊</div>
              <h3 className="text-lg font-bold text-serene-primary mb-2">Notice patterns</h3>
              <p className="text-sm text-serene-muted leading-relaxed">
                View trends across mood metrics and journal logs. Uncover insights to foster mindfulness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESOURCES & SAFETY SECTION ── */}
      <section id="safety" className="py-16 bg-serene-bg border-b border-serene-border">
        <div className="max-w-4xl mx-auto px-6 text-center" id="resources">
          <h2 className="text-2xl font-bold font-serif text-serene-primary mb-4">
            Safety & Clinical Notice
          </h2>
          <p className="text-serene-text text-sm leading-relaxed mb-6">
            Serene is a self-guided mental wellness tool designed to support reflection, journaling, and mindful awareness.
            <strong> It is not a clinical therapy service, medical diagnostic tool, or emergency intervention service.</strong>
          </p>
          <div className="p-6 bg-white dark:bg-[#25232A] border border-serene-border dark:border-[#3A3742] rounded-lg text-left max-w-2xl mx-auto">
            <h4 className="text-xs uppercase font-bold text-serene-accent tracking-wider mb-2">Need immediate support?</h4>
            <p className="text-xs text-serene-muted leading-relaxed">
              If you are experiencing a mental health emergency, crisis, or thoughts of self-harm, please reach out to professional emergency services or standard hotlines immediately (such as calling 988 in the US/Canada or contacting standard local emergency services).
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white dark:bg-[#1C1B1F] py-12 text-sm border-t border-serene-border dark:border-[#3A3742] mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-serene-muted text-xs">
            © {new Date().getFullYear()} Serene. All wellness features are self-check templates.
          </div>
          <div className="flex items-center gap-6 text-xs text-serene-muted">
            <a href="#safety" className="hover:text-serene-primary transition-colors">Safety</a>
            <a href="#resources" className="hover:text-serene-primary transition-colors">Resources</a>
            <a href="/privacy" onClick={(e) => { e.preventDefault(); alert("Demo Privacy Policy: Serene processes all data locally on your device."); }} className="hover:text-serene-primary transition-colors">Privacy Policy</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); alert("Contact: support@serene-demo.local"); }} className="hover:text-serene-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
