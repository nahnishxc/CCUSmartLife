

// "use client";

// import { useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import useSWR from "swr";
// import { ArrowLeft, ArrowRightLeft, ExternalLink, ChevronDown, Bus } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- 1. 定義完全符合 API 清單的資料結構 ---
// interface BusStop {
//   stopName: string;
//   stopNameEn: string;
//   estimateTime: number | null;
//   arrivalTime: string;
//   status: number;
//   isKeyStop: boolean;
// }

// interface BusDetailProps {
//   onBack: () => void;
// }

// // --- 補充：靜態路線資訊 ---
// const ROUTE_INFO: Record<string, any> = {
//   "7309": {
//     name: "Chiayi - CCU",
//     first: "05:55",
//     last: "18:45",
//     dir0: "to Nanhua University",
//     dir1: "to Daya Stop",
//   },
//   "7306": {
//     name: "Meishan - Minxiong",
//     first: "06:10",
//     last: "17:30",
//     dir0: "to CCU",
//     dir1: "to Meishan",
//   },
//   "106": {
//     name: "THSR Chiayi - CCU",
//     first: "06:00",
//     last: "22:00",
//     dir0: "to CCU",
//     dir1: "to THSR Chiayi",
//   },
// };

// // --- 定義 SWR 的抓取邏輯 (攜帶 Token) ---
// const fetcher = async (url: string) => {
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
//   const response = await fetch(url, {
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
//   if (!response.ok) throw new Error("Network response was not ok");
//   return response.json();
// };

