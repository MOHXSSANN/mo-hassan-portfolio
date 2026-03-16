"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles, Pencil } from "lucide-react";

const MAX_MESSAGES = 2;

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

interface CopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "Tell me about Mo?",
  "What projects has Mo built?",
  "What's his tech stack?",
  "How can I contact Mo?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            display: "inline-block",
            background: "var(--vsc-fg-muted)",
          }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        gap: 2,
        padding: "0 12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 6,
          flexDirection: isUser ? "row-reverse" : "row",
          maxWidth: "88%",
        }}
      >
        {!isUser && (
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "var(--vsc-red)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            <Bot size={13} color="white" />
          </div>
        )}
        <div
          style={{
            padding: "8px 11px",
            borderRadius: isUser ? "12px 12px 2px 12px" : "2px 12px 12px 12px",
            background: isUser
              ? "var(--vsc-red)"
              : "rgba(255,255,255,0.06)",
            color: isUser ? "#fff" : "var(--vsc-fg)",
            fontSize: "13px",
            lineHeight: "1.55",
            fontFamily: "var(--font-display)",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            border: isUser ? "none" : "1px solid var(--vsc-border)",
          }}
        >
          {message.content === "" && message.streaming ? (
            <TypingDots />
          ) : (
            <MarkdownText text={message.content} streaming={message.streaming} />
          )}
        </div>
      </div>
    </div>
  );
}

/* Minimal markdown renderer: bold, inline code, code blocks, links */
function MarkdownText({
  text,
  streaming,
}: {
  text: string;
  streaming?: boolean;
}) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, li) => {
        // Code block detection (very simple — triple backtick on its own line)
        if (line.startsWith("```")) {
          return <span key={li} />;
        }
        // Heading
        const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
        if (headingMatch) {
          const level = headingMatch[1].length;
          return (
            <span
              key={li}
              style={{
                display: "block",
                fontWeight: 700,
                fontSize: level === 1 ? 15 : level === 2 ? 14 : 13,
                marginTop: li > 0 ? 6 : 0,
                color: "var(--vsc-red-light)",
                fontFamily: "var(--font-display)",
              }}
            >
              {renderInline(headingMatch[2])}
              {"\n"}
            </span>
          );
        }
        // Bullet list
        if (line.match(/^[-*]\s/)) {
          return (
            <span key={li} style={{ display: "block", paddingLeft: 10 }}>
              {"• "}
              {renderInline(line.slice(2))}
              {"\n"}
            </span>
          );
        }
        return (
          <span key={li} style={{ display: "block" }}>
            {renderInline(line)}
            {li < lines.length - 1 ? "\n" : ""}
          </span>
        );
      })}
      {streaming && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            background: "var(--vsc-red-light)",
            verticalAlign: "text-bottom",
            marginLeft: 1,
          }}
        />
      )}
    </>
  );
}

