// "use client";
// import { useState, useRef, useLayoutEffect, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   animate,
//   useDragControls,
// } from "framer-motion";
// import { X, Send, MoreVertical } from "lucide-react";
// import SlimeBall from "./SlimeBall";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://campus-ai-backend-1.onrender.com";

// export default function ChatWidget() {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isHistoryOpen, setIsHistoryOpen] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);

//   const [messages, setMessages] = useState<{ role: string; content: string }[]>(
//     [],
//   );
//   const [history, setHistory] = useState<{ id: number; title: string }[]>([]);

//   const [size] = useState({ width: 400, height: 550 });
//   const [ready, setReady] = useState(false);

//   const bubbleRef = useRef<HTMLButtonElement>(null);
//   const dragControls = useDragControls();
//   const isDragging = useRef(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const safe = 16;

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isSending]);

//   // 1. 初始化與同步：當視窗打開或切換時，從後端抓取 Session 列表 [cite: 34, 35]
//   // --- 1. 抓取所有對話列表 ---
//   useEffect(() => {
//     const fetchSessions = async () => {
//       const token = localStorage.getItem("token");
//       if (!token || !isChatOpen) return;
//       try {
//         // 路徑修正：${API_BASE_URL}/api/sessions
//         const res = await fetch(`${API_BASE_URL}/api/sessions`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setHistory(Array.isArray(data) ? data : []);
//         }
//       } catch (e) {
//         console.error("Failed to fetch sessions", e);
//       }
//     };
//     fetchSessions();
//   }, [isChatOpen]);

//   // --- 2. 發送訊息 ---
//   const handleSend = async (textOverride?: string) => {
//     const text = (textOverride ?? inputValue).trim();
//     if (!text || isSending) return;

//     setMessages((prev) => [...prev, { role: "user", content: text }]);
//     setInputValue("");
//     setIsSending(true);

//     const token = localStorage.getItem("token");

//     try {
//       // 路徑修正：${API_BASE_URL}/api/chat
//       const res = await fetch(`${API_BASE_URL}/api/chat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { "Authorization": `Bearer ${token}` } : {})
//         },
//         body: JSON.stringify({
//           message: text, // 如果後端噴錯，試試看改回 query: text
//           sessionId: currentSessionId
//         }),
//       });

//       if (!res.ok) throw new Error(`API Error: ${res.status}`);

//       const data = await res.json();
//       const assistantMessage = {
//         role: "assistant",
//         content: data.answer || data.message || "I received an empty response."
//       };
//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (error) {
//       console.error("API failed:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "抱歉，目前連線似乎有點問題，請稍後再試。" }
//       ]);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // --- 3. 建立新對話 ---
//   const handleNewChat = async () => {
//     setMessages([]);
//     setCurrentSessionId(null);
//     setIsHistoryOpen(false);

//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       // 路徑修正：${API_BASE_URL}/api/sessions
//       const res = await fetch(`${API_BASE_URL}/api/sessions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title: "New Chat" }),
//       });

//       if (res.ok) {

//         const newSession = await res.json();
//         setHistory([newSession, ...history]);
//         setCurrentSessionId(newSession.id);
//       }
//     } catch (e) {
//       console.error("Connect failed:", e);
//     }
//   };

//   const handleNewChat = async () => {
//     setMessages([]); // 清空目前對話
//     setCurrentSessionId(null); // 重設 Session ID
//     setIsHistoryOpen(false); // 關閉側選單

//     if (history.length >= 5) {
//       alert("目前最多只能有 5 個對話喔！");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.log("提示：目前是以訪客身份操作（無 Token）");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/sessions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title: "New Chat" }),
//       });

//       if (res.ok) {
//         const newSession = await res.json();
//         setHistory([newSession, ...history]);
//         setCurrentSessionId(newSession.id);
//       } else {
//         // 如果後端回傳錯誤（例如 400 或 500），至少噴個資訊讓你看到
//         const errorData = await res.json().catch(() => ({}));
//         console.error("後端建立 Session 失敗:", errorData);
//       }
//     } catch (e) {
//       console.error("連不到後端伺服器:", e);
//     }
//   };

//   const clamp = (v: number, min: number, max: number) =>
//     Math.min(Math.max(v, min), max);

