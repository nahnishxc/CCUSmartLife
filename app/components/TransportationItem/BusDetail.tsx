"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRightLeft, ExternalLink, ChevronDown, Bus, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. 定義資料結構 ---
interface RouteInfo {
  id: string;
  name: string; // e.g., "Chiayi - CCU"
  firstBus: string;
  lastBus: string;
}

interface Stop {
  name: string;
  time: number | "Departed" | "Pit"; // 分鐘數, 或已離站, 或進站中
  isKeyStop?: boolean; // 是否為重點站
}

// --- 2. 假資料 ---
const ROUTES: Record<string, RouteInfo> = {
  "7309": { id: "7309", name: "Chiayi - CCU (via Minxiong)", firstBus: "05:55", lastBus: "18:45" },
  "7306": { id: "7306", name: "Meishan - Chiayi", firstBus: "06:10", lastBus: "17:30" },
  "106": { id: "106", name: "Chiayi Station - High Speed Rail", firstBus: "06:00", lastBus: "22:00" },
};

// 模擬去程站點 (To Nanhua)
const STOPS_OUTBOUND: Stop[] = [
  { name: "Chiayi Train Station", time: "Departed", isKeyStop: true },
  { name: "Central Fountain", time: "Departed" },
  { name: "Chiayi Park", time: "Departed" },
  { name: "Minxiong Station", time: 5, isKeyStop: true },
  { name: "Minxiong Elementary School", time: 7 },
  { name: "National Chung Cheng Univ.", time: 12, isKeyStop: true },
  { name: "Activity Center", time: 14 },
  { name: "Nanhua University", time: 20, isKeyStop: true },
];

// 模擬回程站點 (To Daya Stop)
const STOPS_INBOUND: Stop[] = [
  { name: "Nanhua University", time: "Departed", isKeyStop: true },
  { name: "National Chung Cheng Univ.", time: 2, isKeyStop: true },
  { name: "Minxiong Station", time: 15, isKeyStop: true },
  { name: "Chiayi Train Station", time: 35, isKeyStop: true },
];

interface BusDetailProps {
  onBack: () => void;
}

export default function BusDetail({ onBack }: BusDetailProps) {
  const [selectedRouteId, setSelectedRouteId] = useState("7309");
  const [direction, setDirection] = useState<0 | 1>(0); // 0: 去程, 1: 回程
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentRoute = ROUTES[selectedRouteId];
  const currentStops = direction === 0 ? STOPS_OUTBOUND : STOPS_INBOUND;

  // 篩選出 Key Stops 用於上方表格顯示
  const keyStops = currentStops.filter(s => s.isKeyStop).slice(0, 4); 

  return (
    <div className="w-full h-full flex flex-col">
      
      {/* --- Header: 返回 & 標題 --- */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
           <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bus Real Time</div>
           <div className="text-lg font-bold text-gray-800">{currentRoute.name}</div>
        </div>
      </div>

      {/* --- Control Panel: 路線選擇 & 資訊 --- */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        
        {/* 左側：路線選擇與基本資訊 */}
        <div className="flex-1">
          {/* 路線下拉選單 */}
          <div className="relative mb-4 z-20">
             <button 
               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               className="flex items-center gap-2 text-4xl font-black text-gray-800 hover:text-emerald-600 transition-colors"
             >
               {selectedRouteId}
               <ChevronDown size={24} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
             </button>
             
             <AnimatePresence>
               {isDropdownOpen && (
                 <motion.div
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
                 >
                    {Object.values(ROUTES).map(route => (
                      <button
                        key={route.id}
                        onClick={() => {
                          setSelectedRouteId(route.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center justify-between ${selectedRouteId === route.id ? "text-emerald-600 font-bold bg-emerald-50/50" : "text-gray-600"}`}
                      >
                        <span>{route.id}</span>
                        <span className="text-xs text-gray-400 font-normal truncate max-w-[120px]">{route.name}</span>
                      </button>
                    ))}
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          <div className="space-y-1 text-sm text-gray-600 font-medium">
             <p>First Bus: <span className="text-gray-900">{currentRoute.firstBus}</span></p>
             <p>Last Bus: <span className="text-gray-900">{currentRoute.lastBus}</span></p>
          </div>
          
          <a href="#" className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-emerald-600 hover:underline">
             iBus Information System Link <ExternalLink size={12}/>
          </a>
        </div>

        {/* 右側：方向切換 & 關鍵站點表 */}
        <div className="flex-[1.5] flex flex-col gap-4">
           {/* 方向切換按鈕 */}
           <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setDirection(0)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                  direction === 0 ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                To Nanhua Univ.
              </button>
              <ArrowRightLeft size={16} className="text-gray-400" />
              <button 
                onClick={() => setDirection(1)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                  direction === 1 ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                To Daya Stop
              </button>
           </div>

           {/* 關鍵站點表格 (Key Stops Arrival Times) */}
           <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-100/50 px-4 py-2 border-b border-gray-200/50 text-xs font-bold text-gray-500 text-center">
                 Key Stops Arrival Times
              </div>
              <div className="grid grid-cols-4 divide-x divide-gray-200/50">
                 {keyStops.map((stop, idx) => (
                   <div key={idx} className="p-2 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-gray-500 font-medium line-clamp-1 mb-1" title={stop.name}>
                        {stop.name.replace("National Chung Cheng Univ.", "CCU").replace("Train Station", "Station")}
                      </span>
                      <span className={`text-sm font-bold ${typeof stop.time === 'number' ? "text-emerald-600" : "text-gray-400"}`}>
                        {typeof stop.time === 'number' ? `${stop.time} min` : "Passed"}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* --- Route Map: 垂直時間軸 (The "Snake" Map converted to List) --- */}
      <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-6 overflow-y-auto custom-scrollbar">
         <div className="relative pl-4 space-y-8">
            {/* 垂直連線 */}
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

            {currentStops.map((stop, index) => {
               const isArriving = typeof stop.time === 'number' && stop.time <= 5;
               const hasDeparted = stop.time === "Departed";
               
               return (
                 <div key={index} className="relative flex items-center gap-4 z-10 group">
                    {/* 圓點指示器 */}
                    <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors ${
                       isArriving ? "bg-emerald-500 border-emerald-200 ring-4 ring-emerald-100" :
                       hasDeparted ? "bg-gray-300 border-gray-300" : 
                       "bg-white border-gray-400"
                    }`}></div>

                    {/* 站點內容 */}
                    <div className="flex-1 flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-emerald-100 cursor-default">
                       <span className={`font-bold text-sm ${hasDeparted ? "text-gray-400" : "text-gray-800"}`}>
                          {index + 1}. {stop.name}
                       </span>
                       
                       <div className="flex items-center gap-2">
                          {isArriving && (
                             <span className="flex items-center gap-1 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold animate-pulse">
                                <Bus size={10} /> Coming
                             </span>
                          )}
                          <span className={`font-mono font-bold text-sm ${
                             typeof stop.time === 'number' ? (stop.time <= 5 ? "text-red-500" : "text-emerald-600") : "text-gray-400"
                          }`}>
                             {typeof stop.time === 'number' ? `${stop.time} min` : "Departed"}
                          </span>
                       </div>
                    </div>
                 </div>
               );
            })}
         </div>
      </div>

    </div>
  );
}