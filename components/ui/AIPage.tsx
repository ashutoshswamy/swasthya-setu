"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout";
import { Card } from "@/components/ui";
import { 
  Send, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  Trash2,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIPageProps {
  portal: "citizen" | "hospital" | "admin";
  title: string;
  subtitle: string;
}

const quickSuggestions: Record<string, string[]> = {
  citizen: [
    "What are the symptoms of dengue?",
    "Which hospitals have ICU beds available?",
    "How do I report a health incident?",
    "What are the current disease trends in Solapur?",
    "What precautions should I take during monsoon?",
    "Emergency contact numbers",
  ],
  hospital: [
    "How to update bed availability?",
    "Triage priority guidelines",
    "Managing resource allocation efficiently",
    "Incident response protocol",
    "Staff scheduling best practices",
    "Handling patient overflow",
  ],
  admin: [
    "Which areas have high disease risk?",
    "How to create a city-wide health alert?",
    "Current hospital capacity across the city",
    "Disease outbreak prediction analysis",
    "Resource distribution recommendations",
    "Incident trends this week",
  ],
};

// Simple markdown formatter for chat messages
function formatMarkdown(text: string): React.ReactNode {
  const paragraphs = text.split(/\n\n+/);
  
  return paragraphs.map((paragraph, pIndex) => {
    if (/^\d+\.\s/.test(paragraph)) {
      const listItems = paragraph.split(/\n(?=\d+\.\s)/);
      return (
        <ol key={pIndex} className="list-decimal list-inside space-y-1 my-2">
          {listItems.map((item, i) => (
            <li key={i}>{formatInlineMarkdown(item.replace(/^\d+\.\s*/, ''))}</li>
          ))}
        </ol>
      );
    }
    
    if (/^[-*]\s/.test(paragraph)) {
      const listItems = paragraph.split(/\n(?=[-*]\s)/);
      return (
        <ul key={pIndex} className="list-disc list-inside space-y-1 my-2">
          {listItems.map((item, i) => (
            <li key={i}>{formatInlineMarkdown(item.replace(/^[-*]\s*/, ''))}</li>
          ))}
        </ul>
      );
    }
    
    const lines = paragraph.split('\n');
    return (
      <p key={pIndex} className="mb-2 last:mb-0">
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

function formatInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function AIPage({ portal, title, subtitle }: AIPageProps) {
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
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="animate-fade-in">
      <Header title={title} subtitle={subtitle} />

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <Card className="lg:col-span-3 p-0 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
          {/* Chat Header */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">AI Health Assistant</h3>
                <p className="text-xs text-white/80">Powered by Gemini AI</p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center"
                >
                  <Sparkles className="w-10 h-10 text-purple-600" />
                </motion.div>
                <h4 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  Welcome to AI Assistant
                </h4>
                <p className="text-[var(--muted-foreground)] mb-6 max-w-md mx-auto">
                  I'm here to help you with health-related questions, finding resources, and navigating the platform.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                  {quickSuggestions[portal]?.slice(0, 4).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      className="text-left px-4 py-3 text-sm rounded-xl bg-[var(--muted)] hover:bg-[var(--primary-100)] text-[var(--foreground)] transition-colors border border-transparent hover:border-[var(--primary-200)]"
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
                    className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user"
                          ? "bg-[var(--primary-100)]"
                          : "bg-gradient-to-r from-purple-500 to-indigo-500"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-5 h-5 text-[var(--primary-600)]" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[70%] px-5 py-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-[var(--primary-600)] text-white rounded-tr-sm"
                          : "bg-[var(--muted)] text-[var(--foreground)] rounded-tl-sm"
                      }`}
                    >
                      {message.role === "assistant" 
                        ? formatMarkdown(message.content)
                        : message.content
                      }
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                    <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-[var(--muted)]">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2.5 h-2.5 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2.5 h-2.5 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about health services..."
                className="flex-1 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium flex items-center gap-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Send
              </motion.button>
            </div>
          </form>
        </Card>

        {/* Suggestions Sidebar */}
        <Card className="h-fit">
          <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Quick Questions
          </h3>
          <div className="space-y-2">
            {quickSuggestions[portal]?.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="block w-full text-left px-4 py-3 text-sm rounded-xl bg-[var(--muted)] hover:bg-[var(--primary-100)] text-[var(--foreground)] transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
