// "use client";
// import { useState } from "react";
// import { ArrowLeft, MapPin, ChevronDown, Bike, Navigation, ExternalLink } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- 1. 定義資料結構 ---
// interface UbikeStation {
//   id: string;
//   name: string;
//   address: string;
//   total: number;
//   available: number;
//   empty: number;
//   lat: number; // 緯度
//   lng: number; // 經度
// }

// // --- 2. 假資料：區域與對應的站點 ---
// const UBIKE_DATA: Record<string, UbikeStation[]> = {
//   "In CCU": [
//     {
//       id: "ccu_act",
//       name: "CCU Activity Center",
//       address: "No. 168, University Rd., Minxiong Township (Activity Center)",
//       total: 40, available: 12, empty: 28,
//       lat: 23.5605, lng: 120.4735
//     },
//     {
//       id: "ccu_lib",
//       name: "CCU Library",
//       address: "In front of the Library main entrance",
//       total: 30, available: 5, empty: 25,
//       lat: 23.5620, lng: 120.4760
//     },
//     {
//       id: "ccu_dorm",
//       name: "Student Dormitory",
//       address: "Near the entrance of Dormitory Area 1",
//       total: 50, available: 45, empty: 5,
//       lat: 23.5590, lng: 120.4780
//     },
//   ],
//   "Around CCU": [
//     {
//       id: "minxiong_stn",
//       name: "Minxiong Train Station",
//       address: "Front Station Plaza",
//       total: 60, available: 20, empty: 40,
//       lat: 23.5550, lng: 120.4300
//     },
//     {
//       id: "nanhua",
//       name: "Nanhua University",
//       address: "Main Gate",
//       total: 30, available: 15, empty: 15,
//       lat: 23.5700, lng: 120.4900
//     },
//   ],
//   "Minxiong Township": [
//     {
//       id: "mx_park",
//       name: "Minxiong Sports Park",
//       address: "Wenhua Rd.",
//       total: 20, available: 10, empty: 10,
//       lat: 23.5500, lng: 120.4400
//     }
//   ]
// };

// interface UbikeDetailProps {
//   onBack: () => void;
// }

// export default function UbikeDetail({ onBack }: UbikeDetailProps) {
//   // --- 狀態管理 ---
//   const [selectedArea, setSelectedArea] = useState<string | null>(null);
//   const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

//   // 控制下拉選單開關
//   const [isAreaOpen, setIsAreaOpen] = useState(false);
//   const [isStationOpen, setIsStationOpen] = useState(false);

//   // 取得目前選中的站點資料
//   const currentStationList = selectedArea ? UBIKE_DATA[selectedArea] : [];
//   const currentStation = currentStationList.find(s => s.id === selectedStationId);

//   // 處理 Google Map 導轉
//   const handleOpenMap = () => {
//     if (currentStation) {
//       // 這是 Google Maps 的通用連結格式
//       window.open(`https://www.google.com/maps/search/?api=1&query=${currentStation.lat},${currentStation.lng}`, '_blank');
//     }
//   };

//   return (
//     <div className="w-full h-full flex flex-col relative">

//       {/* --- Header --- */}
//       <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
//         <button
//           onClick={onBack}
//           className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
//         >
//           <ArrowLeft size={20} />
//         </button>
//         <div>
//            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ubike 2.0</div>
//            <div className="text-lg font-bold text-gray-800">Real-time Information</div>
//         </div>
//       </div>

//       {/* --- Brief Introduction --- */}
//       <div className="mb-8">
//         <p className="text-sm text-gray-500">
//           Check the real-time availability of Ubike stations in and around the campus.
//           Please select an area first, then choose a specific station.
//         </p>
//       </div>

//       {/* --- Selectors (Area & Station) --- */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8">

//         {/* 1. Area Selector */}
//         <div className="flex-1 relative">
//            <label className="text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">Select an Area</label>
//            <button
//              onClick={() => { setIsAreaOpen(!isAreaOpen); setIsStationOpen(false); }}
//              className={`w-full text-left px-4 py-3 rounded-xl border flex justify-between items-center transition-all ${
//                isAreaOpen ? "border-emerald-500 ring-2 ring-emerald-100 bg-white" : "border-gray-200 bg-gray-50 hover:bg-white"
//              }`}
//            >
//              <span className={`font-bold ${selectedArea ? "text-gray-800" : "text-gray-400"}`}>
//                {selectedArea || "Choose Area"}
//              </span>
//              <ChevronDown size={18} className="text-gray-400" />
//            </button>

//            {/* Dropdown Menu */}
//            <AnimatePresence>
//              {isAreaOpen && (
//                <motion.div
//                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
//                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden"
//                >
//                  {Object.keys(UBIKE_DATA).map(area => (
//                    <button
//                      key={area}
//                      onClick={() => {
//                        setSelectedArea(area);
//                        setSelectedStationId(null); // 重置站點
//                        setIsAreaOpen(false);
//                      }}
//                      className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-bold text-gray-600 transition-colors"
//                    >
//                      {area}
//                    </button>
//                  ))}
//                </motion.div>
//              )}
//            </AnimatePresence>
//         </div>

