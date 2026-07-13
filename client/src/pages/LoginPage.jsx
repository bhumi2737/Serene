import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import api from "../services/api";

function FloorLamp({ isOn, onToggle }) {
  return (
    <div className="relative flex flex-col items-center h-full w-full justify-end select-none">
      {/* Top Cap */}
      <div className="w-8 h-2 bg-[#2C2416] dark:bg-[#1E1912] rounded-t-sm z-20"></div>

      {/* Lamp Shade (Trapezoid style) */}
      <div className="w-24 h-10 bg-[#3E3529] dark:bg-[#2F2921] rounded-b-md relative z-20 shadow-md"></div>

      {/* Bulb & Glow */}
      <div className="absolute top-[38px] z-10 flex flex-col items-center">
        {isOn && (
          <div className="absolute w-32 h-32 bg-yellow-300/35 rounded-full blur-2xl animate-pulse"></div>
        )}
        <div className={`w-5 h-5 rounded-full ${isOn ? "bg-yellow-100" : "bg-gray-600"}`}></div>
      </div>

      {/* Pull String Switch */}
      <div 
        onClick={onToggle}
        className="absolute top-10 left-[calc(50%+14px)] z-30 flex flex-col items-center cursor-pointer group"
      >
        {/* String */}
        <div className="w-[1px] h-20 bg-gray-400 dark:bg-gray-500 group-hover:bg-yellow-400 transition-colors"></div>
        {/* Brass pull handle */}
        <div className={`w-2.5 h-5 rounded-sm shadow-sm transition-all duration-300 active:translate-y-1.5 ${
          isOn ? "bg-[#C17F24] border border-[#a86e1e]" : "bg-gray-600 border border-gray-700"
        }`}></div>
      </div>

      {/* Lamp Pole / Stand */}
      <div className="w-[3px] h-[300px] bg-[#2C2416] dark:bg-[#A39C8F]/70 z-10"></div>

      {/* Lamp Base */}
      <div className="w-24 h-2.5 bg-[#2C2416] dark:bg-[#A39C8F]/70 rounded-full -mt-[1px] z-10 shadow-sm"></div>

      {/* Dynamic Positive Thought */}
      <div className="mt-6 text-center max-w-[200px] min-h-[36px] flex items-center justify-center z-10">
        <p className={`font-serif text-[12px] italic transition-all duration-500 leading-relaxed ${
          isOn ? "text-[#C17F24] dark:text-[#EDE8E0]" : "text-gray-500/80"
        }`}>
          {isOn 
            ? "Even the smallest light can guide you through the shadow." 
            : "In the quiet of the dark, the mind finds its rest."}
        </p>
      </div>

      {/* Light Cone Projecting Downward */}
      {isOn && (
        <div 
          className="w-[280px] h-[340px] bg-gradient-to-b from-yellow-200/25 via-yellow-200/5 to-transparent blur-xl pointer-events-none absolute top-10 z-0 animate-fade-in"
          style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)" }}
        ></div>
      )}
    </div>
  );
}

