import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";

// Hardcoded AI responses — rotates through these for now
const aiReplies = [
  "I hear you. That sounds really difficult. Would you like to talk more about it?",
  "It's okay to feel that way. You're doing better than you think.",
  "Take a deep breath. I'm here with you.",
  "What do you think is making you feel this way?",
  "That's completely understandable. You don't have to have it all figured out right now.",
  "You're not alone in this. A lot of people feel the same way.",
];

// Initial messages when page loads
const initialMessages = [
  {
    id: 1,
    role: "ai",
    text: "Hello! I'm Serene, your personal companion. I'm here to listen — how are you feeling today?",
    time: "9:00 AM",
  },
];

// Helper to get current time as "h:mm AM/PM"
function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      text,
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI typing delay (1.2 seconds)
    setIsTyping(true);
    setTimeout(() => {
      const randomReply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: randomReply,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  // Send on Enter key (but not Shift+Enter)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "#0F0E17", position: "relative" }}>
      {/* Ambient Pulsing Glows */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "30%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.07) 0%, rgba(0,0,0,0) 70%)",
        pointerEvents: "none",
        zIndex: 0,
        animation: "pulseGlow 12s ease-in-out infinite",
      }} />

      <Sidebar />
      <div
        style={{
          marginLeft: "240px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
          padding: "0 60px",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            padding: "20px 0 14px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#0F0E17",
            width: "100%",
            animation: "fadeInUp 0.5s ease forwards",
          }}
        >
          {/* AI avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              backgroundColor: "#E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* Leaf icon */}
            <svg width="18" height="18" fill="none" stroke="#16213E" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.34a1 1 0 001.66 1.06C7 19 9.14 17 12 17c4 0 5-2 5-2" />
              <path d="M17 8l-5 9" />
              <path d="M17 8c0 0 3-1 3-5-4 0-5.5 2.5-5.5 2.5" />
            </svg>
          </div>

          {/* Name and status */}
          <div>
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#E2E8F0" }}>Serene</p>
            <p style={{ fontSize: "11px", color: "#94A3B8", fontWeight: "500" }}>Your companion · always here</p>
          </div>
        </div>

        {/* ── MESSAGES AREA (scrolls independently, stretched full width) ── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 0",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                gap: "4px",
                animation: `fadeInUp 0.5s ease ${index * 0.05}s forwards`,
                opacity: 0,
              }}
            >
              {/* Bubble */}
              <div
                style={{
                  maxWidth: "70%",
                  backgroundColor: msg.role === "user" ? "#E2E8F0" : "rgba(26, 26, 46, 0.6)",
                  color: msg.role === "user" ? "#1A1A2E" : "#E2E8F0",
                  borderRadius: msg.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                  padding: "12px 16px",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: "10px", color: "#94A3B8", fontWeight: "500", marginRight: msg.role === "user" ? "4px" : 0, marginLeft: msg.role !== "user" ? "4px" : 0 }}>{msg.time}</span>
            </div>
          ))}

          {/* AI typing indicator */}
          {isTyping && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
              <div
                style={{
                  backgroundColor: "rgba(26, 26, 46, 0.6)",
                  borderRadius: "16px 16px 16px 4px",
                  padding: "12px 18px",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#94A3B8",
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── INPUT BAR (sticky at bottom) ── */}
        <div
          style={{
            marginTop: "auto",
            backgroundColor: "#0F0E17",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "16px 0",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write something..."
            rows={1}
            style={{
              flex: 1,
              backgroundColor: "rgba(26, 26, 46, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "13px",
              color: "#E2E8F0",
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: "1.5",
              backdropFilter: "blur(12px)",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: input.trim() ? "#E2E8F0" : "#2A2A4A",
              border: "none",
              cursor: input.trim() ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background-color 0.15s ease",
            }}
          >
            <svg width="18" height="18" fill="none" stroke={input.trim() ? "#0F0E17" : "#94A3B8"} strokeWidth="2" viewBox="0 0 24 24">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChatPage;