//         {/* 2. Station Selector */}
//         <div className="flex-1 relative">
//            <label className="text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">Select a Site</label>
//            <button
//              onClick={() => { if(selectedArea) setIsStationOpen(!isStationOpen); }}
//              disabled={!selectedArea}
//              className={`w-full text-left px-4 py-3 rounded-xl border flex justify-between items-center transition-all ${
//                !selectedArea
//                  ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-200"
//                  : isStationOpen ? "border-emerald-500 ring-2 ring-emerald-100 bg-white" : "border-gray-200 bg-gray-50 hover:bg-white"
//              }`}
//            >
//              <span className={`font-bold ${selectedStationId ? "text-gray-800" : "text-gray-400"}`}>
//                {currentStation?.name || (selectedArea ? "Choose Station" : "Select Area First")}
//              </span>
//              <ChevronDown size={18} className="text-gray-400" />
//            </button>

//            {/* Dropdown Menu */}
//            <AnimatePresence>
//              {isStationOpen && (
//                <motion.div
//                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
//                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
//                >
//                  {currentStationList.map(station => (
//                    <button
//                      key={station.id}
//                      onClick={() => {
//                        setSelectedStationId(station.id);
//                        setIsStationOpen(false);
//                      }}
//                      className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-bold text-gray-600 transition-colors border-b border-gray-50 last:border-0"
//                    >
//                      {station.name}
//                    </button>
//                  ))}
//                </motion.div>
//              )}
//            </AnimatePresence>
//         </div>
//       </div>

//       {/* --- Info Card (Result) --- */}
//       <AnimatePresence mode="wait">
//         {currentStation && (
//           <motion.div
//             key={currentStation.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.3 }}
//             className="bg-gray-50 rounded-3xl p-6 border border-gray-100"
//           >
//             <div className="flex flex-col lg:flex-row gap-8">

//               {/* Left: Text Info & Stats */}
//               <div className="flex-1">
//                 <div className="mb-6">
//                   <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-2">Site Information :</h3>
//                   <div className="pl-1">
//                     <div className="text-2xl font-bold text-gray-800 mb-2">{currentStation.name}</div>
//                     <div className="flex items-start gap-2 text-sm text-gray-500 font-medium">
//                        <MapPin size={16} className="mt-0.5 shrink-0 text-emerald-500" />
//                        {currentStation.address}
//                     </div>
//                   </div>
//                 </div>

//                 {/* 3 Stats Boxes (Matches Reference Image) */}
//                 <div className="grid grid-cols-3 gap-3">
//                   <div className="bg-gray-200/50 p-3 rounded-xl text-center border border-gray-200">
//                     <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Total</div>
//                     <div className="text-xl font-black text-gray-700">{currentStation.total}</div>
//                   </div>
//                   <div className="bg-emerald-100/50 p-3 rounded-xl text-center border border-emerald-100">
//                     <div className="text-[10px] text-emerald-700 font-bold uppercase mb-1">Available</div>
//                     <div className="text-xl font-black text-emerald-600">{currentStation.available}</div>
//                   </div>
//                   <div className="bg-gray-200/50 p-3 rounded-xl text-center border border-gray-200">
//                     <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Empty</div>
//                     <div className="text-xl font-black text-gray-400">{currentStation.empty}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right: Map Preview Button */}
//               <div className="w-full lg:w-1/3 aspect-video lg:aspect-auto flex-shrink-0">
//                 <button
//                   onClick={handleOpenMap}
//                   className="w-full h-full min-h-[160px] rounded-2xl bg-gray-200 border-2 border-white shadow-sm overflow-hidden relative group hover:shadow-md transition-all"
//                 >
//                    {/* 模擬地圖背景 (可以使用一張靜態地圖截圖，這裡用 CSS 模擬) */}
//                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Campus_Map_of_National_Chung_Cheng_University.jpg')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
//                    <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-emerald-900/20 transition-colors"></div>

//                    {/* Center Content */}
//                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
//                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform text-red-500">
//                          <MapPin size={24} fill="currentColor" />
//                       </div>
//                       <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
//                         Open Google Maps <ExternalLink size={10}/>
//                       </span>
//                    </div>
//                 </button>
//               </div>

//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ArrowLeft,
  MapPin,
  ChevronDown,
  ExternalLink,
  Bike,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 修改後的資料結構 ---
interface UbikeStation {
  uid: string; // API 清單欄位：站點識別碼
  name: string; // API 清單欄位：中文站名 [cite: 81]
  nameEn: string; // API 清單欄位：英文站名 [cite: 82]
  locationEn: string; // API 清單欄位：英文分類標籤
  rentBikes: number; // API 清單欄位：目前可借車輛
  returnDocks: number; // API 清單欄位：目前可還空位
  status: string; // API 清單欄位：營運狀態 [cite: 87]
  // 經緯度通常 API 會附帶，保留備用
  latitude: number;
  longitude: number;
}

interface UbikeDetailProps {
  onBack: () => void;
}

