import React, { useState, useRef, useEffect } from "react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import { Send, AlertTriangle } from "lucide-react";
import { sendChatMessage } from "../utils/api";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your Serene companion. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
              <div className="bg-serene-surface border border-serene-border rounded-lg px-4 py-2.5 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-serene-muted animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-serene-muted animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-serene-muted animate-bounce [animation-delay:0.4s]" />
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