function renderInline(text: string): React.ReactNode[] {
  // Split on `code`, **bold**, *italic*
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("`")) {
      parts.push(
        <code
          key={match.index}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11.5px",
            background: "rgba(255,255,255,0.1)",
            padding: "1px 5px",
            borderRadius: 4,
            color: "var(--vsc-red-light)",
          }}
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("**")) {
      parts.push(
        <strong key={match.index} style={{ fontWeight: 700 }}>
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <em key={match.index} style={{ fontStyle: "italic" }}>
          {token.slice(1, -1)}
        </em>
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function CopilotPanel({ isOpen, onClose, isMobile }: CopilotPanelProps & { isMobile?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userMessageCount >= MAX_MESSAGES;
  const msgsLeft = MAX_MESSAGES - userMessageCount;

  const newChat = useCallback(() => {
    setMessages([]);
    setInput("");
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading || limitReached) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const assistantMsg: Message = {
        role: "assistant",
        content: "",
        streaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setLoading(true);

      try {
        const history = [...messages, userMsg].map(({ role, content }) => ({
          role,
          content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok || !res.body) {
          const errData = await res.json().catch(() => ({}));
          if (errData.error === "credits_low") {
            throw new Error("credits_low");
          }
          throw new Error("Request failed");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          const snap = accumulated;
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (last.role === "assistant") {
              copy[copy.length - 1] = {
                ...last,
                content: snap,
                streaming: true,
              };
            }
            return copy;
          });
        }

        // Finalize — remove streaming cursor
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.role === "assistant") {
            copy[copy.length - 1] = { ...last, streaming: false };
          }
          return copy;
        });
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : "";
        const isCredits = errMsg === "credits_low";
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.role === "assistant") {
            copy[copy.length - 1] = {
              ...last,
              content: isCredits
                ? "⚡ API credits are being processed — please check back in a few minutes while Anthropic activates the account. Everything is set up correctly!"
                : "Sorry, something went wrong. Please try again.",
              streaming: false,
            };
          }
          return copy;
        });
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="copilot-panel"
          initial={isMobile ? { opacity: 0, y: 40 } : { width: 0, opacity: 0 }}
          animate={isMobile ? { opacity: 1, y: 0 } : { width: 320, opacity: 1 }}
          exit={isMobile ? { opacity: 0, y: 40 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          style={isMobile ? {
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            background: "var(--vsc-sidebar-bg)",
          } : {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "var(--vsc-sidebar-bg)",
            borderLeft: "1px solid var(--vsc-border)",
            overflow: "hidden",
            flexShrink: 0,
            width: 320,
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 12px",
              height: 40,
              borderBottom: "1px solid var(--vsc-border)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Sparkles
                size={15}
                style={{ color: "var(--vsc-red-light)" }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--vsc-fg)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.01em",
                }}
              >
                Mo&apos;s Copilot
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* New chat */}
              <button
                onClick={newChat}
                title="New chat"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--vsc-fg-muted)", display: "flex",
                  alignItems: "center", padding: 4, borderRadius: 4,
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--vsc-fg-muted)";
                  (e.currentTarget as HTMLButtonElement).style.background = "none";
                }}
                aria-label="New chat"
              >
                <Pencil size={14} />
              </button>
              {/* Close */}
              <button
                onClick={onClose}
                title="Close"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--vsc-fg-muted)", display: "flex",
                  alignItems: "center", padding: 4, borderRadius: 4,
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--vsc-fg-muted)";
                  (e.currentTarget as HTMLButtonElement).style.background = "none";
                }}
                aria-label="Close Copilot"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* ── Chat body ── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              paddingTop: 12,
              paddingBottom: 8,
              scrollbarWidth: "thin",
              scrollbarColor: "var(--vsc-border) transparent",
            }}
          >
            {!hasMessages ? (
              /* ── Greeting ── */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "24px 16px 16px",
                  gap: 6,
                }}
              >
                {/* Avatar card */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--vsc-red) 0%, var(--vsc-red-light) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 4,
                    boxShadow: "0 0 18px var(--vsc-red-glow)",
                  }}
                >
                  <Bot size={26} color="white" />
                </div>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--vsc-fg)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Hi! I&apos;m Mo&apos;s Copilot
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--vsc-fg-muted)",
                    textAlign: "center",
                    lineHeight: 1.5,
                    fontFamily: "var(--font-display)",
                    maxWidth: 230,
                  }}
                >
                  Ask me anything about his projects, skills, experience, or
                  achievements.
                </span>

                {/* Suggested questions */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 7,
                    marginTop: 14,
                    width: "100%",
                  }}
                >
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--vsc-border)",
                        borderRadius: 7,
                        padding: "8px 9px",
                        fontSize: 11.5,
                        color: "var(--vsc-fg)",
                        fontFamily: "var(--font-display)",
                        cursor: "pointer",
                        textAlign: "left",
                        lineHeight: 1.4,
                        transition: "background 0.15s, border-color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "rgba(255,255,255,0.09)";
                        el.style.borderColor = "var(--vsc-red-light)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "rgba(255,255,255,0.04)";
                        el.style.borderColor = "var(--vsc-border)";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Input area ── */}
          <div
            style={{
              borderTop: "1px solid var(--vsc-border)",
              padding: "9px 10px 6px",
              flexShrink: 0,
              background: "var(--vsc-sidebar-bg)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={limitReached ? "Start a new chat to continue..." : "Ask anything about Mo..."}
                rows={1}
                disabled={loading || limitReached}
                style={{
                  flex: 1,
                  resize: "none",
                  background: limitReached ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                  border: "1px solid var(--vsc-border)",
                  borderRadius: 7,
                  padding: "7px 10px",
                  fontSize: 12.5,
                  color: limitReached ? "var(--vsc-fg-muted)" : "var(--vsc-fg)",
                  fontFamily: "var(--font-display)",
                  outline: "none",
                  minHeight: 34,
                  maxHeight: 100,
                  overflowY: "auto",
                  lineHeight: "1.5",
                  caretColor: "var(--vsc-red-light)",
                  scrollbarWidth: "none",
                  transition: "border-color 0.15s",
                  opacity: limitReached ? 0.5 : 1,
                }}
                onFocus={(e) => {
                  if (!limitReached) e.currentTarget.style.borderColor = "var(--vsc-red-light)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--vsc-border)";
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim() || limitReached}
                style={{
                  width: 34, height: 34, borderRadius: 7, border: "none",
                  background: loading || !input.trim() || limitReached ? "rgba(255,255,255,0.06)" : "var(--vsc-red)",
                  color: loading || !input.trim() || limitReached ? "var(--vsc-fg-muted)" : "white",
                  cursor: loading || !input.trim() || limitReached ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.15s, color 0.15s",
                }}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
            {/* Message counter */}
            <div style={{
              marginTop: 5,
              fontSize: 11,
              color: limitReached ? "var(--vsc-fg-muted)" : "var(--vsc-fg-dim)",
              fontFamily: "var(--font-display)",
              textAlign: "right",
            }}>
              {limitReached
                ? <span>Limit reached · <button onClick={newChat} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--vsc-red-light)", fontSize: 11, fontFamily: "var(--font-display)", padding: 0 }}>New chat ↑</button></span>
                : `${msgsLeft} msg${msgsLeft === 1 ? "" : "s"} left`
              }
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