export default function UbikeDetail({ onBack }: UbikeDetailProps) {
  // --- 狀態管理 ---
  const [allStations, setAllStations] = useState<UbikeStation[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("All Areas");
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isStationOpen, setIsStationOpen] = useState(false);

  const fetchUbikeData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://campus-ai-backend-1.onrender.com/api/traffic/ubike`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (!response.ok) {
        console.warn(
          `Server error ${response.status}: API might be down or out of service.`,
        );
        setAllStations([]);
        return;
      }

      const data = await response.json();
      setAllStations(data.stations || []);
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUbikeData();
    const timer = setInterval(fetchUbikeData, 60000); // 每分鐘刷新一次
    return () => clearInterval(timer);
  }, [fetchUbikeData]);

  // --- 3. 資料處理邏輯 ---

  // 定義區域過濾邏輯 (根據站名關鍵字簡易分類)
  const areas = ["All Areas", "CCU Campus", "Minxiong Township"];

  const filteredStations = useMemo(() => {
    // 如果是全選，就回傳所有站點
    if (selectedArea === "All Areas") return allStations;
    return allStations.filter((s) => s.locationEn === selectedArea);
  }, [allStations, selectedArea]);

  // 在組件內，計算有哪些區域
  const dynamicAreas = useMemo(() => {
    // 提取所有站點的 locationEn，並移除重複項
    const uniqueAreas = Array.from(
      new Set(allStations.map((s) => s.locationEn)),
    );
    // 把 "All Areas" 加在最前面
    return ["All Areas", ...uniqueAreas];
  }, [allStations]);

  const currentStation = allStations.find((s) => s.uid === selectedStationId);

  const handleOpenMap = () => {
    if (currentStation) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${currentStation.latitude},${currentStation.longitude}`,
        "_blank",
      );
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* --- Header --- */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Ubike 2.0
          </div>
          <div className="text-lg font-bold text-gray-800">
            Real-time Availability
          </div>
        </div>
      </div>

      {/* --- Intro --- */}
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Access live data for bike rentals and parking spaces around the
          university.
        </p>
      </div>

      {/* --- Selectors --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Area Selector */}
        <div className="flex-1 relative">
          <label className="text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">
            Region
          </label>
          <button
            onClick={() => {
              setIsAreaOpen(!isAreaOpen);
              setIsStationOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-center"
          >
            <span className="font-bold text-gray-800">{selectedArea}</span>
            <ChevronDown size={18} className="text-gray-400" />
          </button>

          {/* --- Region Selector 內部的選單 --- */}
          <AnimatePresence>
            {isAreaOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden"
              >
                {dynamicAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      setSelectedArea(area);
                      setSelectedStationId(null);
                      setIsAreaOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-bold text-gray-600"
                  >
                    {area}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Station Selector */}
        <div className="flex-1 relative">
          <label className="text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">
            Station Name
          </label>
          <button
            onClick={() => {
              setIsStationOpen(!isStationOpen);
              setIsAreaOpen(false);
            }}
            disabled={isLoading}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-center disabled:opacity-50"
          >
            <span
              className={`font-bold ${selectedStationId ? "text-gray-800" : "text-gray-400"}`}
            >
              {currentStation?.nameEn ||
                (isLoading ? "Loading..." : "Choose a Station")}
            </span>
            <ChevronDown size={18} className="text-gray-400" />
          </button>

          {/* --- Station Selector 內部的正確選單 --- */}
          <AnimatePresence>
            {isStationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
              >
                {filteredStations.map((station) => (
                  <button
                    key={station.uid} // 使用 uid
                    onClick={() => {
                      setSelectedStationId(station.uid); // 使用 uid
                      setIsStationOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-bold text-gray-600 border-b border-gray-50 last:border-0"
                  >
                    {station.nameEn} {/* 顯示英文站名 [cite: 82] */}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- Info Card --- */}
      <AnimatePresence mode="wait">
        {currentStation ? (
          <motion.div
            key={currentStation.uid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gray-50 rounded-3xl p-6 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Station Details :
                  </h3>
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    {currentStation.nameEn}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-500 font-medium">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    {currentStation.locationEn}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                      Status
                    </div>
                    <div className="text-xl font-black text-gray-700">
                      {currentStation.status}
                    </div>
                  </div>
                  <div className="bg-emerald-500 p-3 rounded-xl text-center border border-emerald-600 shadow-sm">
                    <div className="text-[10px] text-emerald-50 font-bold uppercase mb-1">
                      Available
                    </div>
                    <div className="text-xl font-black text-white">
                      {currentStation.rentBikes}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                      Empty
                    </div>
                    <div className="text-xl font-black text-gray-400">
                      {currentStation.returnDocks}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 aspect-video lg:aspect-auto flex-shrink-0">
                <button
                  onClick={handleOpenMap}
                  className="w-full h-full min-h-[160px] rounded-2xl bg-gray-200 border-2 border-white shadow-sm overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i15!2i26392!3i13632!2m3!1e0!2sm!3i604115147!3m8!2szh-TW!3stn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md mb-2 text-emerald-500">
                      <MapPin size={20} fill="currentColor" />
                    </div>
                    <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
                      Navigation <ExternalLink size={10} />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <Bike size={48} className="text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">
              Please select a station to view real-time data
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
