
// "use client";
// import { useState, useEffect } from "react";
// import { ArrowLeft, ArrowRightLeft, Calendar, Search, ChevronDown, ChevronLeft, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// // 這裡保留你原本用來做前端 UI 選單的 TAIWAN_STATIONS
// import { TAIWAN_STATIONS } from "../data/TrainStations";

// const BASE_URL = "https://campus-ai-backend-1.onrender.com";

// interface TrainDetailProps {
//   onBack: () => void;
// }

// export default function TrainDetail({ onBack }: TrainDetailProps) {
//   const [hasSearched, setHasSearched] = useState(false);
//   const [loading, setLoading] = useState(false);
  
//   const [quickCheckData, setQuickCheckData] = useState<any[]>([]);
//   const [searchResults, setSearchResults] = useState<any[]>([]);

//   const [depStation, setDepStation] = useState("Minxiong");
//   const [arrStation, setArrStation] = useState("Chiayi");
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [startTime, setStartTime] = useState("08:00");
//   const [endTime, setEndTime] = useState("23:59");

//   const [selectorTarget, setSelectorTarget] = useState<"dep" | "arr" | null>(null);
//   const [selectedCity, setSelectedCity] = useState<string | null>(null);

//   // 🌟 新增：用來存放從後端抓來的「英文站名對應代碼」的 Map
//   const [stationCodeMap, setStationCodeMap] = useState<Record<string, string>>({});
// // 1. 初始化獲取：車站代碼清單 & 即時看板
//   useEffect(() => {
//     const initData = async () => {
//       try {
//         // 💡 修正 1：在這裡也要去拿 Token
//         const token = localStorage.getItem("token") || "";
//         const authHeaders = {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}` 
//         };

//         // --- A. 抓取車站代碼並建立對照表 ---
//         // 💡 修正 2：帶上 Token 去要資料
//         const stationsRes = await fetch(`${BASE_URL}/api/traffic/trains/stations`, {
//           method: "GET",
//           headers: authHeaders
//         });
//         const stationsDataRaw = await stationsRes.json();
        
//         console.log("👀 原始車站清單資料:", stationsDataRaw);
        
//         const stationsData = Array.isArray(stationsDataRaw) ? stationsDataRaw : (stationsDataRaw?.data || stationsDataRaw?.stations || []);
//         const codeMap: Record<string, string> = {};
        
//         if (Array.isArray(stationsData)) {
//           stationsData.forEach((city: any) => {
//             if (Array.isArray(city.stations)) {
//               city.stations.forEach((st: any) => {
//                 if (st.labelEn && st.value) {
//                   // 把前後端可能出現的大小寫差異或空白都處理掉
//                   codeMap[st.labelEn.trim().toLowerCase()] = st.value.toString(); 
//                 }
//               });
//             }
//           });
//         }
//         setStationCodeMap(codeMap);
//         console.log("🚉 成功建立車站代碼對照表:", codeMap);

// // --- B. 抓取即時看板資料 ---
//         // 💡 修正 3：即時看板也要帶 Token！
//         const boardRes = await fetch(`${BASE_URL}/api/traffic/trains`, {
//           method: "GET",
//           headers: authHeaders
//         });
//         const boardData = await boardRes.json();
//         const trainList = Array.isArray(boardData) ? boardData : (boardData?.data || boardData?.trains || []);

//         // 💡 終極修正：因為 API 回傳的 stationName 只有中文，我們必須用中文去過濾，但 UI 標題保持英文
//         const targetStations = [
//           { en: "Minxiong", zh: "民雄" },
//           { en: "Chiayi", zh: "嘉義" }
//         ];

//         const grouped = targetStations.map(s => ({
//           station: `${s.en} Station`, // UI 標題依然顯示英文 (Minxiong Station)
//           // 過濾時，拿 API 裡的中文站名跟我們的 s.zh 比對
//           trains: trainList.filter((t: any) => t?.stationName === s.zh || t?.stationName?.includes(s.zh))
//         }));
        
//         setQuickCheckData(grouped);
//       } catch (error) {
//         console.error("初始化資料失敗:", error);
//       }
//     };
//     initData();
//   }, []);
  
//   // 2. 搜尋 API 串接
//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token") || ""; 

// const originCode = stationCodeMap[depStation.toLowerCase()];
//       const destCode = stationCodeMap[arrStation.toLowerCase()];

