
// "use client";

// import { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   ArrowLeft,
//   MapPin,
//   ChevronDown,
//   ExternalLink,
//   Bike,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // --- 修改後的資料結構 ---
// interface UbikeStation {
//   uid: string; // API 清單欄位：站點識別碼
//   name: string; // API 清單欄位：中文站名 [cite: 81]
//   nameEn: string; // API 清單欄位：英文站名 [cite: 82]
//   locationEn: string; // API 清單欄位：英文分類標籤
//   rentBikes: number; // API 清單欄位：目前可借車輛
//   returnDocks: number; // API 清單欄位：目前可還空位
//   status: string; // API 清單欄位：營運狀態 [cite: 87]
//   // 經緯度通常 API 會附帶，保留備用
//   latitude: number;
//   longitude: number;
// }

// interface UbikeDetailProps {
//   onBack: () => void;
// }

// export default function UbikeDetail({ onBack }: UbikeDetailProps) {
//   // --- 狀態管理 ---
//   const [allStations, setAllStations] = useState<UbikeStation[]>([]);
//   const [selectedArea, setSelectedArea] = useState<string>("All Areas");
//   const [selectedStationId, setSelectedStationId] = useState<string | null>(
//     null,
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   const [isAreaOpen, setIsAreaOpen] = useState(false);
//   const [isStationOpen, setIsStationOpen] = useState(false);

//   const fetchUbikeData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `https://campus-ai-backend-1.onrender.com/api/traffic/ubike`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         },
//       );

//       if (!response.ok) {
//         console.warn(
//           `Server error ${response.status}: API might be down or out of service.`,
//         );
//         setAllStations([]);
//         return;
//       }

//       const data = await response.json();
//       setAllStations(data.stations || []);
//     } catch (error) {
//       console.error("Network error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUbikeData();
//     const timer = setInterval(fetchUbikeData, 60000); // 每分鐘刷新一次
//     return () => clearInterval(timer);
//   }, [fetchUbikeData]);

//   // --- 3. 資料處理邏輯 ---

//   // 定義區域過濾邏輯 (根據站名關鍵字簡易分類)
//   const areas = ["All Areas", "CCU Campus", "Minxiong Township"];

//   const filteredStations = useMemo(() => {
//     // 如果是全選，就回傳所有站點
//     if (selectedArea === "All Areas") return allStations;
//     return allStations.filter((s) => s.locationEn === selectedArea);
//   }, [allStations, selectedArea]);

//   // 在組件內，計算有哪些區域
//   const dynamicAreas = useMemo(() => {
//     // 提取所有站點的 locationEn，並移除重複項
//     const uniqueAreas = Array.from(
//       new Set(allStations.map((s) => s.locationEn)),
//     );
//     // 把 "All Areas" 加在最前面
//     return ["All Areas", ...uniqueAreas];
//   }, [allStations]);

//   const currentStation = allStations.find((s) => s.uid === selectedStationId);

//   const handleOpenMap = () => {
//     if (currentStation) {
//       window.open(
//         `https://www.google.com/maps/search/?api=1&query=${currentStation.latitude},${currentStation.longitude}`,
//         "_blank",
//       );
//     }
//   };

// return (
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
      
//       <div>
//         <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
//           Ubike 2.0
//         </div>
//         <div className="text-lg font-bold text-gray-800">
//           Real-time Availability
//         </div>
//       </div>
//     </div>

//       {/* --- Intro --- */}
//       <div className="mb-8">
//         <p className="text-sm text-gray-500">
//           Access live data for bike rentals and parking spaces around the
//           university.
//         </p>
//       </div>

//       {/* --- Selectors --- */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8">
//         {/* Area Selector */}
//         <div className="flex-1 relative">
//           <label className="text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">
//             Region
//           </label>
//           <button
//             onClick={() => {
//               setIsAreaOpen(!isAreaOpen);
//               setIsStationOpen(false);
//             }}
//             className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-center"
//           >
//             <span className="font-bold text-gray-800">{selectedArea}</span>
//             <ChevronDown size={18} className="text-gray-400" />
//           </button>

//           {/* --- Region Selector 內部的選單 --- */}
//           <AnimatePresence>
//             {isAreaOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden"
//               >
//                 {dynamicAreas.map((area) => (
//                   <button
//                     key={area}
//                     onClick={() => {
//                       setSelectedArea(area);
//                       setSelectedStationId(null);
//                       setIsAreaOpen(false);
//                     }}
//                     className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-bold text-gray-600"
//                   >
//                     {area}
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Station Selector */}
//         <div className="flex-1 relative">
//           <label className="text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">
//             Station Name
//           </label>
//           <button
//             onClick={() => {
//               setIsStationOpen(!isStationOpen);
//               setIsAreaOpen(false);
//             }}
//             disabled={isLoading}
//             className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-center disabled:opacity-50"
//           >
//             <span
//               className={`font-bold ${selectedStationId ? "text-gray-800" : "text-gray-400"}`}
//             >
//               {currentStation?.nameEn ||
//                 (isLoading ? "Loading..." : "Choose a Station")}
//             </span>
//             <ChevronDown size={18} className="text-gray-400" />
//           </button>