// export default function BusDetail({ onBack }: BusDetailProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const selectedRouteId = searchParams.get("busRoute") || "7309";
//   const direction = parseInt(searchParams.get("dir") || "0") as 0 | 1;
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const updateUrlState = (route: string, dir: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("busRoute", route);
//     params.set("dir", dir.toString());
//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   const currentRouteData = ROUTE_INFO[selectedRouteId] || ROUTE_INFO["7309"];

//   const { data, isLoading } = useSWR(
//     `https://campus-ai-backend-1.onrender.com/api/traffic/buses/${selectedRouteId}/estimated-time-of-arrival?direction=${direction}`,
//     fetcher,
//     {
//       refreshInterval: 30000, 
//       revalidateOnFocus: true, 
//     }
//   );

//   const stops: BusStop[] = data?.stops || [];
//   const keyStops = stops.filter((s) => s.isKeyStop).slice(0, 4);

//   const renderStatus = (stop: BusStop) => {
//     if (stop.estimateTime !== null) return `${stop.estimateTime} min`;
//     switch (stop.status) {
//       case 2: return "Starting Soon";
//       case 3: return "Skip";
//       case 4: return "Final Passed";
//       case 5: return "No Service";
//       default: return "Departed";
//     }
//   };

//   return (
//     <div className="w-full h-full bg-white rounded-3xl p-4 md:p-8 pt-16 md:pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
//       {/* --- Header --- */}
//       <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4 flex-shrink-0">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </button>
//         <div>
//           <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bus Real Time</div>
//           <div className="text-xl font-black text-gray-800">Route {selectedRouteId}</div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-8 bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex-shrink-0">
        
//         {/* 左半部 (選單與基本資訊) */}
//         <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col justify-center relative">
          
//           <div className="relative mb-4 z-20">
//             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Select Route</span>
//             <button 
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="flex items-center justify-between w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
//             >
//               <span className="text-3xl font-black text-gray-800">{selectedRouteId}</span>
//               <ChevronDown size={24} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
//             </button>
            
//             <AnimatePresence>
//               {isDropdownOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
//                 >
//                   {["7309", "7306", "106"].map(id => (
//                     <button
//                       key={id}
//                       onClick={() => {
//                         updateUrlState(id, direction); 
//                         setIsDropdownOpen(false);
//                       }}
//                       className={`w-full text-left px-5 py-3 transition-colors ${selectedRouteId === id ? "bg-emerald-50 text-emerald-600 font-black" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 font-bold"}`}
//                     >
//                       {id}
//                     </button>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <div className="space-y-2 mb-4">
//             <h3 className="text-lg font-black text-gray-900 tracking-tight">{currentRouteData.name}</h3>
//             <div className="flex gap-5 text-sm font-semibold mt-2">
//               <p className="text-gray-500">First Bus : <span className="text-gray-900 ml-1">{currentRouteData.first}</span></p>
//               <p className="text-gray-500">Last Bus : <span className="text-gray-900 ml-1">{currentRouteData.last}</span></p>
//             </div>
//           </div>
          
//           <a href="https://www.taiwanbus.tw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 hover:text-emerald-700 hover:underline w-fit">
//             iBus Information System Link <ExternalLink size={14}/>
//           </a>
//         </div>

//         {/* 右半部 (方向切換與重要站點) */}
//         {/* 加入 min-w-0 確保它在 flex 容器中能夠乖乖縮小，不會撐破版面 */}
//         <div className="flex-1 flex flex-col gap-4 justify-center min-w-0 w-full">
          
//           <div className="flex flex-row items-center gap-2 md:gap-3">
//              <button 
//                onClick={() => updateUrlState(selectedRouteId, 0)}
//                className={`flex-1 py-3 px-2 md:px-4 rounded-xl text-xs md:text-sm font-bold transition-all border-2 break-words leading-tight min-h-[52px] ${direction === 0 ? "bg-gray-200 border-gray-300 text-gray-800 shadow-inner" : "bg-white border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600"}`}
//              >
//                {currentRouteData.dir0}
//              </button>
//              <ArrowRightLeft size={20} className="text-gray-300 flex-shrink-0" />
//              <button 
//                onClick={() => updateUrlState(selectedRouteId, 1)}
//                className={`flex-1 py-3 px-2 md:px-4 rounded-xl text-xs md:text-sm font-bold transition-all border-2 break-words leading-tight min-h-[52px] ${direction === 1 ? "bg-gray-200 border-gray-300 text-gray-800 shadow-inner" : "bg-white border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600"}`}
//              >
//                {currentRouteData.dir1}
//              </button>
//           </div>

//           {/* 🔴 重要站點表格優化：拿掉橫向捲軸，用字體壓縮策略直接塞滿 4 格 */}
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full">
//              <div className="bg-gray-50 px-2 md:px-4 py-2 border-b border-gray-200 text-[9px] md:text-[10px] font-bold text-gray-500 text-center uppercase tracking-wider">
//                 Key Stops Arrival Times
//              </div>
             
//              <div className="grid grid-cols-4 divide-x divide-gray-200 bg-white w-full">
//                 {keyStops.length > 0 ? keyStops.map((stop, idx) => {
//                   // 把冗長的單字縮寫，幫手機螢幕爭取更多空間
//                   const shortName = stop.stopNameEn
//                     .replace("National Chung Cheng University", "CCU")
//                     .replace("Railway Station", "Station");

//                   return (
//                     // 縮小 padding (p-1.5)，讓文字有更多發揮空間
//                     <div key={idx} className="p-1.5 md:p-3 flex flex-col items-center justify-center text-center">
//                        <span className="text-[9px] md:text-xs text-gray-700 font-bold line-clamp-3 mb-1.5 min-h-[2.5rem] flex items-center justify-center leading-tight tracking-tighter break-words px-0.5">
//                          {shortName}
//                        </span>
//                        <span className={`text-[10px] md:text-sm font-black tracking-tighter ${stop.estimateTime !== null ? "text-emerald-600" : "text-gray-400"}`}>
//                          {renderStatus(stop)}
//                        </span>
//                     </div>
//                   );
//                 }) : (
//                   <div className="col-span-4 py-6 text-center text-sm font-bold text-gray-400">No Key Stop Data</div>
//                 )}
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* --- Real-time Route Map --- */}
//       <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-4 md:p-6 overflow-y-auto custom-scrollbar">
//           {isLoading && stops.length === 0 ? (
//             <div className="flex items-center justify-center h-full font-bold text-gray-400">Loading Live Data...</div>
//           ) : (
//             <div className="relative pl-4 space-y-8">
//               <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

//               {stops.map((stop, index) => {
//                 const isArriving = stop.estimateTime !== null && stop.estimateTime <= 2;
//                 const hasDeparted = stop.estimateTime === null && stop.status === 1;
                
//                 return (
//                   <div key={index} className="relative flex items-center gap-4 z-10 group">
//                     <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors ${
//                         isArriving ? "bg-emerald-500 border-emerald-200 ring-4 ring-emerald-100" :
//                         hasDeparted ? "bg-gray-300 border-gray-300" : "bg-white border-gray-400"
//                     }`}></div>

