import React, { useState, useRef, useEffect } from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Send, AlertTriangle, Trash2 } from "lucide-react";
import { sendChatMessage } from "../utils/api";

export default function ChatPage() {
  const email = localStorage.getItem("userEmail") || "default_user";
  const storageKey = `serene_chat_${email}`;

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [
        { role: "assistant", content: "Hi! I'm your Serene companion. How are you feeling today?" }
      ];
    } catch (e) {
      console.error("Failed to parse chat messages from localStorage:", e);
      return [
        { role: "assistant", content: "Hi! I'm your Serene companion. How are you feeling today?" }
      ];
    }
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear your conversation history?")) {
      const initialMessages = [
        { role: "assistant", content: "Hi! I'm your Serene companion. How are you feeling today?" }
      ];
      setMessages(initialMessages);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setError("");
    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await sendChatMessage(updatedMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }
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
        actions={
          messages.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              icon={Trash2}
              onClick={handleClearChat}
              className="text-red-700 hover:bg-red-50 hover:text-red-700 border-red-200 dark:border-red-900/30 dark:hover:bg-red-950/20"
            >
              Clear Chat
            </Button>
          )
        }
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
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={index}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${isUser
                      ? "bg-serene-primary text-white dark:bg-[#4A7C59] dark:text-white"
                      : "bg-serene-surface border border-serene-border text-serene-text font-serif"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex flex-col items-start">
              <div className="bg-serene-surface border border-serene-border rounded-lg px-4.5 py-3 flex flex-col gap-2 min-w-[125px] shadow-sm">
                <span className="text-[10px] font-bold text-serene-muted tracking-wider uppercase font-sans animate-pulse">
                  Companion is active
                </span>
                <div className="flex items-center justify-center h-4 w-24 overflow-hidden relative">
                  <svg className="w-full h-full text-serene-green dark:text-emerald-500" viewBox="0 0 100 24" fill="none">
                    <path
                      className="animate-wave-flow-1"
                      d="M0 12 C 20 6, 40 18, 60 12 C 80 6, 100 18, 120 12 L 120 24 L 0 24 Z"
                      fill="currentColor"
                      fillOpacity="0.1"
                    />
                    <path
                      className="animate-wave-flow-2"
                      d="M0 12 C 15 18, 30 6, 45 12 C 60 18, 75 6, 90 12 C 105 18, 120 6, 135 12 L 135 24 L 0 24 Z"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      className="animate-wave-flow-3"
                      d="M0 12 C 25 10, 50 14, 75 12 C 100 10, 125 14, 150 12 L 150 24 L 0 24 Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── ERROR MESSAGE BANNER ── */}
        {error && (
          <p className="text-serene-amber text-xs mb-3 font-sans font-medium">
            {error}
          </p>
        )}

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
