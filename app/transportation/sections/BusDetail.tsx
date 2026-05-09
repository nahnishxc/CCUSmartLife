

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { ArrowLeft, ArrowRightLeft, ExternalLink, ChevronDown, Bus } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- 1. 定義完全符合 API 清單的資料結構 ---
// interface BusStop {
//   stopName: string;    // 站名 (中文)
//   stopNameEn: string;  // 站名 (英文)
//   estimateTime: number | null; // 剩餘分鐘數，車子還沒開或過站為 null
//   arrivalTime: string; // 預估抵達時間 (e.g., "14:30")
//   status: number;      // 1.正常、2.尚未發車、3.交管、4.末班已過、5.今日未營運
//   isKeyStop: boolean;  // 是否為重點站
// }

// interface BusDetailProps {
//   onBack: () => void;
//   routeId?: string; // 從外部傳入初始 ID，預設 7309
// }

// export default function BusDetail({ onBack, routeId = "7309" }: BusDetailProps) {
//   // --- 狀態管理 ---
//   const [selectedRouteId, setSelectedRouteId] = useState(routeId);
//   const [direction, setDirection] = useState<0 | 1>(0); // 0: To Destination, 1: To Origin
//   const [stops, setStops] = useState<BusStop[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // --- API 請求邏輯 ---
//   const fetchBusData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `https://campus-ai-backend-1.onrender.com/api/traffic/buses/${selectedRouteId}/estimated-time-of-arrival?direction=${direction}`,
//         {
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem("token")}`, // 假設 Token 存於 localStorage
//             "Content-Type": "application/json",
//           },
//         }
//       );
      
//       if (!response.ok) throw new Error("Network response was not ok");
      
//       const data = await response.json();
//       // 根據 API 清單，資料應在 data 欄位中，或是直接是陣列
//       // 這裡假設後端回傳格式為 { stops: BusStop[] }
//       setStops(data.stops || []);
//     } catch (error) {
//       console.error("API Fetch Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedRouteId, direction]);

//   // 監聽 ID 或 方向改變
//   useEffect(() => {
//     fetchBusData();
//     const timer = setInterval(fetchBusData, 30000); // 30秒自動刷新
//     return () => clearInterval(timer);
//   }, [fetchBusData]);

//   // --- 邏輯處理 ---
  
//   // 取得重點站 (Key Stops)
//   const keyStops = stops.filter(s => s.isKeyStop).slice(0, 4);

//   // 狀態文字轉換 (完全英文)
//   const renderStatus = (stop: BusStop) => {
//     if (stop.estimateTime !== null) {
//       return `${stop.estimateTime} min`;
//     }
//     // 根據 API status 欄位判斷
//     switch (stop.status) {
//       case 2: return "Starting Soon";
//       case 3: return "Skip";
//       case 4: return "Final Passed";
//       case 5: return "No Service";
//       default: return "Departed";
//     }
//   };

//   return (
//   <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
//     {/* --- Header --- */}
//     <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
//       <button
//         onClick={onBack}
//         className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
//       >
//         <ArrowLeft size={16} />
//         Back
//       </button>
//         <div>
//            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bus Real Time</div>
//            <div className="text-lg font-bold text-gray-800">Route {selectedRouteId}</div>
//         </div>
//       </div>

//       {/* --- Control Panel --- */}
//       <div className="flex flex-col md:flex-row gap-6 mb-8">
        
//         <div className="flex-1">
//           <div className="relative mb-4 z-20">
//              <button 
//                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                className="flex items-center gap-2 text-4xl font-black text-gray-800 hover:text-emerald-600 transition-colors"
//              >
//                {selectedRouteId}
//                <ChevronDown size={24} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
//              </button>
             
//              {/* 這裡的下拉選單建議也透過 API 獲取列表，目前先保留空架構 */}
//              <AnimatePresence>
//                {isDropdownOpen && (
//                  <motion.div
//                    initial={{ opacity: 0, y: -10 }}
//                    animate={{ opacity: 1, y: 0 }}
//                    exit={{ opacity: 0, y: -10 }}
//                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
//                  >
//                     {["7309", "7306", "106"].map(id => (
//                       <button
//                         key={id}
//                         onClick={() => {
//                           setSelectedRouteId(id);
//                           setIsDropdownOpen(false);
//                         }}
//                         className={`w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 transition-colors ${selectedRouteId === id ? "text-emerald-600 font-bold" : "text-gray-600"}`}
//                       >
//                         {id}
//                       </button>
//                     ))}
//                  </motion.div>
//                )}
//              </AnimatePresence>
//           </div>

//           <div className="space-y-1 text-sm text-gray-600 font-medium">
//              <p>Scheduled: <span className="text-gray-900">Check iBus for timetable</span></p>
//           </div>
          
//           <a href="https://www.taiwanbus.tw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-emerald-600 hover:underline">
//              iBus Official System <ExternalLink size={12}/>
//           </a>
//         </div>

//         {/* --- Direction Toggle & Key Stops --- */}
//         <div className="flex-[1.5] flex flex-col gap-4">
//            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
//               <button 
//                 onClick={() => setDirection(0)}
//                 className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${direction === 0 ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500"}`}
//               >
//                 Inbound
//               </button>
//               <ArrowRightLeft size={16} className="text-gray-400" />
//               <button 
//                 onClick={() => setDirection(1)}
//                 className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${direction === 1 ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500"}`}
//               >
//                 Outbound
//               </button>
//            </div>

