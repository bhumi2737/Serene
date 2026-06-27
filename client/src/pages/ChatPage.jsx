import React, { useState, useRef, useEffect } from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Send, AlertTriangle, Sparkles } from "lucide-react";

const aiReplies = [
  "I hear you. That sounds really difficult. Would you like to talk more about it?",
  "It's okay to feel that way. You're doing better than you think.",
  "Take a deep breath. I'm here with you.",
  "What do you think is making you feel this way?",
  "That's completely understandable. You don't have to have it all figured out right now.",
  "You're not alone in this. A lot of people feel the same way.",
];

const initialMessages = [
  {
    id: 1,
    role: "ai",
    text: "Hello! I'm Serene's demo companion. I can help with simple conversation prompts. How are you feeling today?",
    time: "9:00 AM",
  },
];

function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text,
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AppShell>
      {/* ── PAGE HEADER ── */}
      <PageHeader
        title="Companion"
        subtitle="Chat with our wellness companion for gentle check-in guidance"
      />

      <div className="flex flex-col h-[calc(100vh-210px)] max-w-4xl mx-auto">
        
        {/* ── CRISIS / SAFETY WARNING ── */}
        <div className="flex items-start gap-2.5 p-3 bg-serene-primarySoft/35 border border-serene-border rounded-lg text-xs text-serene-text mb-4">
          <AlertTriangle className="w-4 h-4 text-serene-accent flex-shrink-0 mt-0.5" />
          <div>
            <strong>Safety Notice:</strong> Serene Companion is a self-guided check-in demo. It is not real-time AI and is <strong>not a therapist, clinical tool, or crisis service</strong>. If you are in distress or need professional care, please seek immediate crisis resources.
          </div>
        </div>

        {/* ── CHAT THREAD VIEWPORTS ── */}
        <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                    isUser
                      ? "bg-serene-primary text-white"
                      : "bg-serene-surface border border-serene-border text-serene-text font-serif"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-serene-muted mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex flex-col items-start">
              <div className="bg-serene-surface border border-serene-border rounded-lg px-4 py-2.5 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-serene-muted animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-serene-muted animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-serene-muted animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── FOOTER INPUT FORM ── */}
        <div className="flex items-center gap-2 pt-3 border-t border-serene-border">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Talk about how you feel..."
            rows={1}
            className="flex-1 bg-serene-surface border border-serene-border rounded-lg px-4 py-3 text-sm text-serene-text placeholder-serene-muted focus:outline-none focus:ring-1 focus:ring-serene-primary focus:border-serene-primary resize-none"
          />
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={!input.trim()}
            icon={Send}
            className="h-11 w-11 !p-0 justify-center rounded-lg flex-shrink-0"
          />
        </div>

      </div>
    </AppShell>
  );
}