//   const getBubbleSize = () => {
//     const r = bubbleRef.current?.getBoundingClientRect();
//     return { w: r?.width ?? 160, h: r?.height ?? 160 };
//   };

//   const snap = (mode: "bubble" | "panel") => {
//     const vw = window.innerWidth;
//     const vh = window.innerHeight;
//     const targetW = mode === "panel" ? size.width : 160;
//     const targetH = mode === "panel" ? size.height : 160;
//     const curX = x.get();
//     const curY = y.get();
//     const currentW = mode === "panel" ? 160 : size.width;
//     const centerX = curX + currentW / 2;
//     const targetX = centerX < vw / 2 ? safe : vw - targetW - safe;
//     const currentH = mode === "panel" ? 160 : size.height;
//     const centerY = curY + currentH / 2;
//     let targetY;
//     if (mode === "bubble" && centerY > vh / 2) {
//       targetY = vh - targetH - safe;
//     } else {
//       targetY = clamp(curY, safe, vh - targetH - safe);
//     }
//     animate(x, targetX, { type: "spring", stiffness: 360, damping: 32 });
//     animate(y, targetY, { type: "spring", stiffness: 360, damping: 32 });
//   };

//   useLayoutEffect(() => {
//     const vw = window.innerWidth;
//     const vh = window.innerHeight;
//     const { w, h } = getBubbleSize();
//     x.set(vw - w - safe);
//     y.set(vh - h - safe);
//     setReady(true);
//   }, []);

// useEffect(() => {
//     const fetchSessions = async () => {
//       const token = localStorage.getItem("token");
//       if (!token || !isChatOpen) return;
//       try {
//         const res = await fetch(`${API_BASE_URL}/api/sessions`, {
//           headers: { "Authorization": `Bearer ${token}` }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           if(Array.isArray(data)) setHistory(data);
//         }
//       } catch (e) {
//         console.error("Failed to fetch sessions", e);
//       }
//     };
//     fetchSessions();
//   }, [isChatOpen]);

//   const handleOpen = () => {
//     if (isDragging.current) return;
//     setIsChatOpen(true);
//     setIsHistoryOpen(false);
//     setTimeout(() => snap("panel"), 0);
//   };

//   const handleClose = () => {
//     setIsChatOpen(false);
//     setIsHistoryOpen(false);
//     setTimeout(() => snap("bubble"), 0);
//   };

//   const TypingIndicator = () => (
//     <div className="flex gap-1 px-5 py-3.5 bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-sm w-16">
//       {[0, 1, 2].map((i) => (
//         <motion.div
//           key={i}
//           className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
//           animate={{ y: [0, -5, 0] }}
//           transition={{
//             duration: 0.6,
//             repeat: Infinity,
//             delay: i * 0.15,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );

//   const faqOptions = [
//     "Tell me about CCU Campus",
//     "How to get to Minxiong?",
//     "Food recommendations",
//     "Bus schedule",
//     "Library hours",
//   ];

//   return (
//     <motion.div
//       drag
//       dragControls={dragControls}
//       dragListener={!isChatOpen}
//       dragMomentum={false}
//       onDragStart={() => {
//         isDragging.current = true;
//       }}
//       onDragEnd={() => {
//         setTimeout(() => {
//           isDragging.current = false;
//         }, 50);
//         snap(isChatOpen ? "panel" : "bubble");
//       }}
//       style={{ x, y, opacity: ready ? 1 : 0 }}
//       className="fixed left-0 top-0 z-[9999]"
//     >
//       <AnimatePresence initial={false}>
//         {!isChatOpen && (
//           <motion.button
//             key="bubble"
//             ref={bubbleRef}
//             onTap={handleOpen}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-40 h-40 bg-transparent flex items-center justify-center"
//           >
//             <div className="w-full h-full">
//               <SlimeBall />
//             </div>
//           </motion.button>
//         )}