//            <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
//               <div className="bg-gray-100/50 px-4 py-2 border-b border-gray-200/50 text-xs font-bold text-gray-500 text-center">
//                  Key Stops ETA
//               </div>
//               <div className="grid grid-cols-4 divide-x divide-gray-200/50">
//                  {keyStops.length > 0 ? keyStops.map((stop, idx) => (
//                    <div key={idx} className="p-2 flex flex-col items-center justify-center text-center">
//                       <span className="text-[10px] text-gray-500 font-medium line-clamp-1 mb-1">
//                         {stop.stopNameEn.replace("National Chung Cheng University", "CCU")}
//                       </span>
//                       <span className={`text-sm font-bold ${stop.estimateTime !== null ? "text-emerald-600" : "text-gray-400"}`}>
//                         {renderStatus(stop)}
//                       </span>
//                    </div>
//                  )) : (
//                    <div className="col-span-4 py-4 text-center text-xs text-gray-400">No Key Stop Data</div>
//                  )}
//               </div>
//            </div>
//         </div>
//       </div>

//       {/* --- Real-time Route Map --- */}
//       <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-6 overflow-y-auto custom-scrollbar">
//           {isLoading && stops.length === 0 ? (
//             <div className="flex items-center justify-center h-full text-gray-400">Loading Live Data...</div>
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

//                     <div className="flex-1 flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-emerald-100">
//                         <div className="flex flex-col">
//                           <span className={`font-bold text-sm ${hasDeparted ? "text-gray-400" : "text-gray-800"}`}>
//                             {index + 1}. {stop.stopNameEn}
//                           </span>
//                           <span className="text-[10px] text-gray-400">{stop.arrivalTime || "--:--"}</span>
//                         </div>
                        
//                         <div className="flex items-center gap-2">
//                            {isArriving && (
//                                <span className="flex items-center gap-1 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold animate-pulse">
//                                  <Bus size={10} /> Arriving
//                                </span>
//                            )}
//                            <span className={`font-mono font-bold text-sm ${
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

import { useState, useEffect, useCallback } from "react";
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
  routeId?: string;
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

