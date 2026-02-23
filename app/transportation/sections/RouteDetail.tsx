"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRightLeft, MapPin, ExternalLink, ChevronLeft, ChevronRight, Bus, Footprints, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 假資料 ---
const IMAGES = [
  "bg-blue-100",   // Placeholder color 1
  "bg-orange-100", // Placeholder color 2
  "bg-emerald-100" // Placeholder color 3
];

const STEPS = [
  { icon: Footprints, title: "Walk to Bus Stop", desc: "Walk from Activity Center to the Main Gate bus stop (approx. 5 mins)." },
  { icon: Bus, title: "Take Bus 7309", desc: "Board the bus heading to Chiayi Train Station. (Fare: $28)" },
  { icon: Flag, title: "Arrive at Station", desc: "Get off at the terminal station. The train station is right in front of you." },
];

const RELATED_ROUTES = [
  { name: "To Minxiong Town", color: "bg-orange-100" },
  { name: "To Taoyuan Airport", color: "bg-emerald-100" },
  { name: "To Douliu City", color: "bg-purple-100" },
];

interface RouteDetailProps {
  onBack: () => void;
}

export default function RouteDetail({ onBack }: RouteDetailProps) {
  const [direction, setDirection] = useState<0 | 1>(0); // 0: CCU -> Dest, 1: Dest -> CCU
  const [currentImage, setCurrentImage] = useState(0);

  // 圖片輪播邏輯
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % IMAGES.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="w-full h-full flex flex-col relative overflow-y-auto custom-scrollbar">
      
      {/* --- Header --- */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4 flex-shrink-0">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
           <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Route Guide</div>
           <div className="text-lg font-bold text-gray-800">Transportation Advice</div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        
        {/* Left: Image Carousel (圖片輪播) */}
        <div className="w-full lg:w-5/12 aspect-[4/5] lg:aspect-square relative group rounded-3xl overflow-hidden shadow-sm border border-gray-100">
           {/* 圖片本體 */}
           <div className={`w-full h-full ${IMAGES[currentImage]} transition-colors duration-500 flex items-center justify-center`}>
              <span className="text-gray-400/50 font-bold text-2xl tracking-widest">
                IMAGE {currentImage + 1}
              </span>
           </div>

           {/* 左右切換按鈕 */}
           <button 
             onClick={prevImage}
             className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-md text-gray-600 opacity-0 group-hover:opacity-100 transition-all"
           >
             <ChevronLeft size={20} />
           </button>
           <button 
             onClick={nextImage}
             className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-md text-gray-600 opacity-0 group-hover:opacity-100 transition-all"
           >
             <ChevronRight size={20} />
           </button>

           {/* 底部點點指示器 */}
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
             {IMAGES.map((_, idx) => (
               <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentImage ? "bg-white w-4" : "bg-white/50"}`} />
             ))}
           </div>
        </div>

        {/* Right: Context & Flow (右側資訊) */}
        <div className="flex-1 flex flex-col">
           
           {/* Direction Switcher (方向切換) */}
           <div className="flex items-center justify-between mb-8">
              <span className={`text-xl font-bold transition-all ${direction === 0 ? "text-emerald-600 scale-105" : "text-gray-400"}`}>
                CCU
              </span>
              
              <button 
                onClick={() => setDirection(direction === 0 ? 1 : 0)}
                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
              >
                <ArrowRightLeft size={20} />
              </button>

              <span className={`text-xl font-bold transition-all ${direction === 1 ? "text-emerald-600 scale-105" : "text-gray-400"}`}>
                Chiayi Station
              </span>
           </div>

           {/* Context / Visual Flow (流程圖) */}
           <div className="flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
                Recommended Path
              </h3>
              
              <div className="relative pl-2 space-y-8">
                 {/* 連接線 */}
                 <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200"></div>

                 {STEPS.map((step, idx) => (
                   <div key={idx} className="relative flex gap-4 items-start group">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-emerald-600 shadow-sm z-10 group-hover:border-emerald-300 group-hover:scale-110 transition-all">
                         <step.icon size={18} />
                      </div>
                      {/* Text */}
                      <div className="flex-1 pt-1">
                         <h4 className="font-bold text-gray-800 text-base">{step.title}</h4>
                         <p className="text-sm text-gray-500 leading-relaxed mt-1">
                           {step.desc}
                         </p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* External Links */}
           <div className="flex gap-3">
              <a href="#" className="flex-1 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:border-emerald-400 hover:text-emerald-700 transition-all shadow-sm">
                 <MapPin size={16} /> Google Maps
              </a>
              <a href="#" className="flex-1 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:border-orange-400 hover:text-orange-700 transition-all shadow-sm">
                 <ExternalLink size={16} /> Nearby Spots
              </a>
           </div>

        </div>
      </div>

      {/* --- Explore More --- */}
      <div className="pt-8 border-t border-gray-100">
         <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            Explore More Routes <span className="text-gray-300 text-sm font-normal">→</span>
         </h3>
         
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {RELATED_ROUTES.map((route, idx) => (
              <div key={idx} className="group cursor-pointer">
                 <div className={`w-full aspect-video ${route.color} rounded-xl mb-2 flex items-center justify-center text-gray-400/50 text-xs font-bold`}>
                    IMG
                 </div>
                 <p className="text-xs font-bold text-gray-600 group-hover:text-emerald-600 transition-colors text-center">
                    {route.name}
                 </p>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
}