//       if (!originCode || !destCode) {
//          console.warn(`找不到 ${depStation} 或 ${arrStation} 的車站代碼，請確認後端車站清單 API 是否正常`);
//       }

//       // API 規定傳遞 origin (出發站代碼)、destination (終點站代碼)、date (日期) [cite: 105, 106, 107, 108]
//       const queryParams = new URLSearchParams({
//         origin: originCode || "",       
//         destination: destCode || "",  
//         date: date,
//         start: startTime, // 後端雖然沒寫這兩個參數，但留著無妨
//         end: endTime
//       }).toString();

//       const url = `${BASE_URL}/api/traffic/trains/search?${queryParams}`;
//       console.log("🔍 發送代碼版搜尋請求 URL:", url);

//       const res = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}` 
//         }
//       });

//       const data = await res.json();
//       console.log("📦 搜尋 API 回傳結果:", data);

//       const resultList = data.trains || data || []; 
//       setSearchResults(resultList);
//       setHasSearched(true);

//     } catch (error) {
//       console.error("🚨 搜尋發生錯誤:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const swapStations = () => {
//     setDepStation(arrStation);
//     setArrStation(depStation);
//   };

//   return (
//     <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </button>
//         <div>
//           <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
//             Taiwan Railway Live
//           </div>
//         </div>
//       </div>

//       {/* Filter Section */}
//       <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 flex-shrink-0">
//         <div className="grid grid-cols-[1fr_auto_1fr_1.2fr] gap-2 mb-3 items-end">
//           <div>
//             <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Departure</label>
//             <button 
//               onClick={() => { setSelectorTarget("dep"); setSelectedCity(null); }}
//               className="w-full bg-white h-10 px-3 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 flex items-center justify-between hover:border-emerald-400"
//             >
//               <span className="truncate">{depStation}</span>
//               <ChevronDown size={14} className="text-gray-400 opacity-50" />
//             </button>
//           </div>

//           <button onClick={swapStations} className="h-10 w-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-emerald-600 hover:bg-emerald-50">
//             <ArrowRightLeft size={14} />
//           </button>

//           <div>
//             <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Arrival</label>
//             <button 
//               onClick={() => { setSelectorTarget("arr"); setSelectedCity(null); }}
//               className="w-full bg-white h-10 px-3 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 flex items-center justify-between hover:border-emerald-400"
//             >
//               <span className="truncate">{arrStation}</span>
//               <ChevronDown size={14} className="text-gray-400 opacity-50" />
//             </button>
//           </div>

//           <div>
//             <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Date</label>
//             <input 
//               type="date" 
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full bg-white h-10 px-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 focus:outline-none focus:border-emerald-400"
//             />
//           </div>
//         </div>

//         <div className="flex items-end gap-2">
//            <div className="flex-1">
//               <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Time Period</label>
//               <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2 h-10">
//                 <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full text-xs font-bold text-gray-700 focus:outline-none text-center" />
//                 <span className="text-gray-300 text-xs">to</span>
//                 <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full text-xs font-bold text-gray-700 focus:outline-none text-center" />
//               </div>
//            </div>
           
//            <button 
//              onClick={handleSearch}
//              disabled={loading}
//              className="h-10 px-6 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-transform active:scale-95 flex items-center gap-2 disabled:opacity-70"
//            >
//              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
//              Search
//            </button>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 overflow-y-auto custom-scrollbar">
//         {hasSearched ? (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-10">
//             <div className="flex justify-between items-center mb-4 px-1">
//               <h3 className="text-sm font-bold text-emerald-700 border-l-4 border-emerald-500 pl-2">Search Results</h3>
//               <button onClick={() => setHasSearched(false)} className="text-xs text-gray-400 hover:text-gray-600 underline">Back to Board</button>
//             </div>

//             <div className="space-y-3">
//               {searchResults.length > 0 ? searchResults.map((item, idx) => (
//                 <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
//                    <div className="flex justify-between items-start mb-3">
//                       <div>
//                          <span className="text-xs font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded mr-2 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
//                            {item.trainTypeEn}
//                          </span>
//                          <span className="text-xs font-bold text-gray-400">#{item.trainNo}</span>
//                       </div>
//                    </div>

//                    <div className="flex items-center justify-between">
//                       <div className="text-center">
//                          <div className="text-xl font-bold text-gray-800 leading-none">{item.departureTime}</div>
//                          <div className="text-[10px] text-gray-400 mt-1 font-bold">{depStation}</div>
//                       </div>
                      
