import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Bot, User } from "lucide-react";
import { mockChatResponses } from "@/data/mockData";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const quickQuestions = [
  "Which schemes are best for farmers?",
  "I am a student, what can I apply for?",
  "How to apply for PM Kisan?",
  "Schemes for unemployed youth",
];

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Namaste! 🙏 I'm your YojanaSathi assistant. Ask me about any government scheme, and I'll help you find the best ones for you.",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (lower.includes("farmer") || lower.includes("kisan") || lower.includes("crop"))
      return mockChatResponses.farmer;
    if (lower.includes("student") || lower.includes("scholarship") || lower.includes("education"))
      return mockChatResponses.student;
    if (lower.includes("employ") || lower.includes("skill") || lower.includes("job") || lower.includes("business"))
      return mockChatResponses.employment;
    return mockChatResponses.default;
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = { id: Date.now(), text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI typing delay
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        text: getAIResponse(messageText),
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-saffron shadow-lg flex items-center justify-center hover:opacity-90 active:scale-95 transition-all z-50 animate-bounce-gentle"
          aria-label="Ask AI"
        >
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:h-[520px] bg-card sm:rounded-2xl shadow-2xl flex flex-col z-50 sm:border border-border animate-slide-up">
          {/* Header */}
          <div className="gradient-navy px-4 py-3 flex items-center justify-between sm:rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-navy-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy-foreground">YojanaSathi AI</h3>
                <p className="text-[10px] text-navy-foreground/70">Always here to help 🙏</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-navy-foreground/70 hover:text-navy-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-6 h-6 rounded-full gradient-navy flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-navy-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-line
                    ${msg.sender === "user"
                      ? "gradient-saffron text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-[10px] text-muted-foreground mb-2 font-medium">Quick Questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-2.5 py-1.5 rounded-full border border-border bg-card text-[10px] text-foreground hover:border-primary hover:bg-saffron-light transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${input.trim()
                    ? "gradient-saffron text-primary-foreground"
                    : "bg-border text-muted-foreground"
                  }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
