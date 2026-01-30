"use client";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useDragControls,
} from "framer-motion";
import { X, Send, MoreVertical } from "lucide-react";
import SlimeBall from "./SlimeBall";

// =========================================================================
// API 設定（未來要換公網 API 只要改這裡）
// =========================================================================
const API_BASE_URL = "http://100.80.165.7:3000";

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  // 結構化訊息
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const [history, setHistory] = useState<{ id: number; title: string }[]>([
    { id: 1, title: "How to get to CCU?" },
    { id: 2, title: "Recommended food near CCU" },
  ]);
  const [size] = useState({ width: 400, height: 550 });
  const [ready, setReady] = useState(false);

  const bubbleRef = useRef<HTMLButtonElement>(null);
  const dragControls = useDragControls();
  const isDragging = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const safe = 16;

  // 自動捲動到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  // =========================================================================
  // 發送訊息與 API 串接邏輯
  // =========================================================================
  const handleSend = async (textOverride?: string) => {
    const text = (textOverride ?? inputValue).trim();
    if (!text || isSending) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);

      const data = await res.json();
      const assistantMessage = { role: "assistant", content: data.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("API failed:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting to the server.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const getBubbleSize = () => {
    const r = bubbleRef.current?.getBoundingClientRect();
    return { w: r?.width ?? 160, h: r?.height ?? 160 };
  };

  // =========================================================================
  // 核心座標修復邏輯
  // =========================================================================
  const snap = (mode: "bubble" | "panel") => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // 預測即將變化的寬高
    const targetW = mode === "panel" ? size.width : 160;
    const targetH = mode === "panel" ? size.height : 160;

    const curX = x.get();
    const curY = y.get();

    // 判斷當前中心點位置來決定貼左或貼右
    const currentW = mode === "panel" ? 160 : size.width; // 從球變面板或反之
    const centerX = curX + currentW / 2;
    const targetX = centerX < vw / 2 ? safe : vw - targetW - safe;

    // 確保 Y 軸不超出螢幕
    const targetY = clamp(curY, safe, vh - targetH - safe);

    animate(x, targetX, {
      type: "spring",
      stiffness: 360,
      damping: 32,
    });
    animate(y, targetY, { type: "spring", stiffness: 360, damping: 32 });
  };

  useLayoutEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { w, h } = getBubbleSize();
    x.set(vw - w - safe);
    y.set(vh - h - safe);
    setReady(true);
  }, []);

  useEffect(() => {
    const onResize = () => {
      snap(isChatOpen ? "panel" : "bubble");
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isChatOpen]);

  const handleOpen = () => {
    if (isDragging.current) return;
    setIsChatOpen(true);
    setIsHistoryOpen(false);
    // 使用 setTimeout 確保 state 更新且寬度變化後再計算 snap
    setTimeout(() => snap("panel"), 0);
  };

  const handleClose = () => {
    setIsChatOpen(false);
    setIsHistoryOpen(false);
    setTimeout(() => snap("bubble"), 0);
  };

  const handleNewChat = () => {
    if (history.length >= 5) {
      alert("Maximum of 5 chat sessions reached.");
      return;
    }
    const nextId = Math.max(0, ...history.map((h) => h.id)) + 1;
    setHistory([{ id: nextId, title: `Chat ${nextId}` }, ...history]);
    setMessages([]);
    setIsHistoryOpen(false);
  };

  const TypingIndicator = () => (
    <div className="flex gap-1 px-5 py-3.5 bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-sm w-16">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const faqOptions = [
    "Tell me about CCU Campus",
    "How to get to Minxiong?",
    "Food recommendations",
    "Bus schedule",
    "Library hours",
  ];

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={!isChatOpen}
      dragMomentum={false}
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDragging.current = false;
        }, 50);
        snap(isChatOpen ? "panel" : "bubble");
      }}
      style={{ x, y, opacity: ready ? 1 : 0 }}
      className="fixed left-0 top-0 z-[9999]"
    >
      <AnimatePresence initial={false}>
        {!isChatOpen && (
          <motion.button
            key="bubble"
            ref={bubbleRef}
            onTap={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-40 h-40 bg-transparent flex items-center justify-center"
          >
            <div className="w-full h-full">
              <SlimeBall />
            </div>
          </motion.button>
        )}

        {isChatOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            style={{ width: size.width, height: size.height }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col relative"
          >
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 p-5 flex justify-between items-center text-white shrink-0 cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                  ✨
                </div>
                <h3 className="font-bold">CCU Assistant</h3>
              </div>
              <div className="flex gap-1">
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setIsHistoryOpen((v) => !v)}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <MoreVertical size={20} />
                </button>
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-gray-50 p-6 overflow-y-auto relative">
              <div className="flex flex-col gap-3">
                <div className="self-start bg-white px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-700 max-w-[85%]">
                  Hi! I&apos;m your AI assistant. How can I help you today?
                </div>

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-5 py-3.5 rounded-2xl text-sm max-w-[85%] shadow-sm ${
                        m.role === "user"
                          ? "bg-emerald-600 text-white rounded-tr-none"
                          : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                
                {isSending && (
                  <div className="flex justify-start">
                    <TypingIndicator />
                  </div>
                )}
                <div ref={messagesEndRef} />

                {messages.length === 0 && !isSending && (
                  <div className="mt-1 flex flex-wrap gap-2 justify-start">
                    {faqOptions.map((faq) => (
                      <button
                        key={faq}
                        className="bg-white px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm"
                        onClick={() => handleSend(faq)}
                      >
                        {faq}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <AnimatePresence>
                {isHistoryOpen && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl z-40 p-6 border-l border-gray-200 flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-6 font-bold text-gray-800">
                      History
                      <button
                        onClick={() => setIsHistoryOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <button
                      onClick={handleNewChat}
                      className="w-full py-3 border-2 border-dashed rounded-2xl text-xs mb-4 hover:border-emerald-400 hover:text-emerald-600"
                    >
                      + New Chat
                    </button>
                    <div className="flex-1 overflow-y-auto">
                      {history.map((c) => (
                        <div
                          key={c.id}
                          className="p-3 bg-gray-50 rounded-xl mb-2 text-xs truncate"
                        >
                          {c.title}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isSending ? "AI is thinking..." : "Ask me..."}
                  disabled={isSending}
                  className="w-full bg-gray-100 py-3 px-4 pr-12 rounded-xl outline-none text-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSending || !inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-lg disabled:bg-gray-400 transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}