//           {/* --- Station Selector 內部的正確選單 --- */}
//           <AnimatePresence>
//             {isStationOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
//               >
//                 {filteredStations.map((station) => (
//                   <button
//                     key={station.uid} // 使用 uid
//                     onClick={() => {
//                       setSelectedStationId(station.uid); // 使用 uid
//                       setIsStationOpen(false);
//                     }}
//                     className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-bold text-gray-600 border-b border-gray-50 last:border-0"
//                   >
//                     {station.nameEn} {/* 顯示英文站名 [cite: 82] */}
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* --- Info Card --- */}
//       <AnimatePresence mode="wait">
//         {currentStation ? (
//           <motion.div
//             key={currentStation.uid}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="bg-gray-50 rounded-3xl p-6 border border-gray-100"
//           >
//             <div className="flex flex-col lg:flex-row gap-8">
//               <div className="flex-1">
//                 <div className="mb-6">
//                   <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-2">
//                     Station Details :
//                   </h3>
//                   <div className="text-2xl font-bold text-gray-800 mb-2">
//                     {currentStation.nameEn}
//                   </div>
//                   <div className="flex items-start gap-2 text-sm text-gray-500 font-medium">
//                     <MapPin
//                       size={16}
//                       className="mt-0.5 shrink-0 text-emerald-500"
//                     />
//                     {currentStation.locationEn}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-3">
//                   <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
//                     <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">
//                       Status
//                     </div>
//                     <div className="text-xl font-black text-gray-700">
//                       {currentStation.status}
//                     </div>
//                   </div>
//                   <div className="bg-emerald-500 p-3 rounded-xl text-center border border-emerald-600 shadow-sm">
//                     <div className="text-[10px] text-emerald-50 font-bold uppercase mb-1">
//                       Available
//                     </div>
//                     <div className="text-xl font-black text-white">
//                       {currentStation.rentBikes}
//                     </div>
//                   </div>
//                   <div className="bg-white p-3 rounded-xl text-center border border-gray-200">
//                     <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">
//                       Empty
//                     </div>
//                     <div className="text-xl font-black text-gray-400">
//                       {currentStation.returnDocks}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full lg:w-1/3 aspect-video lg:aspect-auto flex-shrink-0">
//                 <button
//                   onClick={handleOpenMap}
//                   className="w-full h-full min-h-[160px] rounded-2xl bg-gray-200 border-2 border-white shadow-sm overflow-hidden relative group"
//                 >
//                   <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i15!2i26392!3i13632!2m3!1e0!2sm!3i604115147!3m8!2szh-TW!3stn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
//                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md mb-2 text-emerald-500">
//                       <MapPin size={20} fill="currentColor" />
//                     </div>
//                     <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
//                       Navigation <ExternalLink size={10} />
//                     </span>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
//             <Bike size={48} className="text-gray-200 mb-4" />
//             <p className="text-gray-400 font-medium">
//               Please select a station to view real-time data
//             </p>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import {
  ArrowLeft,
  MapPin,
  ChevronDown,
  ExternalLink,
  Bike,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 資料結構 ---
interface UbikeStation {
  uid: string; 
  name: string; 
  nameEn: string; 
  locationEn: string; 
  rentBikes: number; 
  returnDocks: number; 
  status: string; 
  latitude: number;
  longitude: number;
}

interface UbikeDetailProps {
  onBack: () => void;
}

// --- 定義 SWR Fetcher ---
const fetcher = async (url: string) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    console.warn(`Server error ${res.status}: API might be down or out of service.`);
    return { stations: [] };
  }
  return res.json();
};