//         {isChatOpen && (
//           <motion.div
//             key="panel"
//             initial={{ opacity: 0, scale: 0.96 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.96 }}
//             transition={{ type: "spring", damping: 26, stiffness: 240 }}
//             style={{ width: size.width, height: size.height }}
//             className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col relative"
//           >
//             <div
//               onPointerDown={(e) => dragControls.start(e)}
//               className="bg-gradient-to-r from-emerald-500 to-teal-600 p-5 flex justify-between items-center text-white shrink-0 cursor-grab active:cursor-grabbing"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
//                   ✨
//                 </div>
//                 <h3 className="font-bold">CCU Assistant</h3>
//               </div>
//               <div className="flex gap-1">
//                 <button
//                   onPointerDown={(e) => e.stopPropagation()}
//                   onClick={() => setIsHistoryOpen((v) => !v)}
//                   className="p-2 hover:bg-white/10 rounded-full"
//                 >
//                   <MoreVertical size={20} />
//                 </button>
//                 <button
//                   onPointerDown={(e) => e.stopPropagation()}
//                   onClick={handleClose}
//                   className="p-2 hover:bg-white/10 rounded-full"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 bg-gray-50 p-6 overflow-y-auto relative">
//               <div className="flex flex-col gap-3">
//                 <div className="self-start bg-white px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-700 max-w-[85%]">
//                   Hi! I&apos;m your AI assistant. How can I help you today?
//                 </div>

//                 {messages.map((m, i) => (
//                   <div
//                     key={i}
//                     className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
//                   >
//                     <div
//                       className={`px-5 py-3.5 rounded-2xl text-sm max-w-[85%] shadow-sm ${m.role === "user" ? "bg-emerald-600 text-white rounded-tr-none" : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"}`}
//                     >
//                       {m.content}
//                     </div>
//                   </div>
//                 ))}

//                 {isSending && (
//                   <div className="flex justify-start">
//                     <TypingIndicator />
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />

//                 {messages.length === 0 && !isSending && (
//                   <div className="mt-1 flex flex-wrap gap-2 justify-start">
//                     {faqOptions.map((faq) => (
//                       <button
//                         key={faq}
//                         className="bg-white px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm"
//                         onClick={() => handleSend(faq)}
//                       >
//                         {faq}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <AnimatePresence>
//                 {isHistoryOpen && (
//                   <motion.div
//                     initial={{ x: "100%" }}
//                     animate={{ x: 0 }}
//                     exit={{ x: "100%" }}
//                     transition={{ type: "spring", stiffness: 260, damping: 28 }}
//                     className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl z-40 p-6 border-l border-gray-200 flex flex-col"
//                   >
//                     <div className="flex justify-between items-center mb-6 font-bold text-gray-800">
//                       History
//                       <button
//                         onClick={() => setIsHistoryOpen(false)}
//                         className="p-2 rounded-full hover:bg-gray-100"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                     <button
//                       onClick={handleNewChat}
//                       className="w-full py-3 border-2 border-dashed rounded-2xl text-xs mb-4 hover:border-emerald-400 hover:text-emerald-600"
//                     >
//                       + New Chat
//                     </button>
//                     <div className="flex-1 overflow-y-auto">
//                       {history.map((c) => (
//                         <div
//                           key={c.id}
//                           onClick={() => handleSelectSession(c.id)}
//                           className="p-3 bg-gray-50 rounded-xl mb-2 text-xs truncate cursor-pointer hover:bg-gray-100 transition-colors"
//                         >
//                           {c.title}
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <div className="p-4 bg-white border-t border-gray-100">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSend();
//                 }}
//                 className="relative"
//               >
//                 <input
//                   type="text"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   placeholder={isSending ? "AI is thinking..." : "Ask me..."}
//                   disabled={isSending}
//                   className="w-full bg-gray-100 py-3 px-4 pr-12 rounded-xl outline-none text-sm disabled:opacity-50"
//                 />
//                 <button
//                   type="submit"
//                   disabled={isSending || !inputValue.trim()}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-lg disabled:bg-gray-400 transition-colors"
//                 >
//                   <Send size={16} />
//                 </button>
//               </form>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

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
import ReactMarkdown from "react-markdown";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://campus-ai-backend-1.onrender.com";

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [history, setHistory] = useState<{ id: number; title: string }[]>([]);

  const [size] = useState({ width: 400, height: 550 });
  const [ready, setReady] = useState(false);

  const bubbleRef = useRef<HTMLButtonElement>(null);
  const dragControls = useDragControls();
  const isDragging = useRef(false);
  const lastBubblePos = useRef({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const safe = 16;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  // ... 其他 useEffect
  useEffect(() => {
    // 當元件被卸載時，確保解鎖網頁背景滾動
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 1. 抓取所有對話列表 (整合為一個)
  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem("token");
      if (!token || !isChatOpen) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setHistory(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Failed to fetch sessions", e);
      }
    };
    fetchSessions();
  }, [isChatOpen]);

  // 監聽視窗縮放與設備旋轉
  useEffect(() => {
    const handleResize = () => {
      // 當視窗大小改變時，叫 snap 重新計算一次當前型態的安全範圍
      snap(isChatOpen ? "panel" : "bubble");
    };

    window.addEventListener("resize", handleResize);

    // 清除監聽器，保持好習慣
    return () => window.removeEventListener("resize", handleResize);
  }, [isChatOpen]); // 依賴 isChatOpen，確保它知道當前要算面板還是球球的邊界

  // 2. 切換對話：抓取歷史訊息
  const handleSelectSession = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/sessions/${id}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        setCurrentSessionId(id);
        setIsHistoryOpen(false);
      }
    } catch (e) {
      console.error("Load messages failed", e);
    }
  };

  // const handleSend = async (textOverride?: string) => {
  //   const text = (textOverride ?? inputValue).trim();
  //   if (!text || isSending) return;

  //   setMessages((prev) => [...prev, { role: "user", content: text }]);
  //   setInputValue("");
  //   setIsSending(true);
  //   setLoadingTime(null); // 【新增】每次發送新訊息就重置時間

  //   const token = localStorage.getItem("token");
  //   const startTime = performance.now(); // 【新增】就在 fetch 發生前開始計時

  //   try {
  //     const res = await fetch(`${API_BASE_URL}/api/chat`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //       },
  //       body: JSON.stringify({
  //         message: text,
  //         sessionId: currentSessionId,
  //       }),
  //     });

  //     if (!res.ok) throw new Error(`API Error: ${res.status}`);

  //     const data = await res.json();

  //     // 【新增】資料一拿到，馬上計算時間
  //     const endTime = performance.now();
  //     const duration = (endTime - startTime) / 1000;
  //     setLoadingTime(Number(duration.toFixed(2)));

  //     const assistantMessage = {
  //       role: "assistant",
  //       content: data.answer || data.message || "I received an empty response.",
  //     };
  //     setMessages((prev) => [...prev, assistantMessage]);
  //   } catch (error) {
  //     console.error("API failed:", error);
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         role: "assistant",
  //         content: "抱歉，目前連線似乎有點問題，請稍後再試。",
  //       },
  //     ]);
  //   } finally {
  //     setIsSending(false);
  //   }
  // };

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride ?? inputValue).trim();
    if (!text || isSending) return;

    // 【修改 1】一開始只把「使用者」的訊息加進畫面，不預留 AI 的空位！
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    setInputValue("");
    setIsSending(true);
    setLoadingTime(null);

    const token = localStorage.getItem("token");
    const startTime = performance.now();
    let isFirstChunk = true; // 記錄是不是第一個字

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          message: text,
          sessionId: currentSessionId,
        }),
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      if (!res.body)
        throw new Error("ReadableStream not supported by response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // 【新增】準備一個緩衝水桶，用來裝「被切到一半」的字串
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        // 1. 如果有收到資料，解碼並加進水桶
        if (value) {
          buffer += decoder.decode(value, { stream: true });
        }

        const lines = buffer.split("\n");

        // 2. 【關鍵修復】如果還沒結束，最後一行通常被切斷了，留到下一波
        // 但如果後端說結束了 (done)，我們就不留了，把剩下的全部拿去解析！
        if (!done) {
          buffer = lines.pop() || "";
        } else {
          buffer = "";
        }

        let newTextToAdd = "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          let jsonStr = "";

          // 情況 A：標準的 "data: {...}" 格式
          if (trimmedLine.startsWith("data:")) {
            jsonStr = trimmedLine.slice(5).trim();
          } 
          // 情況 B：【關鍵修復】像截圖第一行那樣，沒穿衣服直接給 "{...}" 的格式
          else if (trimmedLine.startsWith("{") && trimmedLine.endsWith("}")) {
            jsonStr = trimmedLine;
          }

          if (jsonStr === "[DONE]") continue;

          if (jsonStr) {
            try {
              const parsed = JSON.parse(jsonStr);
              // 抓取 token
              const tokenString = parsed.token || parsed.message || parsed.answer || parsed.content || "";
              
              if (tokenString) {
                newTextToAdd += tokenString;
              }
            } catch (e) {
              console.warn("解析碎片失敗 (可忽略):", jsonStr);
            }
          }
        }

        // 3. 更新畫面
        if (newTextToAdd) {
          console.log("成功解析到文字片段:", newTextToAdd); // 👈 幫你加個 log，F12 可以看進度！

          if (isFirstChunk) {
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            setLoadingTime(Number(duration.toFixed(2)));
            isFirstChunk = false;

            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: newTextToAdd },
            ]);
          } else {
            setMessages((prev) => {
              const newMessages = [...prev];
              const lastIndex = newMessages.length - 1;
              newMessages[lastIndex] = {
                ...newMessages[lastIndex],
                content: newMessages[lastIndex].content + newTextToAdd,
              };
              return newMessages;
            });
          }
        }

        // 4. 資料真的全收完了，就安心下班跳出迴圈
        if (done) break;
      }}finally {
      setIsSending(false);
    }
  };

  // 4. 建立新對話 (刪除重複，僅保留一個邏輯完整版)
  const handleNewChat = async () => {
    if (history.length >= 5) {
      alert("目前最多只能有 5 個對話喔！");
      return;
    }

    setMessages([]);
    setCurrentSessionId(null);
    setIsHistoryOpen(false);

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: "New Chat" }),
      });

      if (res.ok) {
        const newSession = await res.json();
        setHistory([newSession, ...history]);
        setCurrentSessionId(newSession.id);
      }
    } catch (e) {
      console.error("Connect failed:", e);
    }
  };

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const getBubbleSize = () => {
    const r = bubbleRef.current?.getBoundingClientRect();
    return { w: r?.width ?? 160, h: r?.height ?? 160 };
  };

  // const snap = (mode: "bubble" | "panel") => {
  //   const vw = window.innerWidth;
  //   const vh = window.innerHeight;
  //   const targetW = mode === "panel" ? size.width : 160;
  //   const targetH = mode === "panel" ? size.height : 160;
  //   const curX = x.get();
  //   const curY = y.get();
  //   const currentW = mode === "panel" ? 160 : size.width;
  //   const centerX = curX + currentW / 2;
  //   const targetX = centerX < vw / 2 ? safe : vw - targetW - safe;
  //   const currentH = mode === "panel" ? 160 : size.height;
  //   const centerY = curY + currentH / 2;
  //   let targetY;
  //   if (mode === "bubble" && centerY > vh / 2) {
  //     targetY = vh - targetH - safe;
  //   } else {
  //     targetY = clamp(curY, safe, vh - targetH - safe);
  //   }
  //   animate(x, targetX, { type: "spring", stiffness: 360, damping: 32 });
  //   animate(y, targetY, { type: "spring", stiffness: 360, damping: 32 });
  // };

  const snap = (mode: "bubble" | "panel", velocity = { x: 0, y: 0 }) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 精準設定當前型態的寬高
    const targetW = mode === "panel" ? size.width : 160;
    const targetH = mode === "panel" ? size.height : 160;

    const { w: bubbleW, h: bubbleH } = getBubbleSize();

    const curX = x.get();
    const curY = y.get();

    // 1. X 軸邏輯：左右靠邊 + 甩動預判
    let targetX;
    if (velocity.x < -400) {
      targetX = safe; // 往左甩
    } else if (velocity.x > 400) {
      targetX = vw - targetW - safe; // 往右甩
    } else {
      // 慢速放開，依賴中心點判斷
      const centerX = curX + targetW / 2;
      targetX = centerX < vw / 2 ? safe : vw - targetW - safe;
    }

    // 2. Y 軸邏輯：面板固定底部，球球高度自由
    let targetY;
    if (mode === "panel") {
      targetY = vh - targetH - safe; // 面板統一吸到底部
    } else {
      // 球球模式：加上一點點滑動慣性，但絕對不能超出螢幕安全範圍
      const projectedY = curY + velocity.y * 0.15;
      targetY = clamp(projectedY, safe, vh - targetH - safe);
    }

    // 【新增】把甩出去的暴力初速度打個 2.5 折，避免像噴射機
    const dampenedVelX = velocity.x * 0.25;
    const dampenedVelY = velocity.y * 0.25;

    // 【修改】調降 stiffness(彈簧硬度) 到 220，調高 damping(阻力) 到 32
    animate(x, targetX, {
      type: "spring",
      stiffness: 220,
      damping: 32,
      velocity: dampenedVelX,
    });
    animate(y, targetY, {
      type: "spring",
      stiffness: 220,
      damping: 32,
      velocity: dampenedVelY,
    });
  };

  useLayoutEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { w, h } = getBubbleSize();
    x.set(vw - w - safe);
    y.set(vh - h - safe);
    setReady(true);
  }, []);

  const handleOpen = () => {
    if (isDragging.current) return;

    // 【新增】變身前，先死死記住目前的座標！
    lastBubblePos.current = { x: x.get(), y: y.get() };

    setIsChatOpen(true);
    setIsHistoryOpen(false);
    setTimeout(() => snap("panel"), 0);
  };

  const handleClose = () => {
    setIsChatOpen(false);
    setIsHistoryOpen(false);

    // 【修改】不呼叫 snap 了，直接飛回記憶中的位置
    animate(x, lastBubblePos.current.x, {
      type: "spring",
      stiffness: 300,
      damping: 28,
    });
    animate(y, lastBubblePos.current.y, {
      type: "spring",
      stiffness: 300,
      damping: 28,
    });
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
    "NHI application",
    "Lost ARC",
    "Tell me about CCU Campus",
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
      onDragEnd={(event, info) => {
        setTimeout(() => {
          isDragging.current = false;
        }, 50);
        // 把 info.velocity 傳給 snap
        snap(isChatOpen ? "panel" : "bubble", info.velocity);
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
            // 【修改這裡】預設 (手機) 是 w-28 h-28 (112px)，md (平板以上) 變回 w-40 h-40 (160px)
            className="w-28 h-28 md:w-40 md:h-40 bg-transparent flex items-center justify-center"
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
            onMouseEnter={() => {
              document.body.style.overflow = "hidden";
            }}
            onMouseLeave={() => {
              document.body.style.overflow = "";
            }}
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
                {/* <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setIsHistoryOpen((v) => !v)}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <MoreVertical size={20} />
                </button> */}
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div
              className="flex-1 bg-gray-50 p-6 overflow-y-auto relative overscroll-contain"
              onWheelCapture={(e: any) => e.stopPropagation()}
              onPointerDownCapture={(e: any) => e.stopPropagation()}
            >
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
                      className={`px-5 py-3.5 rounded-2xl text-sm max-w-[85%] shadow-sm ${m.role === "user" ? "bg-emerald-600 text-white rounded-tr-none" : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"}`}
                    >
                      {m.role === "user" ? (
                        // 使用者的訊息保持純文字即可
                        <div className="whitespace-pre-wrap">{m.content}</div>
                      ) : (
                        // AI 的訊息交給 ReactMarkdown 處理，並套用 Tailwind 樣式
                        <div className="prose prose-sm prose-emerald max-w-none flex flex-col gap-2">
                          <ReactMarkdown
                            components={{
                              // 客製化 ul (無序清單 - 點點)
                              ul: ({ node, ...props }: any) => (
                                <ul
                                  className="list-disc list-inside ml-2 space-y-1"
                                  {...props}
                                />
                              ),
                              // 客製化 ol (有序清單 - 數字)
                              ol: ({ node, ...props }: any) => (
                                <ol
                                  className="list-decimal list-inside ml-2 space-y-1"
                                  {...props}
                                />
                              ),
                              // 客製化 li (清單項目)
                              li: ({ node, ...props }: any) => (
                                <li className="leading-relaxed" {...props} />
                              ),
                              // 客製化 p (段落)
                              p: ({ node, ...props }: any) => (
                                <p className="leading-relaxed m-0" {...props} />
                              ),
                              // 客製化 a (超連結)
                              a: ({ node, ...props }: any) => (
                                <a
                                  className="text-emerald-600 underline hover:text-emerald-800 transition-colors break-all"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isSending &&
                  messages.length > 0 &&
                  messages[messages.length - 1].role === "user" && (
                    <div className="flex justify-start">
                      <TypingIndicator />
                    </div>
                  )}

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
                          onClick={() => handleSelectSession(c.id)}
                          className="p-3 bg-gray-50 rounded-xl mb-2 text-xs truncate cursor-pointer hover:bg-gray-100 transition-colors"
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
