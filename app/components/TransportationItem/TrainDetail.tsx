"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRightLeft, Calendar, Search, ChevronDown, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TAIWAN_STATIONS } from "../Data/TrainStations";  // <--- 記得引用剛剛建立的檔案

// --- 假資料 ---
// 快速看板資料 (Quick Check) - 仿照你的圖二下半部
const QUICK_CHECK_STATIONS = [
  {
    station: "Minxiong Station",
    trains: [
      { no: "123", dest: "Kaohsiung", type: "Local Train", time: "14:00", plat: "2B", status: "Delayed" },
      { no: "456", dest: "Douliu", type: "Local Train", time: "14:18", plat: "1A", status: "On Time" },
      { no: "789", dest: "Pingtung", type: "Tze-Chiang", time: "14:35", plat: "2A", status: "On Time" },
    ]
  },
  {
    station: "Chiayi Station",
    trains: [
      { no: "135", dest: "Pingtung", type: "Tze-Chiang", time: "14:10", plat: "1", status: "On Time" },
      { no: "2193", dest: "Keelung", type: "Local Train", time: "14:25", plat: "2A", status: "On Time" },
    ]
  }
];

// 搜尋結果資料 (Search Results) - 仿照你的圖一搜尋結果
const SEARCH_RESULTS = [
  { id: "2173", type: "Local Train", origin: "Keelung", dest: "Chiayi", dep: "09:38", arr: "15:00", duration: "5h 22m", price: 469 },
  { id: "117", type: "Tze-Chiang (3000)", origin: "Keelung", dest: "Chaozhou", dep: "10:15", arr: "13:45", duration: "3h 30m", price: 789 },
  { id: "2013", type: "Fast Local", origin: "Qidu", dest: "Chiayi", dep: "11:00", arr: "15:30", duration: "4h 30m", price: 469 },
];

interface TrainDetailProps {
  onBack: () => void;
}