//                     <div className="flex-1 flex items-center justify-between p-2 md:p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-emerald-100">
//                         <div className="flex flex-col pr-2">
//                           <span className={`font-bold text-xs md:text-sm leading-tight ${hasDeparted ? "text-gray-400" : "text-gray-800"}`}>
//                             {index + 1}. {stop.stopNameEn}
//                           </span>
//                           <span className="text-[10px] md:text-xs font-medium text-gray-500 mt-0.5">{stop.arrivalTime || "--:--"}</span>
//                         </div>
                        
//                         <div className="flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-2 flex-shrink-0">
//                            {isArriving && (
//                                <span className="flex items-center gap-1 text-[10px] md:text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold animate-pulse">
//                                  <Bus size={12} /> <span className="hidden sm:inline">Arriving</span>
//                                </span>
//                            )}
//                            <span className={`font-mono font-bold text-xs md:text-sm text-right ${
//                                stop.estimateTime !== null ? (stop.estimateTime <= 2 ? "text-red-500" : "text-emerald-600") : "text-gray-400"
//                            }`}>
//                                {renderStatus(stop)}
//                            </span>
//                         </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { ArrowLeft, ArrowRightLeft, ExternalLink, ChevronDown, Bus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. 定義完全符合 API 清單的資料結構 ---
interface BusStop {
  stopName: string;
  stopNameEn: string;
  estimateTime: number | null;
  arrivalTime: string;
  status: number;
  isKeyStop: boolean;
}

interface BusDetailProps {
  onBack: () => void;
}

// --- 補充：靜態路線資訊 ---
const ROUTE_INFO: Record<string, any> = {
  "7309": {
    name: "Chiayi - CCU",
    first: "05:55",
    last: "18:45",
    dir0: "to Nanhua University",
    dir1: "to Daya Stop",
  },
  "7306": {
    name: "Meishan - Minxiong",
    first: "06:10",
    last: "17:30",
    dir0: "to CCU",
    dir1: "to Meishan",
  },
  "106": {
    name: "THSR Chiayi - CCU",
    first: "06:00",
    last: "22:00",
    dir0: "to CCU",
    dir1: "to THSR Chiayi",
  },
};

