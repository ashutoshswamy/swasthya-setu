"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Sparkles 
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantProps {
  portal: "citizen" | "hospital" | "admin";
}

const quickSuggestions: Record<string, string[]> = {
  citizen: [
    "What are dengue symptoms?",
    "Find hospitals with ICU beds",
    "How to report an incident?",
    "Current health trends",
  ],
  hospital: [
    "How to update bed count?",
    "Triage priority guidelines",
    "Managing resource allocation",
    "Incident response protocol",
  ],
  admin: [
    "High risk areas today?",
    "How to create an alert?",
    "System analytics overview",
    "Hospital capacity status",
  ],
};

const portalTitles: Record<string, string> = {
  citizen: "Health Assistant",
  hospital: "Hospital Assistant",
  admin: "Admin Assistant",
};

// Simple markdown formatter for chat messages
function formatMarkdown(text: string): React.ReactNode {
  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n\n+/);
  
  return paragraphs.map((paragraph, pIndex) => {
    // Handle numbered lists
    if (/^\d+\.\s/.test(paragraph)) {
      const listItems = paragraph.split(/\n(?=\d+\.\s)/);
      return (
        <ol key={pIndex} className="list-decimal list-inside space-y-1 my-2">
          {listItems.map((item, i) => (
            <li key={i} className="text-sm">
              {formatInlineMarkdown(item.replace(/^\d+\.\s*/, ''))}
            </li>
          ))}
        </ol>
      );
    }
    
    // Handle bullet lists
    if (/^[-*]\s/.test(paragraph)) {
      const listItems = paragraph.split(/\n(?=[-*]\s)/);
      return (
        <ul key={pIndex} className="list-disc list-inside space-y-1 my-2">
          {listItems.map((item, i) => (
            <li key={i} className="text-sm">
              {formatInlineMarkdown(item.replace(/^[-*]\s*/, ''))}
            </li>
          ))}
        </ul>
      );
    }
    
    // Regular paragraph with line breaks
    const lines = paragraph.split('\n');
    return (
      <p key={pIndex} className="text-sm mb-2 last:mb-0">
        {lines.map((line, lIndex) => (
          <span key={lIndex}>
            {formatInlineMarkdown(line)}
            {lIndex < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

// Format inline markdown (bold, italic)
function formatInlineMarkdown(text: string): React.ReactNode {
  // Replace **text** with bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function AIAssistant({ portal }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          portal,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || "Sorry, I couldn't process that request.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 left-4 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 left-4 z-50 w-[380px] h-[520px] bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">{portalTitles[portal]}</h3>
                <p className="text-xs text-white/80">Powered by Gemini AI</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-[var(--foreground)] mb-2">
                    How can I help you?
                  </h4>
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">
                    Ask me anything about health services
                  </p>
                  {/* Quick Suggestions */}
                  <div className="space-y-2">
                    {quickSuggestions[portal]?.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="block w-full text-left px-3 py-2 text-sm rounded-lg bg-[var(--muted)] hover:bg-[var(--primary-100)] text-[var(--foreground)] transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "user"
                            ? "bg-[var(--primary-100)]"
                            : "bg-gradient-to-r from-purple-500 to-indigo-500"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="w-4 h-4 text-[var(--primary-600)]" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-[var(--primary-600)] text-white rounded-tr-sm"
                            : "bg-[var(--muted)] text-[var(--foreground)] rounded-tl-sm"
                        }`}
                      >
                        {message.role === "assistant" 
                          ? formatMarkdown(message.content)
                          : <span className="text-sm">{message.content}</span>
                        }
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[var(--muted)]">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border)]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