//                       <div className="flex-1 mx-4 flex flex-col items-center">
//                          <div className="w-full h-[2px] bg-gray-200 relative">
//                             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
//                             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
//                          </div>
//                       </div>

//                       <div className="text-center">
//                          <div className="text-xl font-bold text-gray-800 leading-none">{item.arrivalTime}</div>
//                          <div className="text-[10px] text-gray-400 mt-1 font-bold">{arrStation}</div>
//                       </div>
//                    </div>
//                 </div>
//               )) : (
//                 <div className="text-center py-10 text-gray-400 text-sm">No trains found for this period.</div>
//               )}
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-10">
//             {quickCheckData.map((data, idx) => (
//                <div key={idx}>
//                   <h3 className="text-sm font-bold text-gray-700 mb-2 pl-1">{data.station}</h3>
//                   <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
//                      <div className="grid grid-cols-12 bg-gray-50/80 text-[10px] font-bold text-gray-500 py-2 px-3 border-b border-gray-100 text-center">
//                         <div className="col-span-2 text-left">No.</div>
//                         <div className="col-span-3">Dest.</div>
//                         <div className="col-span-3">Type</div>
//                         <div className="col-span-2">Time</div>
//                         <div className="col-span-2 text-right">Delay</div>
//                      </div>
//                      <div className="divide-y divide-gray-50">
//                         {data.trains.map((t: any, tIdx: number) => (
//                            <div key={tIdx} className="grid grid-cols-12 items-center py-2.5 px-3 text-xs text-center hover:bg-gray-50 transition-colors">
//                               <div className="col-span-2 text-left font-bold text-gray-800">{t.trainNo}</div>
//                               <div className="col-span-3 font-medium text-gray-700 truncate">{t.destinationEn}</div>
//                               <div className="col-span-3 text-[10px] text-gray-500 truncate">{t.trainTypeEn}</div>
//                               <div className="col-span-2 font-bold text-emerald-600">{t.departureTime}</div>
//                               <div className={`col-span-2 text-right font-bold text-[10px] ${t.delayTime > 0 ? "text-red-500" : "text-gray-400"}`}>
//                                  {t.delayTime > 0 ? `${t.delayTime}'` : "On Time"}
//                               </div>
//                            </div>
//                         ))}
//                      </div>
//                   </div>
//                </div>
//             ))}
//           </motion.div>
//         )}
//       </div>

//       {/* Station Selector Modal */}
//       <AnimatePresence>
//         {selectorTarget && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col p-4 rounded-3xl">
//              <div className="flex justify-between items-center mb-4 flex-shrink-0">
//                <div className="flex items-center gap-2">
//                  {selectedCity && (
//                     <button onClick={() => setSelectedCity(null)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
//                        <ChevronLeft size={18} />
//                     </button>
//                  )}
//                  <h3 className="text-lg font-bold text-gray-800">{selectedCity ? `Select Station` : "Select City"}</h3>
//                </div>
//                <button onClick={() => setSelectorTarget(null)} className="text-sm font-bold text-gray-400 hover:text-gray-600">Close</button>
//              </div>

//              <div className="flex-1 overflow-y-auto custom-scrollbar">
//                 {!selectedCity ? (
//                    <div className="grid grid-cols-3 gap-2">
//                       {Object.keys(TAIWAN_STATIONS).map(city => (
//                          <button key={city} onClick={() => setSelectedCity(city)} className="py-3 px-2 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 border border-transparent rounded-lg text-xs font-bold text-gray-600">
//                             {city.replace(" City", "").replace(" County", "")}
//                          </button>
//                       ))}
//                    </div>
//                 ) : (
//                    <div className="space-y-2">
//                       <div className="text-xs font-bold text-emerald-600 uppercase mb-2">{selectedCity}</div>
//                       <div className="grid grid-cols-3 gap-2">
//                          {TAIWAN_STATIONS[selectedCity].map(station => (
//                             <button key={station} onClick={() => {
//                                  if (selectorTarget === "dep") setDepStation(station);
//                                  else setArrStation(station);
//                                  setSelectorTarget(null);
//                             }} className="py-3 px-1 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:border-emerald-500">
//                                {station}
//                             </button>
//                          ))}
//                       </div>
//                    </div>
//                 )}
//              </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRightLeft, Calendar, Search, ChevronDown, ChevronLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TAIWAN_STATIONS } from "../data/TrainStations";