const fetcher = async (url: string) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export default function BusDetail({ onBack }: BusDetailProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedRouteId = searchParams.get("busRoute") || "7309";
  const direction = parseInt(searchParams.get("dir") || "0") as 0 | 1;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const updateUrlState = (route: string, dir: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("busRoute", route);
    params.set("dir", dir.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const currentRouteData = ROUTE_INFO[selectedRouteId] || ROUTE_INFO["7309"];

  const { data, isLoading } = useSWR(
    `https://campus-ai-backend-1.onrender.com/api/traffic/buses/${selectedRouteId}/estimated-time-of-arrival?direction=${direction}`,
    fetcher,
    {
      refreshInterval: 30000, 
      revalidateOnFocus: true, 
    }
  );

  const stops: BusStop[] = data?.stops || [];
  const keyStops = stops.filter((s) => s.isKeyStop).slice(0, 4);

  const renderStatus = (stop: BusStop) => {
    if (stop.estimateTime !== null) return `${stop.estimateTime} min`;
    switch (stop.status) {
      case 2: return "Starting Soon";
      case 3: return "Skip";
      case 4: return "Final Passed";
      case 5: return "No Service";
      default: return "Departed";
    }
  };

  return (
    // 【背板指定】修改為 bg-[#fffdf8]，套用米灰邊框與手帳暖陰影
    <div className="w-full h-full bg-[#fffdf8] rounded-[32px] p-4 md:p-8 pt-8 md:pt-8 shadow-[0_10px_30px_rgba(90,70,40,0.06)] border border-[#eadfce] flex flex-col overflow-y-auto custom-scrollbar">
      
      {/* --- Header --- */}
      {/* 將原本的實線改為手帳感虛線分隔 */}
      <div className="flex items-center gap-4 mb-6 border-b-2 border-dashed border-[#eadfce]/60 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          // 返回按鈕同步換成精緻紙質標籤外觀
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fffefb] border border-[#eadfce] text-gray-600 font-bold text-sm shadow-sm hover:shadow-md hover:text-emerald-700 hover:bg-[#fbf8f1] transition-all"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div>
          <div className="text-xs text-[#6f7b76] font-bold uppercase tracking-wider">Bus Real Time</div>
          <div className="text-xl font-black text-gray-800">Route {selectedRouteId}</div>
        </div>
      </div>

      {/* 中段資訊綜合卡片：【卡片指定】修改為 bg-[#fffefb] 與米灰框線 */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-8 bg-[#fffefb] p-4 md:p-6 rounded-2xl border border-[#eadfce] shadow-sm flex-shrink-0">
        
        {/* 左半部 (選單與基本資訊) */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col justify-center relative">
          
          <div className="relative mb-4 z-20">
            <span className="text-[10px] font-bold text-[#6f7b76] uppercase tracking-wider mb-2 block">Select Route</span>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              // 選單下拉按鈕改為溫潤米白底色與米灰邊框
              className="flex items-center justify-between w-full px-5 py-3 bg-[#fffdf8] border-2 border-[#eadfce] rounded-xl hover:border-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
            >
              <span className="text-3xl font-black text-gray-800">{selectedRouteId}</span>
              <ChevronDown size={24} className="text-[#6f7b76] transition-transform duration-200" style={{ transform: isDropdownOpen ? "rotate(180deg)" : "none" }} />
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-full bg-[#fffefb] rounded-xl shadow-xl border border-[#eadfce] overflow-hidden py-2"
                >
                  {["7309", "7306", "106"].map(id => (
                    <button
                      key={id}
                      onClick={() => {
                        updateUrlState(id, direction); 
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 transition-colors ${selectedRouteId === id ? "bg-emerald-50 text-emerald-700 font-black" : "text-[#6f7b76] hover:bg-emerald-50/50 hover:text-emerald-700 font-bold"}`}
                    >
                      {id}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">{currentRouteData.name}</h3>
            <div className="flex gap-5 text-sm font-semibold mt-2">
              <p className="text-[#6f7b76]">First Bus : <span className="text-gray-900 ml-1">{currentRouteData.first}</span></p>
              <p className="text-[#6f7b76]">Last Bus : <span className="text-gray-900 ml-1">{currentRouteData.last}</span></p>
            </div>
          </div>
          
          <a href="https://www.taiwanbus.tw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 hover:text-emerald-700 hover:underline w-fit">
            iBus Information System Link <ExternalLink size={14}/>
          </a>
        </div>

        {/* 右半部 (方向切換與重要站點) */}
        <div className="flex-1 flex flex-col gap-4 justify-center min-w-0 w-full">
          
          <div className="flex flex-row items-center gap-2 md:gap-3">
             <button 
               onClick={() => updateUrlState(selectedRouteId, 0)}
               // 未選中狀態改為 bg-[#fffefb] 與米灰框線
               className={`flex-1 py-3 px-2 md:px-4 rounded-xl text-xs md:text-sm font-bold transition-all border-2 break-words leading-tight min-h-[52px] ${direction === 0 ? "bg-[#eadfce]/50 border-[#eadfce] text-gray-800 shadow-inner" : "bg-[#fffefb] border-[#eadfce] text-[#6f7b76] hover:bg-emerald-50/50 hover:border-emerald-200 hover:text-emerald-700"}`}
             >
               {currentRouteData.dir0}
             </button>
             <ArrowRightLeft size={20} className="text-[#eadfce] flex-shrink-0" />
             <button 
               onClick={() => updateUrlState(selectedRouteId, 1)}
               className={`flex-1 py-3 px-2 md:px-4 rounded-xl text-xs md:text-sm font-bold transition-all border-2 break-words leading-tight min-h-[52px] ${direction === 1 ? "bg-[#eadfce]/50 border-[#eadfce] text-gray-800 shadow-inner" : "bg-[#fffefb] border-[#eadfce] text-[#6f7b76] hover:bg-emerald-50/50 hover:border-emerald-200 hover:text-emerald-700"}`}
             >
               {currentRouteData.dir1}
             </button>
          </div>

          {/* 重要站點表格：外框換成米灰框線 */}
          <div className="bg-white rounded-xl border border-[#eadfce] shadow-sm overflow-hidden w-full">
              {/* 表格標頭改為米色底與手帳虛線 */}
              <div className="bg-[#fbf8f1] px-2 md:px-4 py-2 border-b-2 border-dashed border-[#eadfce]/60 text-[9px] md:text-[10px] font-bold text-[#6f7b76] text-center uppercase tracking-wider">
                Key Stops Arrival Times
              </div>
              
              {/* 網格分隔線換成米灰材質色 */}
              <div className="grid grid-cols-4 divide-x divide-[#eadfce] bg-white w-full">
                {keyStops.length > 0 ? keyStops.map((stop, idx) => {
                  const shortName = stop.stopNameEn
                    .replace("National Chung Cheng University", "CCU")
                    .replace("Railway Station", "Station");

                  return (
                    <div key={idx} className="p-1.5 md:p-3 flex flex-col items-center justify-center text-center">
                       <span className="text-[9px] md:text-xs text-gray-700 font-bold line-clamp-3 mb-1.5 min-h-[2.5rem] flex items-center justify-center leading-tight tracking-tighter break-words px-0.5">
                         {shortName}
                       </span>
                       <span className={`text-[10px] md:text-sm font-black tracking-tighter ${stop.estimateTime !== null ? "text-emerald-600" : "text-gray-400"}`}>
                         {renderStatus(stop)}
                       </span>
                    </div>
                  );
                }) : (
                  <div className="col-span-4 py-6 text-center text-sm font-bold text-[#6f7b76]">No Key Stop Data</div>
                )}
              </div>
          </div>
        </div>
      </div>

      {/* --- 實時路線地圖 (Timeline Canvas) --- */}
      {/* 區塊畫布底色改為乾淨白紙底 bg-[#fffefb] 與米灰外框 */}
      <div className="flex-1 bg-[#fffefb] rounded-2xl border border-[#eadfce] p-4 md:p-6 overflow-y-auto custom-scrollbar">
          {isLoading && stops.length === 0 ? (
            <div className="flex items-center justify-center h-full font-bold text-[#6f7b76]">Loading Live Data...</div>
          ) : (
            <div className="relative pl-4 space-y-8">
              {/* 垂直時間軌跡軸線：改為米灰材質色 */}
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[#eadfce]"></div>

              {stops.map((stop, index) => {
                const isArriving = stop.estimateTime !== null && stop.estimateTime <= 2;
                const hasDeparted = stop.estimateTime === null && stop.status === 1;
                
                return (
                  <div key={index} className="relative flex items-center gap-4 z-10 group">
                    {/* 軌跡節點圓圈：Departed 狀態換成更溫和的米灰色 */}
                    <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors ${
                        isArriving ? "bg-emerald-500 border-emerald-200 ring-4 ring-emerald-100" :
                        hasDeparted ? "bg-[#eadfce] border-[#eadfce]" : "bg-white border-gray-400"
                    }`}></div>

                    {/* 每站的橫條區塊：Hover 時套用手帳特製襯底與溫暖邊框 */}
                    <div className="flex-1 flex items-center justify-between p-2 md:p-3 rounded-xl hover:bg-[#fffdf8] hover:shadow-sm transition-all border border-transparent hover:border-[#eadfce]">
                        <div className="flex flex-col pr-2">
                          <span className={`font-bold text-xs md:text-sm leading-tight ${hasDeparted ? "text-gray-400" : "text-gray-800"}`}>
                            {index + 1}. {stop.stopNameEn}
                          </span>
                          <span className="text-[10px] md:text-xs font-medium text-[#6f7b76] mt-0.5">{stop.arrivalTime || "--:--"}</span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-2 flex-shrink-0">
                           {isArriving && (
                               // Arriving 警示小標籤改為帶有邊框的高精緻手帳標籤
                               <span className="flex items-center gap-1 text-[10px] md:text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-bold animate-pulse border border-red-100">
                                 <Bus size={12} /> <span className="hidden sm:inline">Arriving</span>
                               </span>
                           )}
                           <span className={`font-mono font-bold text-xs md:text-sm text-right ${
                               stop.estimateTime !== null ? (stop.estimateTime <= 2 ? "text-red-500" : "text-emerald-600") : "text-gray-400"
                           }`}>
                               {renderStatus(stop)}
                           </span>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}