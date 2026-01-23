"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";

// 引入子頁面元件
import About from "./CampusItem/About";
import Administrative from "./CampusItem/Administrative";
import Academic from "./CampusItem/Academic";
import Facilities from "./CampusItem/Facilities";

// --- 假資料：Banner 圖片 ---
const BANNER_IMAGES = [
  "bg-emerald-200", 
  "bg-blue-200",    
  "bg-orange-200",  
];

interface CampusViewProps {
  subTab: string;
}

export default function Campus({ subTab }: CampusViewProps) {
  const [currentView, setCurrentView] = useState<string>("LANDING");

  useEffect(() => {
    if (subTab === "Campus Map") {
       setCurrentView("LANDING"); 
    } else if (subTab !== "About CCU") {
       setCurrentView(subTab);
    } else {
       setCurrentView("LANDING");
    }
  }, [subTab]);

  const handleBack = () => {
    setCurrentView("LANDING");
  };

  return (
    // 外層容器：改為透明或與背景一致，因為 Banner 要自己有圓角
    <div className="w-full h-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative">
      
      <AnimatePresence mode="wait">
        
        {/* === VIEW: LANDING PAGE === */}
        {currentView === "LANDING" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full h-full flex flex-col overflow-y-auto custom-scrollbar p-6" // 加入 p-6 讓內容不要貼邊，讓圓角明顯
          >
            {/* 1. Hero Banner Carousel */}
            {/* 修改：Banner 本身加入 rounded-3xl 和 overflow-hidden，實現圓角 */}
            <div className="rounded-3xl overflow-hidden shadow-sm mb-8 shrink-0">
               <BannerCarousel onBannerClick={() => setCurrentView("About CCU")} />
            </div>

            {/* 2. Navigation Image Cards */}
            <div className="w-full">
              
              {/* 分隔線標題 (Optional, 依照你的圖可以保留或移除) */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px bg-gray-200 w-16"></div>
                <h3 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">
                  Explore Campus
                </h3>
                <div className="h-px bg-gray-200 w-16"></div>
              </div>

              {/* 卡片區：改為大圖 + 下方文字包在一起 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ImageNavCard 
                  title="Administrative" 
                  subtitle="Offices & Services"
                  imageColor="bg-blue-100" 
                  onClick={() => setCurrentView("Administrative")}
                />
                <ImageNavCard 
                  title="Academic Units" 
                  subtitle="Colleges & Departments"
                  imageColor="bg-emerald-100"
                  onClick={() => setCurrentView("Academic")}
                />
                <ImageNavCard 
                  title="Facilities" 
                  subtitle="Sports & Dormitories"
                  imageColor="bg-orange-100"
                  onClick={() => setCurrentView("Facilities")}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* === VIEW: SUB-PAGES (Content) - 保持不變 === */}
        {currentView !== "LANDING" && (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full h-full flex flex-col bg-white"
          >
            <div className="flex items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <div className="h-6 w-px bg-gray-200 mx-4"></div>
              <span className="text-gray-800 font-bold text-lg">{currentView}</span>
            </div>

            <div className="flex-1 overflow-hidden">
              {currentView === "About CCU" && <About />}
              {currentView === "Administrative" && <Administrative />}
              {currentView === "Academic" && <Academic />}
              {currentView === "Facilities" && <Facilities />}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// --- 元件：Banner (內容保持不變，因為外層包了 div 做圓角) ---
function BannerCarousel({ onBannerClick }: { onBannerClick: () => void }) {
  const [index, setIndex] = useState(0);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
  };
  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      onClick={onBannerClick}
      className="relative w-full h-[320px] md:h-[380px] cursor-pointer group"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${BANNER_IMAGES[index]} bg-cover bg-center`}
        >
          {/* 漸層陰影：稍微加重一點點底部，讓白色字體在任何圖片上都清楚 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-10">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
                CCU SmartLife
              </h1>
              <p className="text-white/90 text-sm md:text-lg font-light flex items-center gap-2 drop-shadow-sm">
                Discover National Chung Cheng University <ArrowRight size={16}/>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-10">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 z-10">
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 right-8 flex gap-2 z-10">
        {BANNER_IMAGES.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-2 bg-white/50"}`}/>
        ))}
      </div>
    </div>
  );
}

// --- 元件：圖片導航卡片 (新設計：一體成形大卡片) ---
function ImageNavCard({ title, subtitle, imageColor, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      // 修改：這裡加入了 border 和 bg-white，讓整張卡片變成一個實體
      // 移除之前的 w-full aspect-[4/3] 限制，改用 h-[240px] 固定圖片高度，讓卡片更大張
      className="group cursor-pointer flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 h-full"
    >
      {/* 圖片區域 (上半部) */}
      <div className={`w-full h-[200px] md:h-[240px] ${imageColor} relative overflow-hidden`}>
         {/* 圖片 hover 放大效果 */}
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10" />
         
         <div className="w-full h-full flex items-center justify-center text-gray-400/30 font-bold text-3xl tracking-widest group-hover:scale-105 transition-transform duration-700">
            IMAGE
         </div>
      </div>

      {/* 文字區域 (下半部，包在同一個卡片裡) */}
      <div className="p-5 text-center flex flex-col justify-center flex-1 bg-gray-50/50 group-hover:bg-white transition-colors">
        <h4 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
          {title}
        </h4>
        <p className="text-sm text-gray-400 mt-1 font-medium tracking-wide">
          {subtitle}
        </p>
        
        {/* 裝飾線條，增加精緻感 */}
        <div className="h-1 w-10 bg-gray-200 rounded-full mx-auto mt-4 group-hover:w-16 group-hover:bg-emerald-300 transition-all duration-300" />
      </div>
    </div>
  );
}