const BASE_URL = "https://campus-ai-backend-1.onrender.com";

interface TrainDetailProps {
  onBack: () => void;
}

export default function TrainDetail({ onBack }: TrainDetailProps) {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [quickCheckData, setQuickCheckData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [depStation, setDepStation] = useState("Minxiong");
  const [arrStation, setArrStation] = useState("Chiayi");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("23:59");

  const [selectorTarget, setSelectorTarget] = useState<"dep" | "arr" | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const [stationCodeMap, setStationCodeMap] = useState<Record<string, string>>({});

  // 1. 初始化獲取：車站代碼清單 & 即時看板
  useEffect(() => {
    const initData = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const authHeaders = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        };

        const stationsRes = await fetch(`${BASE_URL}/api/traffic/trains/stations`, {
          method: "GET",
          headers: authHeaders
        });
        const stationsDataRaw = await stationsRes.json();
        
        const stationsData = Array.isArray(stationsDataRaw) ? stationsDataRaw : (stationsDataRaw?.data || stationsDataRaw?.stations || []);
        const codeMap: Record<string, string> = {};
        
        if (Array.isArray(stationsData)) {
          stationsData.forEach((city: any) => {
            if (Array.isArray(city.stations)) {
              city.stations.forEach((st: any) => {
                if (st.labelEn && st.value) {
                  codeMap[st.labelEn.trim().toLowerCase()] = st.value.toString(); 
                }
              });
            }
          });
        }
        setStationCodeMap(codeMap);

        const boardRes = await fetch(`${BASE_URL}/api/traffic/trains`, {
          method: "GET",
          headers: authHeaders
        });
        const boardData = await boardRes.json();
        console.log("👀 看板 API 到底回傳了什麼：", boardData);
        const trainList = Array.isArray(boardData) ? boardData : (boardData?.data || boardData?.trains || []);

        const targetStations = [
          { en: "Minxiong", zh: "民雄" },
          { en: "Chiayi", zh: "嘉義" }
        ];

        const grouped = targetStations.map(s => ({
          station: `${s.en} Station`, 
          trains: trainList.filter((t: any) => t?.stationName === s.zh || t?.stationName?.includes(s.zh))
        }));
        
        setQuickCheckData(grouped);
      } catch (error) {
        console.error("初始化資料失敗:", error);
      }
    };
    initData();
  }, []);
  
  // 2. 搜尋 API 串接
  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || ""; 

      const originCode = stationCodeMap[depStation.toLowerCase()];
      const destCode = stationCodeMap[arrStation.toLowerCase()];

      if (!originCode || !destCode) {
         console.warn(`找不到 ${depStation} 或 ${arrStation} 的車站代碼，請確認後端車站清單 API 是否正常`);
      }

      // API 只負責根據日期回傳一整天，時間過濾我們自己做
      const queryParams = new URLSearchParams({
        origin: originCode || "",       
        destination: destCode || "",  
        date: date
      }).toString();

      const url = `${BASE_URL}/api/traffic/trains/search?${queryParams}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        }
      });

      const data = await res.json();
      const rawList = data.trains || data || []; 

      // 💡 關鍵：前端手動過濾 startTime 到 endTime 之間的班次
      const filteredList = rawList.filter((item: any) => {
        const trainTime = item.departureTime; // 假設格式為 "14:30"
        if (!trainTime) return false;
        return trainTime >= startTime && trainTime <= endTime;
      });

      setSearchResults(filteredList);
      setHasSearched(true);

    } catch (error) {
      console.error("🚨 搜尋發生錯誤:", error);
    } finally {
      setLoading(false);
    }
  };

  const swapStations = () => {
    setDepStation(arrStation);
    setArrStation(depStation);
  };

  // 產生英文格式的日期 (例如: May 9, 2026)
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <div>
        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
          Taiwan Railway
        </div>
        <div className="text-lg font-bold text-gray-800">
          Real-time Availability
        </div>
      </div>
      </div>

      {/* --- 優化版：Filter Section (2-Row Layout) --- */}
      <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100 mb-8 flex-shrink-0 shadow-sm">
        
        {/* 上層：起訖站選擇 */}
        <div className="flex items-end gap-3 mb-4">
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1.5 block tracking-wide">Departure</label>
            <button 
              onClick={() => { setSelectorTarget("dep"); setSelectedCity(null); }}
              className="w-full bg-white h-12 px-4 rounded-xl border border-gray-200 text-base font-bold text-gray-700 flex items-center justify-between hover:border-emerald-400 hover:shadow-sm transition-all"
            >
              <span className="truncate">{depStation}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>

          <button 
            onClick={swapStations} 
            className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm"
          >
            <ArrowRightLeft size={18} />
          </button>

          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1.5 block tracking-wide">Arrival</label>
            <button 
              onClick={() => { setSelectorTarget("arr"); setSelectedCity(null); }}
              className="w-full bg-white h-12 px-4 rounded-xl border border-gray-200 text-base font-bold text-gray-700 flex items-center justify-between hover:border-emerald-400 hover:shadow-sm transition-all"
            >
              <span className="truncate">{arrStation}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* 下層：日期、時間與搜尋按鈕 */}
        <div className="flex items-end gap-3">
          <div className="w-1/3">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1.5 block tracking-wide">Date</label>
            <div className="relative h-12 bg-white rounded-xl border border-gray-200 px-3 flex items-center justify-between hover:border-emerald-400 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-50 overflow-hidden transition-all shadow-sm">
              <span className="text-sm font-bold text-gray-700 pl-1">{formattedDate}</span>
              <Calendar size={16} className="text-gray-400" />
              <input 
                type="date" 
                value={date}
                onClick={(e) => e.currentTarget.showPicker?.()}
                onChange={(e) => setDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>
          </div>

          <div className="flex-1">
             <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1.5 block tracking-wide">Time Period (24H)</label>
             <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 h-12 shadow-sm hover:border-emerald-400 transition-all">
               <input 
                 type="time" 
                 value={startTime} 
                 onClick={(e) => e.currentTarget.showPicker?.()}
                 onChange={(e) => setStartTime(e.target.value)} 
                 className="w-full text-sm md:text-base font-bold text-gray-700 focus:outline-none text-center bg-transparent cursor-pointer appearance-none" 
               />
               <span className="text-gray-300 text-sm font-medium">to</span>
               <input 
                 type="time" 
                 value={endTime} 
                 onClick={(e) => e.currentTarget.showPicker?.()}
                 onChange={(e) => setEndTime(e.target.value)} 
                 className="w-full text-sm md:text-base font-bold text-gray-700 focus:outline-none text-center bg-transparent cursor-pointer appearance-none" 
               />
             </div>
          </div>
          
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="h-12 px-8 bg-emerald-600 text-white rounded-xl font-black text-base hover:bg-emerald-700 shadow-md shadow-emerald-200/50 transition-transform active:scale-95 flex items-center gap-2 disabled:opacity-70 flex-shrink-0"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} strokeWidth={2.5} />}
            Search
          </button>
        </div>
      </div>

{/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        {hasSearched ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-10">
            
            {/* 💡 這裡換成你指定的高質感二段式返回按鈕 */}
            <button
              onClick={() => setHasSearched(false)}
              className="self-start mb-5 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-700 transition-colors bg-gray-50 hover:bg-emerald-50 px-4 py-2 rounded-full font-bold border border-transparent hover:border-emerald-100"
            >
              <ArrowLeft size={18} />
              Back to Board
            </button>

            <div className="flex justify-between items-center mb-5 px-1">
              <h3 className="text-base font-black text-emerald-700 border-l-4 border-emerald-500 pl-3">
                Search Results
              </h3>
              {/* 原本右邊的純文字 Back to Board 已經拿掉了 */}
            </div>

            <div className="space-y-4">
              {searchResults.length > 0 ? searchResults.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <span className="text-sm font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md mr-3 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                           {item.trainTypeEn}
                         </span>
                         <span className="text-sm font-bold text-gray-400">#{item.trainNo}</span>
                      </div>
                   </div>

                   <div className="flex items-center justify-between px-2">
                      <div className="text-center">
                         <div className="text-3xl font-black text-gray-800 tracking-tight">{item.departureTime}</div>
                         <div className="text-xs text-gray-400 mt-1.5 font-bold uppercase">{depStation}</div>
                      </div>
                      
                      <div className="flex-1 mx-6 flex flex-col items-center">
                         <div className="w-full h-[3px] bg-gray-100 relative rounded-full">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300 group-hover:bg-emerald-400 transition-colors"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300 group-hover:bg-emerald-400 transition-colors"></div>
                         </div>
                      </div>

                      <div className="text-center">
                         <div className="text-3xl font-black text-gray-800 tracking-tight">{item.arrivalTime}</div>
                         <div className="text-xs text-gray-400 mt-1.5 font-bold uppercase">{arrStation}</div>
                      </div>
                   </div>
                </div>
              )) : (
                <div className="text-center py-16 text-gray-400 text-sm font-bold bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                   No trains found for this period.
                </div>
              )}
            </div>
          </motion.div>
        ) : (
<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-10">
            {quickCheckData.map((data, idx) => (
               <div key={idx}>
                  <h3 className="text-base font-black text-gray-700 mb-3 pl-1 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                     {data.station}
                  </h3>
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                     <div className="grid grid-cols-12 bg-gray-50/80 text-xs font-bold text-gray-400 py-3.5 px-4 border-b border-gray-100 text-center uppercase tracking-wider">
                        <div className="col-span-2 text-left pl-2">No.</div>
                        <div className="col-span-3">Dest.</div>
                        <div className="col-span-3">Type</div>
                        <div className="col-span-2">Time</div>
                        <div className="col-span-2 text-right pr-2">Delay</div>
                     </div>
                     
                     {/* 💡 新增：如果有車就顯示列表，沒車就顯示提示文字 */}
                     {data.trains.length > 0 ? (
                       <div className="divide-y divide-gray-50">
                          {data.trains.map((t: any, tIdx: number) => (
                             <div key={tIdx} className="grid grid-cols-12 items-center py-4 px-4 text-sm text-center hover:bg-gray-50 transition-colors">
                                <div className="col-span-2 text-left pl-2 font-black text-gray-700">{t.trainNo}</div>
                                <div className="col-span-3 font-bold text-gray-800 truncate">{t.destinationEn}</div>
                                <div className="col-span-3 text-xs font-bold text-gray-500 truncate px-1">{t.trainTypeEn}</div>
                                <div className="col-span-2 font-black text-emerald-600 text-base">{t.departureTime}</div>
                                <div className={`col-span-2 text-right pr-2 font-bold text-xs ${t.delayTime > 0 ? "text-red-500 bg-red-50 py-1 rounded-md" : "text-gray-400"}`}>
                                   {t.delayTime > 0 ? `+${t.delayTime} min` : "On Time"}
                                </div>
                             </div>
                          ))}
                       </div>
                     ) : (
                       // 💡 無車時的優雅提示
                       <div className="py-10 text-center text-sm font-bold text-gray-400 bg-gray-50/30">
                          No incoming trains at the moment.
                       </div>
                     )}

                  </div>
               </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Station Selector Modal */}
      <AnimatePresence>
        {selectorTarget && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col p-6 rounded-3xl">
             <div className="flex justify-between items-center mb-6 flex-shrink-0 border-b border-gray-100 pb-4">
               <div className="flex items-center gap-3">
                 {selectedCity && (
                    <button onClick={() => setSelectedCity(null)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                       <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                 )}
                 <h3 className="text-xl font-black text-gray-800">{selectedCity ? `Select Station` : "Select City"}</h3>
               </div>
               <button onClick={() => setSelectorTarget(null)} className="text-sm font-bold text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Close</button>
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
                {!selectedCity ? (
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.keys(TAIWAN_STATIONS).map(city => (
                         <button key={city} onClick={() => setSelectedCity(city)} className="py-4 px-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent rounded-xl text-sm font-bold text-gray-600 transition-all text-left flex justify-between items-center group">
                            {city.replace(" City", "").replace(" County", "")}
                            <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 -rotate-90 transition-opacity" />
                         </button>
                      ))}
                   </div>
                ) : (
                   <div className="space-y-4">
                      <div className="text-sm font-black text-emerald-600 uppercase tracking-widest pl-1">{selectedCity}</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                         {TAIWAN_STATIONS[selectedCity].map(station => (
                            <button key={station} onClick={() => {
                                 if (selectorTarget === "dep") setDepStation(station);
                                 else setArrStation(station);
                                 setSelectorTarget(null);
                            }} className="py-4 px-3 bg-white border border-gray-200 rounded-xl text-base font-bold text-gray-700 hover:border-emerald-500 hover:shadow-md transition-all text-left">
                               {station}
                            </button>
                         ))}
                      </div>
                   </div>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}