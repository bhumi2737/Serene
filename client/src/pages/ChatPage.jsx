import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";

// Hardcoded AI responses — rotates through these for now
// Real Claude API integration comes later in Month 2
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
    if (!text) return; // don't send empty messages

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
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FAFAF8" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: "240px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxWidth: "720px",
          padding: "0 64px",
        }}
      >

        {/* ── HEADER ── */}
        <div
          style={{
            padding: "20px 0 14px",
            borderBottom: "1px solid #E8E4DF",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#FAFAF8",
          }}
        >
          {/* AI avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              backgroundColor: "#1C1917",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* Leaf icon */}
            <svg width="18" height="18" fill="none" stroke="#E8E0D5" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.34a1 1 0 001.66 1.06C7 19 9.14 17 12 17c4 0 5-2 5-2" />
              <path d="M17 8l-5 9" />
              <path d="M17 8c0 0 3-1 3-5-4 0-5.5 2.5-5.5 2.5" />
            </svg>
          </div>

          {/* Name and status */}
          <div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#1C1917" }}>Serene</p>
            <p style={{ fontSize: "11px", color: "#B0A99F" }}>Your companion · always here</p>
          </div>
        </div>

        {/* ── MESSAGES AREA ── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                gap: "4px",
              }}
            >
              {/* Bubble */}
              <div
                style={{
                  maxWidth: "78%",
                  backgroundColor: msg.role === "user" ? "#1C1917" : "#F5F0EB",
                  color: msg.role === "user" ? "#F5F0EB" : "#1C1917",
                  borderRadius: msg.role === "user"
                    ? "16px 16px 4px 16px"   // user: sharp bottom-right
                    : "16px 16px 16px 4px",  // ai: sharp bottom-left
                  padding: "10px 14px",
                  fontSize: "13px",
                  lineHeight: "1.6",
                }}
              >
                {msg.text}
              </div>
              {/* Timestamp */}
              <span style={{ fontSize: "10px", color: "#B0A99F" }}>{msg.time}</span>
            </div>
          ))}

          {/* AI typing indicator */}
          {isTyping && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
              <div
                style={{
                  backgroundColor: "#F5F0EB",
                  borderRadius: "16px 16px 16px 4px",
                  padding: "10px 16px",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                {/* Three animated dots */}
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#B0A99F",
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Invisible div to scroll to */}
          <div ref={bottomRef} />
        </div>

        {/* ── INPUT BAR ── */}
        <div
          style={{
            marginTop: "auto",
            backgroundColor: "#FAFAF8",
            borderTop: "1px solid #E8E4DF",
            padding: "16px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
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
              backgroundColor: "#F5F0EB",
              border: "none",
              borderRadius: "10px",
              padding: "10px 12px",
              fontSize: "13px",
              color: "#1C1917",
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: "1.5",
            }}
          />
          {/* Send button */}
          <button
            onClick={handleSend}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              backgroundColor: input.trim() ? "#1C1917" : "#E8E4DF",
              border: "none",
              cursor: input.trim() ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background-color 0.15s ease",
            }}
          >
            <svg width="16" height="16" fill="none" stroke={input.trim() ? "#FAFAF8" : "#B0A99F"} strokeWidth="2" viewBox="0 0 24 24">
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