export default function TrainDetail({ onBack }: TrainDetailProps) {
  const [hasSearched, setHasSearched] = useState(false);
  
  // 搜尋參數
  const [depStation, setDepStation] = useState("Taipei");
  const [arrStation, setArrStation] = useState("Minxiong");
  const [date, setDate] = useState("2026-01-17");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("12:00");

  // 站點選擇器邏輯
  const [selectorTarget, setSelectorTarget] = useState<"dep" | "arr" | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const swapStations = () => {
    setDepStation(arrStation);
    setArrStation(depStation);
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3 flex-shrink-0">
        <button onClick={onBack} className="p-1.5 -ml-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="font-bold text-gray-800 text-lg">Taiwan Railways</div>
      </div>

      {/* --- 篩選器 (Compact Design) --- */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 flex-shrink-0">
        
        {/* 上排：起訖站與日期 (Grid Layout) */}
        <div className="grid grid-cols-[1fr_auto_1fr_1.2fr] gap-2 mb-3 items-end">
          {/* Departure */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Departure</label>
            <button 
              onClick={() => { setSelectorTarget("dep"); setSelectedCity(null); }}
              className="w-full bg-white h-10 px-3 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 flex items-center justify-between hover:border-emerald-400"
            >
              <span className="truncate">{depStation}</span>
              <ChevronDown size={14} className="text-gray-400 opacity-50" />
            </button>
          </div>

          {/* Swap Button */}
          <button onClick={swapStations} className="h-10 w-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-emerald-600 hover:bg-emerald-50">
            <ArrowRightLeft size={14} />
          </button>

          {/* Arrival */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Arrival</label>
            <button 
              onClick={() => { setSelectorTarget("arr"); setSelectedCity(null); }}
              className="w-full bg-white h-10 px-3 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 flex items-center justify-between hover:border-emerald-400"
            >
              <span className="truncate">{arrStation}</span>
              <ChevronDown size={14} className="text-gray-400 opacity-50" />
            </button>
          </div>

          {/* Date */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Date</label>
            <div className="relative">
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white h-10 pl-2 pr-1 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* 下排：時間與搜尋按鈕 */}
        <div className="flex items-end gap-2">
           <div className="flex-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Time Period</label>
              <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2 h-10">
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full text-xs font-bold text-gray-700 focus:outline-none text-center"
                />
                <span className="text-gray-300 text-xs">to</span>
                <input 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full text-xs font-bold text-gray-700 focus:outline-none text-center"
                />
              </div>
           </div>
           
           <button 
             onClick={() => setHasSearched(true)}
             className="h-10 px-6 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-transform active:scale-95 flex items-center gap-2"
           >
             <Search size={16} />
             Search
           </button>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* 1. 搜尋結果 (Result View) */}
        {hasSearched ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-10">
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="text-sm font-bold text-emerald-700 border-l-4 border-emerald-500 pl-2">
                Search Results
              </h3>
              <button onClick={() => setHasSearched(false)} className="text-xs text-gray-400 hover:text-gray-600 underline">
                Back to Quick Check
              </button>
            </div>

            {/* 綠色搜尋資訊條 */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-2 mb-4 text-xs text-emerald-800 flex items-center justify-between">
               <span className="font-bold">{date}</span>
               <span>{depStation} <ArrowRightLeft size={10} className="inline"/> {arrStation}</span>
               <span>{startTime} - {endTime}</span>
            </div>

            <div className="space-y-3">
              {SEARCH_RESULTS.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
                   {/* 第一行：車種代號 & 價格 */}
                   <div className="flex justify-between items-start mb-3">
                      <div>
                         <span className="text-xs font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded mr-2 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                           {item.type}
                         </span>
                         <span className="text-xs font-bold text-gray-400">#{item.id}</span>
                         <div className="text-[10px] text-gray-400 mt-1">
                            {item.origin} → {item.dest}
                         </div>
                      </div>
                      <div className="text-lg font-black text-gray-800">$ {item.price}</div>
                   </div>

                   {/* 第二行：時間軸視覺化 */}
                   <div className="flex items-center justify-between">
                      <div className="text-center">
                         <div className="text-xl font-bold text-gray-800 leading-none">{item.dep}</div>
                         <div className="text-[10px] text-gray-400 mt-1 font-bold">{depStation}</div>
                      </div>
                      
                      {/* 中間線條 */}
                      <div className="flex-1 mx-4 flex flex-col items-center">
                         <span className="text-[10px] text-gray-400 mb-1">{item.duration}</span>
                         <div className="w-full h-[2px] bg-gray-200 relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                         </div>
                      </div>

                      <div className="text-center">
                         <div className="text-xl font-bold text-gray-800 leading-none">{item.arr}</div>
                         <div className="text-[10px] text-gray-400 mt-1 font-bold">{arrStation}</div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* 2. 快速看板 (Quick Check) */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-10">
            {QUICK_CHECK_STATIONS.map((data, idx) => (
               <div key={idx}>
                  <h3 className="text-sm font-bold text-gray-700 mb-2 pl-1">{data.station}</h3>
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                     {/* 緊湊型表格 */}
                     <div className="grid grid-cols-12 bg-gray-50/80 text-[10px] font-bold text-gray-500 py-2 px-3 border-b border-gray-100 text-center">
                        <div className="col-span-2 text-left">Train No.</div>
                        <div className="col-span-3">Destination</div>
                        <div className="col-span-3">Train</div>
                        <div className="col-span-2">Time</div>
                        <div className="col-span-2 text-right">Remark</div>
                     </div>
                     <div className="divide-y divide-gray-50">
                        {data.trains.map((t, tIdx) => (
                           <div key={tIdx} className="grid grid-cols-12 items-center py-2.5 px-3 text-xs text-center hover:bg-gray-50 transition-colors">
                              <div className="col-span-2 text-left font-bold text-gray-800">{t.no}</div>
                              <div className="col-span-3 font-medium text-gray-700">{t.dest}</div>
                              <div className="col-span-3 text-[10px] text-gray-500">{t.type}</div>
                              <div className="col-span-2 font-bold text-emerald-600">{t.time}</div>
                              <div className={`col-span-2 text-right font-bold text-[10px] ${t.status === "Delayed" ? "text-red-500" : "text-gray-400"}`}>
                                 {t.status}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* --- Station Selector Modal (兩段式篩選) --- */}
      <AnimatePresence>
        {selectorTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col p-4 rounded-3xl"
          >
             <div className="flex justify-between items-center mb-4 flex-shrink-0">
               <div className="flex items-center gap-2">
                 {/* 如果已選縣市，顯示返回箭頭 */}
                 {selectedCity ? (
                    <button onClick={() => setSelectedCity(null)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                       <ChevronLeft size={18} />
                    </button>
                 ) : null}
                 <h3 className="text-lg font-bold text-gray-800">
                   {selectedCity ? `Select Station` : "Select City"}
                 </h3>
               </div>
               
               <button 
                 onClick={() => setSelectorTarget(null)}
                 className="text-sm font-bold text-gray-400 hover:text-gray-600"
               >
                 Close
               </button>
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* 階段 1: 選擇縣市 */}
                {!selectedCity && (
                   <div className="grid grid-cols-3 gap-2">
                      {Object.keys(TAIWAN_STATIONS).map(city => (
                         <button
                           key={city}
                           onClick={() => setSelectedCity(city)}
                           className="py-3 px-2 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 border border-transparent rounded-lg text-xs font-bold text-gray-600 transition-all"
                         >
                            {city.replace(" City", "").replace(" County", "")}
                         </button>
                      ))}
                   </div>
                )}

                {/* 階段 2: 選擇車站 */}
                {selectedCity && (
                   <div className="space-y-2">
                      <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                         {selectedCity}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                         {TAIWAN_STATIONS[selectedCity].map(station => (
                            <button
                              key={station}
                              onClick={() => {
                                 if (selectorTarget === "dep") setDepStation(station);
                                 else setArrStation(station);
                                 setSelectorTarget(null); // 關閉 Modal
                              }}
                              className="py-3 px-1 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:border-emerald-500 hover:ring-2 hover:ring-emerald-100 transition-all"
                            >
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