export default function BusDetail({ onBack, routeId = "7309" }: BusDetailProps) {
  const [selectedRouteId, setSelectedRouteId] = useState(routeId);
  const [direction, setDirection] = useState<0 | 1>(0);
  const [stops, setStops] = useState<BusStop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentRouteData = ROUTE_INFO[selectedRouteId] || ROUTE_INFO["7309"];

  const fetchBusData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://campus-ai-backend-1.onrender.com/api/traffic/buses/${selectedRouteId}/estimated-time-of-arrival?direction=${direction}`,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      setStops(data.stops || []);
    } catch (error) {
      console.error("API Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedRouteId, direction]);

  useEffect(() => {
    fetchBusData();
    const timer = setInterval(fetchBusData, 30000);
    return () => clearInterval(timer);
  }, [fetchBusData]);

  const keyStops = stops.filter(s => s.isKeyStop).slice(0, 4);

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
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* --- Header --- */}
      <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bus Real Time</div>
          <div className="text-xl font-black text-gray-800">Route {selectedRouteId}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex-shrink-0">
        
        {/* 左半部：固定寬度限制 (lg:w-72 代表在電腦版寬度約為 288px)，不會無限制向右擠 */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col justify-center relative">
          
          <div className="relative mb-4 z-20">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Select Route</span>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
            >
              <span className="text-3xl font-black text-gray-800">{selectedRouteId}</span>
              <ChevronDown size={24} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
                >
                  {["7309", "7306", "106"].map(id => (
                    <button
                      key={id}
                      onClick={() => {
                        setSelectedRouteId(id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 transition-colors ${selectedRouteId === id ? "bg-emerald-50 text-emerald-600 font-black" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 font-bold"}`}
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
              <p className="text-gray-500">First Bus : <span className="text-gray-900 ml-1">{currentRouteData.first}</span></p>
              <p className="text-gray-500">Last Bus : <span className="text-gray-900 ml-1">{currentRouteData.last}</span></p>
            </div>
          </div>
          
          <a href="https://www.taiwanbus.tw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 hover:text-emerald-700 hover:underline w-fit">
            iBus Information System Link <ExternalLink size={14}/>
          </a>
        </div>

        {/* 右半部：flex-1 讓它自動填滿剩餘的橫向空間 */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setDirection(0)}
               className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${direction === 0 ? "bg-gray-200 border-gray-300 text-gray-800 shadow-inner" : "bg-white border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600"}`}
             >
               {currentRouteData.dir0}
             </button>
             <ArrowRightLeft size={20} className="text-gray-300 flex-shrink-0" />
             <button 
               onClick={() => setDirection(1)}
               className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${direction === 1 ? "bg-gray-200 border-gray-300 text-gray-800 shadow-inner" : "bg-white border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600"}`}
             >
               {currentRouteData.dir1}
             </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
             <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-[10px] font-bold text-gray-500 text-center uppercase tracking-wider">
                Key Stops Arrival Times
             </div>
             <div className="grid grid-cols-4 divide-x divide-gray-200 bg-white">
                {keyStops.length > 0 ? keyStops.map((stop, idx) => (
                  <div key={idx} className="p-3 lg:p-4 flex flex-col items-center justify-center text-center">
                     {/* 站名有了更多空間，使用 min-h 確保排版對齊 */}
                     <span className="text-xs text-gray-700 font-medium line-clamp-2 mb-2 min-h-[2rem] flex items-center justify-center leading-tight">
                       {stop.stopNameEn.replace("National Chung Cheng University", "CCU")}
                     </span>
                     <span className={`text-sm font-black ${stop.estimateTime !== null ? "text-emerald-600" : "text-gray-400"}`}>
                       {renderStatus(stop)}
                     </span>
                  </div>
                )) : (
                  <div className="col-span-4 py-6 text-center text-sm font-bold text-gray-400">No Key Stop Data</div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* --- Real-time Route Map (維持不變) --- */}
      <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-6 overflow-y-auto custom-scrollbar">
          {isLoading && stops.length === 0 ? (
            <div className="flex items-center justify-center h-full font-bold text-gray-400">Loading Live Data...</div>
          ) : (
            <div className="relative pl-4 space-y-8">
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

              {stops.map((stop, index) => {
                const isArriving = stop.estimateTime !== null && stop.estimateTime <= 2;
                const hasDeparted = stop.estimateTime === null && stop.status === 1;
                
                return (
                  <div key={index} className="relative flex items-center gap-4 z-10 group">
                    <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors ${
                        isArriving ? "bg-emerald-500 border-emerald-200 ring-4 ring-emerald-100" :
                        hasDeparted ? "bg-gray-300 border-gray-300" : "bg-white border-gray-400"
                    }`}></div>

                    <div className="flex-1 flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-emerald-100">
                        <div className="flex flex-col">
                          <span className={`font-bold text-sm ${hasDeparted ? "text-gray-400" : "text-gray-800"}`}>
                            {index + 1}. {stop.stopNameEn}
                          </span>
                          <span className="text-xs font-medium text-gray-500 mt-0.5">{stop.arrivalTime || "--:--"}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                           {isArriving && (
                               <span className="flex items-center gap-1 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold animate-pulse">
                                 <Bus size={12} /> Arriving
                               </span>
                           )}
                           <span className={`font-mono font-bold text-sm ${
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