function MobileCord({ isOn, onToggle }) {
  return (
    <div className="flex flex-col items-center cursor-pointer select-none" onClick={onToggle}>
      {/* Cable string */}
      <div className="w-[1px] h-16 bg-[#8E7E6B]/60 dark:bg-[#A39C8F]/40 transition-all duration-300"></div>
      
      {/* Pull switch bulb */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="w-8 h-8 rounded-full border border-serene-border dark:border-[#3A3742] bg-[#F8F3E6] dark:bg-[#25232A] flex items-center justify-center -mt-0.5 cursor-pointer transition-all duration-300 hover:scale-105 active:translate-y-1 relative shadow-sm focus:outline-none"
        title="Toggle Lamp Light"
      >
        {isOn && (
          <span className="absolute inset-0 rounded-full bg-yellow-200/50 blur-sm animate-pulse"></span>
        )}
        <span className="text-[14px] relative z-10">{isOn ? "💡" : "🔌"}</span>
      </button>

      {/* Light cone projecting downward */}
      {isOn && (
        <div 
          className="w-[200px] h-[200px] bg-gradient-to-b from-yellow-200/20 via-yellow-200/5 to-transparent blur-xl pointer-events-none absolute top-20 z-0 animate-fade-in"
          style={{ clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)" }}
        ></div>
      )}
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [lampOn, setLampOn] = useState(true);

  // Handle Google OAuth Callback
  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      setError("");
      const res = await api.googleLogin(response.credential);
      localStorage.setItem("serene_token", res.token);
      const name = res.name || (res.user && res.user.name);
      const emailVal = res.email || (res.user && res.user.email);
      if (name) localStorage.setItem("userName", name);
      if (emailVal) localStorage.setItem("userEmail", emailVal);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /* global google */
    if (typeof google === "undefined") return;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleSuccess,
    });
    
    // Render the button only if the DOM element exists
    const btnContainer = document.getElementById("google-signin-btn");
    if (btnContainer) {
      google.accounts.id.renderButton(btnContainer, {
        theme: "outline",
        size: "large",
        shape: "pill",
        width: btnContainer.offsetWidth || 340,
      });
    }
  }, [loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setError("");

    let hasError = false;
    if (!email.trim()) {
      setEmailError("This field is required.");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("This field is required.");
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("serene_token", data.token);
        const name = data.name || (data.user && data.user.name);
        const emailVal = data.email || (data.user && data.user.email);
        if (name) localStorage.setItem("userName", name);
        if (emailVal) localStorage.setItem("userEmail", emailVal);
        navigate("/home");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 bg-serene-bg dark:bg-[#1C1B1F] text-serene-text dark:text-[#EDE8E0] font-sans relative overflow-hidden transition-all duration-700 ${
      lampOn ? "brightness-100" : "brightness-[0.65]"
    }`}>
      {/* Warm ambient background aura projecting from the lamp position */}
      {lampOn && (
        <div className="w-[600px] h-[600px] bg-yellow-100/10 rounded-full blur-3xl pointer-events-none absolute -top-20 left-[calc(50%-220px)] -translate-x-1/2 -z-10 animate-fade-in hidden md:block"></div>
      )}
      {lampOn && (
        <div className="w-[400px] h-[400px] bg-yellow-100/10 rounded-full blur-3xl pointer-events-none absolute -top-20 right-0 -z-10 animate-fade-in md:hidden"></div>
      )}

      {/* Main Side-by-Side Flex Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-4xl w-full z-10">
        {/* Floor Lamp standing on the left (Desktop) */}
        <div className="hidden md:flex flex-col items-center justify-end relative h-[450px] w-64 select-none">
          <FloorLamp isOn={lampOn} onToggle={() => setLampOn(!lampOn)} />
        </div>

        {/* Central Login Card Container */}
        <div className="max-w-md w-full bg-serene-surface dark:bg-[#25232A] border border-serene-border dark:border-[#3A3742] rounded-2xl p-8 md:p-10 shadow-sm animate-fade-in-up relative">
          
          {/* Mobile Lamp: Hanging top-right of card */}
          <div className="absolute top-0 right-6 z-20 md:hidden flex flex-col items-center select-none">
            <MobileCord isOn={lampOn} onToggle={() => setLampOn(!lampOn)} />
          </div>

          <div className="text-center mb-8">
            <span className="text-2xl cursor-pointer" onClick={() => navigate("/")}>🌿</span>
            <h2 className="text-2xl font-bold text-serene-primary dark:text-[#EDE8E0] font-serif mt-2">Welcome back</h2>
            <p className="text-xs text-serene-muted dark:text-[#A39C8F] mt-1 font-sans">A quieter place to understand how you feel</p>
          </div>

          <div className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-xs font-semibold text-serene-muted dark:text-[#A39C8F] uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.trim()) setEmailError("");
                }}
                autoComplete="username"
                className="w-full bg-serene-bg dark:bg-[#1C1B1F] border border-serene-border dark:border-[#3A3742] rounded-lg px-4 py-2.5 text-sm text-serene-text dark:text-[#EDE8E0] focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
              />
              {emailError && <p className="text-serene-amber text-xs mt-1 font-sans">{emailError}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-serene-muted dark:text-[#A39C8F] uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.trim()) setPasswordError("");
                }}
                autoComplete="current-password"
                className="w-full bg-serene-bg dark:bg-[#1C1B1F] border border-serene-border dark:border-[#3A3742] rounded-lg px-4 py-2.5 text-sm text-serene-text dark:text-[#EDE8E0] focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary"
              />
              {passwordError && <p className="text-serene-amber text-xs mt-1 font-sans">{passwordError}</p>}
            </div>

            <Button
              type="button"
              onClick={handleLogin}
              variant="primary"
              disabled={loading}
              className="w-full py-2.5"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            {/* Separator */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-serene-border dark:border-[#3A3742]"></div>
              <span className="absolute bg-serene-surface dark:bg-[#25232A] px-3 text-[11px] text-serene-muted uppercase tracking-wider">or</span>
            </div>

            {/* Google Sign In Button */}
            <div className="flex justify-center w-full min-h-[44px]">
              <div id="google-signin-btn" className="w-full flex justify-center"></div>
            </div>
          </div>

          {error && (
            <div className="bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.2)] rounded-lg p-[10px_14px] text-[#B91C1C] text-[13px] mt-4 font-sans">
              {error}
            </div>
          )}

          <p className="text-center text-xs text-serene-muted mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-serene-primary font-semibold hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
