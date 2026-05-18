"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, MotionValue } from "framer-motion";
// 【修改】：把 X 換成了 VolumeX
import { VolumeX } from "lucide-react";
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

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(y, "change", (latest) => {
    setIsNearTop(latest < 120);
  });

  useMotionValueEvent(x, "change", (latest) => {
    setIsNearLeft(latest < 300);
  });

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (isMuted || isChatOpen) {
      setIsVisible(false);
      return;
    }

    const scheduleNextMessage = (delay: number) => {
      timerRef.current = setTimeout(() => {
        const routeMessage = PHRASES.routes[pathname as keyof typeof PHRASES.routes];
        const useRouteMessage = routeMessage && Math.random() > 0.5;

        if (useRouteMessage) {
          setCurrentText(routeMessage);
        } else {
          const randomGeneral = PHRASES.general[Math.floor(Math.random() * PHRASES.general.length)];
          setCurrentText(randomGeneral);
        }

        setIsVisible(true);

        timerRef.current = setTimeout(() => {
          setIsVisible(false);
          scheduleNextMessage(Math.random() * 10000 + 15000); 
        }, 5000);

      }, delay);
    };

    scheduleNextMessage(2000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, isMuted, isChatOpen]);

  const yClass = isNearTop ? "top-[105%]" : "bottom-[100%]";
  const xClass = isNearLeft ? "left-[30%]" : "right-[50%]";
  const positionClasses = `${yClass} ${xClass}`;

  const tailY = isNearTop 
    ? "-top-[9px] border-t-2 border-l-2 border-dashed border-[#eadfce]" 
    : "-bottom-[9px] border-b-2 border-r-2 border-dashed border-[#eadfce]";
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
          className={`absolute ${positionClasses} w-max max-w-[300px] min-w-[180px] bg-white px-5 py-3 rounded-2xl shadow-lg border-2 border-dashed border-[#eadfce] pointer-events-auto z-50`}
          // 【修復點 1】：拿掉 Capture，讓內層的按鈕能優先接收到點擊事件！
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 靜音按鈕 */}
          <button 
            title="Mute notifications"
            // 【修復點 2】：改用 onPointerDown，確保手指一碰到就立刻觸發靜音並消失
            onPointerDown={(e) => {
              e.stopPropagation();
              setIsVisible(false);
              setIsMuted(true);
            }}
            className="absolute -top-3 -right-3 bg-white border border-[#eadfce] shadow-sm hover:bg-gray-100 hover:text-gray-700 text-gray-400 rounded-full p-1.5 transition-colors z-10 cursor-pointer"
          >
            <VolumeX size={14} />
          </button>
          
          <p className="text-[15px] text-gray-700 font-medium leading-relaxed relative z-10">
            {currentText}
          </p>
          
          <div className={`absolute ${tailClasses} w-4 h-4 bg-white transform rotate-45`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}