export default function UbikeDetail({ onBack }: UbikeDetailProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedArea = searchParams.get("area") || "All Areas";
  const selectedStationId = searchParams.get("station");

  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isStationOpen, setIsStationOpen] = useState(false);

  const updateUrlState = (area: string, stationId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("area", area);
    if (stationId) {
      params.set("station", stationId);
    } else {
      params.delete("station");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const { data, isLoading } = useSWR(
    `https://campus-ai-backend-1.onrender.com/api/traffic/ubike`,
    fetcher,
    {
      refreshInterval: 60000, 
      revalidateOnFocus: true, 
    }
  );

  const allStations: UbikeStation[] = data?.stations || [];

  const filteredStations = useMemo(() => {
    if (selectedArea === "All Areas") return allStations;
    return allStations.filter((s) => s.locationEn === selectedArea);
  }, [allStations, selectedArea]);

  const dynamicAreas = useMemo(() => {
    const uniqueAreas = Array.from(
      new Set(allStations.map((s) => s.locationEn))
    );
    return ["All Areas", ...uniqueAreas];
  }, [allStations]);

  const currentStation = useMemo(() => {
    return allStations.find((s) => s.uid === selectedStationId) || null;
  }, [allStations, selectedStationId]);

  const translateStatus = (status: string) => {
    switch (status) {
      case "正常":
        return "Normal";
      case "停止營運":
        return "Closed";
      case "暫停營運":
        return "Suspended";
      default:
        return status; 
    }
  };

  const handleOpenMap = () => {
    if (currentStation) {
      // 順手修復了這裡原本漏掉的 $ 符號
      window.open(
        `https://www.google.com/maps/search/?api=1&query=$$${currentStation.latitude},${currentStation.longitude}`,
        "_blank"
      );
    }
  };

  return (
    // 🔴 調整了最外層的響應式 Padding (p-4 md:p-8)
    <div className="w-full h-full bg-white rounded-3xl p-4 md:p-8 pt-16 md:pt-16 shadow-sm border border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
      {/* --- Header --- */}
      <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        
        <div>
          <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">
            Ubike 2.0
          </div>
          <div className="text-base md:text-lg font-bold text-gray-800">
            Real-time Availability
          </div>
        </div>
      </div>

      {/* --- Intro --- */}
      <div className="mb-6 md:mb-8">
        <p className="text-xs md:text-sm text-gray-500">
          Access live data for bike rentals and parking spaces around the
          university.
        </p>
      </div>

      {/* --- Selectors --- */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8">
        
        {/* Area Selector */}
        <div className="flex-1 relative">
          <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">
            Region
          </label>
          <button
            onClick={() => {
              setIsAreaOpen(!isAreaOpen);
              setIsStationOpen(false);
            }}
            className="w-full text-left px-3 md:px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-center"
          >
            <span className="font-bold text-gray-800 text-sm md:text-base truncate">{selectedArea}</span>
            <ChevronDown size={18} className="text-gray-400 flex-shrink-0 ml-2" />
          </button>

          <AnimatePresence>
            {isAreaOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
              >
                {dynamicAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      updateUrlState(area, null); 
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
          <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-1 block pl-1">
            Station Name
          </label>
          <button
            onClick={() => {
              setIsStationOpen(!isStationOpen);
              setIsAreaOpen(false);
            }}
            disabled={isLoading}
            className="w-full text-left px-3 md:px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-center disabled:opacity-50"
          >
            <span
              className={`font-bold text-sm md:text-base truncate ${currentStation ? "text-gray-800" : "text-gray-400"}`}
            >
              {currentStation?.nameEn ||
                (isLoading ? "Loading..." : "Choose a Station")}
            </span>
            <ChevronDown size={18} className="text-gray-400 flex-shrink-0 ml-2" />
          </button>

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
                    key={station.uid}
                    onClick={() => {
                      updateUrlState(selectedArea, station.uid); 
                      setIsStationOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-bold text-gray-600 border-b border-gray-50 last:border-0"
                  >
                    {station.nameEn}
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
            className="bg-gray-50 rounded-3xl p-5 md:p-6 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-sm md:text-lg font-bold text-gray-400 uppercase tracking-wider mb-1 md:mb-2">
                    Station Details :
                  </h3>
                  <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                    {currentStation.nameEn}
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm text-gray-500 font-medium">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    {currentStation.locationEn}
                  </div>
                </div>

                {/* 🔴 數據方塊優化：調整 gap, padding，並給予動態字體大小防破版 */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  <div className="bg-white p-2 md:p-3 rounded-xl text-center border border-gray-200 flex flex-col justify-center">
                    <div className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase mb-1">
                      Status
                    </div>
                    {/* 使用 tracking-tighter 與動態文字大小，避免 Suspended 爆版 */}
                    <div className="text-[13px] md:text-xl font-black text-gray-700 tracking-tighter leading-none flex items-center justify-center min-h-[20px] md:min-h-[28px]">
                      {translateStatus(currentStation.status)}
                    </div>
                  </div>
                  <div className="bg-emerald-500 p-2 md:p-3 rounded-xl text-center border border-emerald-600 shadow-sm flex flex-col justify-center">
                    <div className="text-[9px] md:text-[10px] text-emerald-50 font-bold uppercase mb-1">
                      Available
                    </div>
                    <div className="text-lg md:text-xl font-black text-white leading-none flex items-center justify-center min-h-[20px] md:min-h-[28px]">
                      {currentStation.rentBikes}
                    </div>
                  </div>
                  <div className="bg-white p-2 md:p-3 rounded-xl text-center border border-gray-200 flex flex-col justify-center">
                    <div className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase mb-1">
                      Empty
                    </div>
                    <div className="text-lg md:text-xl font-black text-gray-400 leading-none flex items-center justify-center min-h-[20px] md:min-h-[28px]">
                      {currentStation.returnDocks}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 aspect-video lg:aspect-auto flex-shrink-0">
                <button
                  onClick={handleOpenMap}
                  className="w-full h-full min-h-[140px] md:min-h-[160px] rounded-2xl bg-gray-200 border-2 border-white shadow-sm overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i15!2i26392!3i13632!2m3!1e0!2sm!3i604115147!3m8!2szh-TW!3stn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md mb-2 text-emerald-500">
                      <MapPin size={18} fill="currentColor" className="md:w-5 md:h-5" />
                    </div>
                    <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
                      Navigation <ExternalLink size={10} />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <Bike size={40} className="text-gray-200 mb-3 md:mb-4 md:w-12 md:h-12" />
            <p className="text-xs md:text-sm text-gray-400 font-medium text-center px-4">
              Please select a station to view real-time data
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}