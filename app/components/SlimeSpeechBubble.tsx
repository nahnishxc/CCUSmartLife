"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, MotionValue } from "framer-motion";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

const PHRASES = {
  general: [
    "Poke me, I dare you!",
    "I'm not fat, I'm just well-rounded.",
    "Need any help with CCU life?",
    "It's a beautiful day in Minxiong!",
    "Give me a question about CCU!",
    "Ask anything, any time.",
    "Encountering a problem? Ask me!"
  ],
  routes: {
    "/food": "Craving something? I know the best spots around CCU! 🍔",
    "/transport": "Don't miss the 106 bus! Want me to check the schedule? 🚌",
    "/clinic": "Not feeling well? I can find nearby clinics for you. 🏥",
  }
};

export default function SlimeSpeechBubble({ 
  isChatOpen, 
  x, 
  y 
}: { 
  isChatOpen: boolean;
  x: MotionValue<number>; 
  y: MotionValue<number>;
}) {
  const pathname = usePathname();
  const [currentText, setCurrentText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false);
  const [isNearLeft, setIsNearLeft] = useState(false);

  // 用來儲存計時器，確保切換頁面或卸載時能清得乾乾淨淨
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(y, "change", (latest) => {
    setIsNearTop(latest < 120);
  });

  useMotionValueEvent(x, "change", (latest) => {
    setIsNearLeft(latest < 300);
  });

  useEffect(() => {
    // 每次狀態改變前，先清空所有計時器
    if (timerRef.current) clearTimeout(timerRef.current);

    if (isMuted || isChatOpen) {
      setIsVisible(false);
      return;
    }

    // 負責排程下一次對話的函式
    const scheduleNextMessage = (delay: number) => {
      timerRef.current = setTimeout(() => {
        // 1. 決定要講什麼
        const routeMessage = PHRASES.routes[pathname as keyof typeof PHRASES.routes];
        const useRouteMessage = routeMessage && Math.random() > 0.5;

        if (useRouteMessage) {
          setCurrentText(routeMessage);
        } else {
          const randomGeneral = PHRASES.general[Math.floor(Math.random() * PHRASES.general.length)];
          setCurrentText(randomGeneral);
        }

        // 2. 顯示對話框
        setIsVisible(true);

        // 3. 安排 5 秒後關閉對話框，並啟動下一輪的等待
        timerRef.current = setTimeout(() => {
          setIsVisible(false);
          // 下一次出現的時間：15秒 ~ 25秒之間的隨機值
          scheduleNextMessage(Math.random() * 10000 + 15000); 
        }, 5000);

      }, delay);
    };

    // 進入頁面後，第一次延遲 2 秒出現
    scheduleNextMessage(2000);

    // Cleanup function：元件卸載或依賴改變時清除計時器
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, isMuted, isChatOpen]);

  const yClass = isNearTop ? "top-[105%]" : "bottom-[100%]";
  const xClass = isNearLeft ? "left-[30%]" : "right-[50%]";
  const positionClasses = `${yClass} ${xClass}`;

  const tailY = isNearTop ? "-top-2 border-t border-l" : "-bottom-2 border-b border-r";
  const tailX = isNearLeft ? "left-8" : "right-8";
  const tailClasses = `${tailY} ${tailX}`;

  return (
    <AnimatePresence>
      {isVisible && !isChatOpen && !isMuted && (
        <motion.div
          initial={{ opacity: 0, y: isNearTop ? -10 : 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: isNearTop ? -5 : 5, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`absolute ${positionClasses} w-max max-w-[300px] min-w-[180px] bg-white px-5 py-3 rounded-2xl shadow-lg border border-gray-100 pointer-events-auto z-50`}
          onPointerDownCapture={(e) => e.stopPropagation()}
          onClickCapture={(e) => e.stopPropagation()}
        >
          <button 
            onPointerDownCapture={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
              setIsMuted(true);
            }}
            className="absolute -top-2 -right-2 bg-gray-200 hover:bg-red-400 hover:text-white text-gray-500 rounded-full p-1 transition-colors"
          >
            <X size={13} />
          </button>
          
          <p className="text-[15px] text-gray-700 font-medium leading-relaxed">
            {currentText}
          </p>
          
          <div className={`absolute ${tailClasses} w-4 h-4 bg-white transform rotate-45 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}