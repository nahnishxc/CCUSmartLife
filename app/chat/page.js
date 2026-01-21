"use client";

import { useEffect, useRef, useState } from "react";
import { faqItems } from "./faqData";

// =========================================================================
// 1. 定義眨眼的 Keyframes
// =========================================================================
const blinkStyle = `
  @keyframes blink {
    0%, 90%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.1); }
  }
`;

// =========================================================================
// 3D 立體動態球球組件 (整合眨眼 + 延遲)
// =========================================================================
function DynamicChatBall() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xPct = (e.clientX / innerWidth - 0.5) * 2;
      const yPct = (e.clientY / innerHeight - 0.5) * 2;

      const maxRotation = 35; 
      const x = -yPct * maxRotation;
      const y = xPct * maxRotation;

      setRotation({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="relative w-40 h-40 mb-8 flex items-center justify-center"
      style={{ perspective: "600px" }} 
    >
      {/* 注入樣式 */}
      <style>{blinkStyle}</style>

      {/* 頭部本體 
         關鍵修改：將 duration-100 改成 duration-500
         這會讓轉頭有一個 0.5秒 的延遲，創造出「跟隨但有重量感」的效果
      */}
      <div
        className="w-full h-full rounded-full relative transition-transform duration-500 ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          background: "radial-gradient(circle at 20% 20%, #fbbf24, #f97316, #ec4899, #0ea5e9)",
          boxShadow: "0 0 60px rgba(248, 113, 113, 0.6)",
        }}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center gap-5 pointer-events-none"
          style={{ transform: "translateZ(75px)" }} 
        >
          {/* 左眼：加入 animation 屬性 */}
          <span 
            className="w-[18px] h-[34px] rounded-full bg-[rgba(255,255,255,0.9)] shadow-sm" 
            style={{ animation: 'blink 4s infinite ease-in-out' }}
          />
          {/* 右眼：加入 animation 屬性 */}
          <span 
            className="w-[18px] h-[34px] rounded-full bg-[rgba(255,255,255,0.9)] shadow-sm" 
            style={{ animation: 'blink 4s infinite ease-in-out' }}
          />
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 主頁面程式碼 (保持不變)
// =========================================================================

const greetings = [
  "Hey, I'm your CCU Smart Assistant. What can I do for you today?",
  "What would you like to explore about CCU today?",
  "Need help with dorms, classes, or visas? Ask me anything.",
  "Tell me what you’re looking for, I’ll handle the rest.",
];

async function callAssistantApi(message) {
  const res = await fetch("http://100.77.15.121:3000/api/ai/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: message }),
  });
  if (!res.ok) {
    throw new Error(`API Request Failed: ${res.status}`);
  }

  const data = await res.json();
  return data.answer;
}

export default function ChatPage() {
  const [greeting, setGreeting] = useState(greetings[0]);
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting);
  }, []);

  async function handleSend(sourceText, options) {
    const isFAQ = options?.isFAQ || false;
    const text = (sourceText ?? inputValue).trim();
    if (!text || isSending) return;

    const userMessage = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    if (!hasStarted) setHasStarted(true);

    if (isFAQ) {
      const faqItem = faqItems.find((item) => item.question === text);
      if (faqItem && faqItem.answer) {
        const faqMessage = {
          id: Date.now().toString() + "-faq",
          role: "assistant",
          content: faqItem.answer,
        };
        setTimeout(() => {
          setMessages((prev) => [...prev, faqMessage]);
        }, 300);
      }
      return;
    }

    setIsSending(true);
    try {
      const reply = await callAssistantApi(text);
      const assistantMessage = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        content: reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString() + "-error",
        role: "assistant",
        content: "Sorry, something went wrong while contacting the assistant.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSend();
  }

  function handleFAQClick(item) {
    handleSend(item.question, { isFAQ: true });
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen bg-white pt-16">
      {!hasStarted && (
        <main className="flex-1 flex justify-center pt-20 px-4 pb-16">
          <section className="w-full max-w-4xl text-center flex flex-col items-center">
            
            {/* 使用新的 3D 動態組件 */}
            <DynamicChatBall />

            <div className="mb-6">
              <p className="text-[10px] tracking-[0.3em] text-gray-500 mb-2 uppercase">
                CCU SMART ASSISTANT
              </p>
              <h1 className="text-[26px] font-semibold text-gray-900 leading-snug m-0">
                {greeting}
              </h1>
            </div>

            <div className="w-full max-w-2xl flex flex-wrap justify-center gap-3 mb-6">
              {faqItems.map((item) => (
                <button
                  key={item.question}
                  onClick={() => handleFAQClick(item)}
                  className="py-2 px-4 rounded-full border border-gray-200 bg-white text-xs text-gray-900 cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors"
                >
                  {item.question}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-lg flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tell me what you need help with..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
              />
              <button
                type="submit"
                disabled={isSending}
                className="py-3 px-[18px] rounded-full border-none bg-gray-900 text-white text-[13px] font-medium cursor-pointer hover:bg-black disabled:opacity-60 disabled:cursor-default transition-colors"
              >
                Send
              </button>
            </form>
          </section>
        </main>
      )}

      {hasStarted && (
        <main className="flex-1 flex justify-center pt-12 px-4 pb-8">
          <section className="max-w-3xl w-full flex flex-col flex-1">
            <div className="flex-1 rounded-[18px] border border-gray-200 bg-gray-50 p-[18px] overflow-y-auto min-h-[400px]">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-sm text-gray-500">
                  Start by asking anything about CCU life, services or campus.
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex mb-2.5 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
              />
              <button
                type="submit"
                disabled={isSending}
                className="py-3 px-[18px] rounded-full border-none bg-gray-900 text-white text-[13px] font-medium cursor-pointer hover:bg-black disabled:opacity-60 disabled:cursor-default transition-colors"
              >
                Send
              </button>
            </form>
          </section>
        </main>
      )}
    </div>
  );
}