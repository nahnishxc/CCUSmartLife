"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, MotionValue } from "framer-motion";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

const PHRASES = {
  general: [
    "Poke me, I dare you.",
    "I'm not fat, I'm just well-rounded.",
    "Need any help with CCU life?",
    "It's a beautiful day in Minxiong!",
    "Give me a qusetion about CCU!",
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
  x, // 接收 x
  y 
}: { 
  isChatOpen: boolean;
  x: MotionValue<number>; // 新增 x 型別
  y: MotionValue<number>;
}) {
  const pathname = usePathname();
  const [currentText, setCurrentText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false);
  const [isNearLeft, setIsNearLeft] = useState(false); // 偵測是否靠左

  // 監聽 Y 座標
  useMotionValueEvent(y, "change", (latest) => {
    setIsNearTop(latest < 120);
  });

  // 監聽 X 座標 (配合你的 max-w-[300px]，把碰撞距離設為 300)
  useMotionValueEvent(x, "change", (latest) => {
    setIsNearLeft(latest < 300);
  });

  useEffect(() => {
    if (isMuted || isChatOpen) {
      setIsVisible(false);
      return;
    }

    const showRandomMessage = () => {
      const routeMessage = PHRASES.routes[pathname as keyof typeof PHRASES.routes];
      const useRouteMessage = routeMessage && Math.random() > 0.5;

      if (useRouteMessage) {
        setCurrentText(routeMessage);
      } else {
        const randomGeneral = PHRASES.general[Math.floor(Math.random() * PHRASES.general.length)];
        setCurrentText(randomGeneral);
      }

      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    };

    const initialTimer = setTimeout(showRandomMessage, 2000);
    const loopTimer = setInterval(() => {
      if (Math.random() > 0.3) showRandomMessage();
    }, Math.random() * 10000 + 15000); 

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopTimer);
    };
  }, [pathname, isMuted, isChatOpen]);

  // 【動態定位】保留你調的 120% 和 100%，加上左右翻轉邏輯
const yClass = isNearTop ? "top-[105%]" : "bottom-[100%]";
  const xClass = isNearLeft ? "left-[30%]" : "right-[50%]";
  const positionClasses = `${yClass} ${xClass}`;

  // 【動態尾巴】上下左右聰明翻轉
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